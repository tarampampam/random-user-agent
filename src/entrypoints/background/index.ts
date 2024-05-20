import { checkPermissions, detectBrowser, watchPermissionsChange } from '~/shared'
import { type HandlersMap, listen as listenRuntime } from '~/shared/messaging'
import { newErrorEvent, newExtensionLoadedEvent } from '~/shared/stats'
import { isApplicableForDomain, reloadRequestHeaders, renewUserAgent, updateRemoteUserAgentList } from './api'
import { registerContentScripts, unsetRequestHeaders } from './hooks'
import { registerHotkeys } from './hotkeys'
import {
  CurrentUserAgent,
  RemoteUserAgentList,
  Settings,
  StorageArea,
  UserID,
  LatestBrowserVersions,
} from './persistent'
import { type Collector as StatsCollector, GaCollector } from './stats'
import { Timer } from './timer'
import { setExtensionIcon, setExtensionTitle } from './ui'

/** Debug logging */
const debug = (msg: string, ...args: Array<unknown>): void => console.debug(`%c😈 ${msg}`, 'font-weight:bold', ...args)
/** Convert milliseconds to seconds */
const m2s = (millis: number): number => Math.round(millis / 1000)

// stats collector is used to collect statistics about the extension usage. personal information is not collected
// and will never be collected. the collected data is used to overview the extension usage and track the most popular
// features
let stats: StatsCollector | undefined = undefined

// register the error handler to catch global errors (unhandled exceptions) and unhandled promise rejections to
// send the error events to the stats collector
;((): void => {
  const errorsHandler = (error: unknown): void => {
    if (stats && error) {
      stats.send(newErrorEvent(error, { page: 'background' })).then((err) => err && debug('stats error', err))
    }
  }

  if (self && self.addEventListener) {
    self.addEventListener('error', errorsHandler)
    self.addEventListener('error', errorsHandler)
  }
})()

// run the background script
;(async () => {
  // register the content scripts
  await registerContentScripts()

  // detect the host OS
  const hostOS = (await chrome.runtime.getPlatformInfo()).os

  // at least FireFox does not allow the extension to work with all URLs by default, and the user must grant the
  // necessary permissions. in addition, the user can revoke the permissions at any time, so we need to monitor the
  // changes in the permissions and open the onboarding page if the necessary permissions are missing
  watchPermissionsChange(async () => await checkPermissions(true))

  // if the permissions are not granted, we open the onboarding page to explain the situation to the user
  await checkPermissions(true)

  // settings are stored in the 'sync' storage area because they need to be synchronized between different devices,
  // and only if the 'sync' storage area is not available, we use the 'local' storage area
  const settings = new Settings(new StorageArea('settings-struct-v3', 'sync', 'local'), detectBrowser())
  const initSettings = await settings.get()
  debug('settings', initSettings)

  // for the current user-agent, we need to use the 'local' storage area because it supports much more frequent
  // updates and does not require synchronization between devices. do not use the 'sync' storage area for this purpose
  const currentUserAgent = new CurrentUserAgent(new StorageArea('useragent-state', 'local'))
  debug('current user-agent', await currentUserAgent.get())

  // remote user-agent list is used to store the list, fetched from the remote server. it uses the local storage area
  // because it does not require synchronization between devices
  const remoteUserAgentList = new RemoteUserAgentList(new StorageArea('useragent-remote-list', 'local'))
  debug('remote user-agent list', await remoteUserAgentList.get(false))

  // to identify the user, we use the 'sync' storage area because we need to synchronize the user ID between different
  // devices. if the 'sync' storage area is not available, we use the 'local' storage area
  // the user id is generated once and stored in the storage area. it does not change over time and does not contain
  // any personal information (in fact, it's just a random UUID)
  const uuid = (await new UserID(new StorageArea('user-id', 'sync', 'local')).get()).userID
  debug('unique user id (uuid)', uuid)

  // the latest browser versions are stored in the 'local' storage area because they do not require synchronization
  // between devices. the data is updated automatically
  const latestBrowserVersions = new LatestBrowserVersions(new StorageArea('latest-browser-versions', 'local'))
  debug('initial latest browser versions', ...(await latestBrowserVersions.get()))

  // creates a new stats collector instance with the given UUID (or unset if the UUID is not provided)
  const newStatsCollector = (uuid: string) => {
    return new GaCollector(uuid, {
      extVersion: chrome.runtime.getManifest().version,
      osFamily: hostOS,
      browser: detectBrowser(),
    })
  }

  if (initSettings.stats.enabled) {
    stats = newStatsCollector(uuid) // initialize the stats collector on startup
  } else {
    debug('collection of usage statistics is disabled')
  }

  // handlers is a map of functions that can be called from the popup or content scripts (and not only from them).
  // think about them as a kind of API for the extension
  const handlers: HandlersMap = {
    ping: (...args) => args,
    version: () => chrome.runtime.getManifest().version,
    currentUserAgent: async () => (await currentUserAgent.get())?.userAgent,
    renewUserAgent: async () => {
      const gen = await renewUserAgent(settings, currentUserAgent, remoteUserAgentList, hostOS, latestBrowserVersions)
      return gen.new.userAgent
    },
    settings: async () => settings.get(),
    updateSettings: async (part) => (await settings.update(part)) && settings.get(),
    isApplicableForDomain: async (domain) => isApplicableForDomain(await settings.get(), domain),
    updateRemoteListNow: async (clear) => await updateRemoteUserAgentList(remoteUserAgentList, clear),
    fireStatsEvents: async (...events) => await stats?.send(...events),
  }

  // create a timer to renew the user-agent automatically
  const userAgentRenewTimer = new Timer('renew-user-agent', m2s(initSettings.renew.intervalMillis), async () => {
    await renewUserAgent(settings, currentUserAgent, remoteUserAgentList, hostOS, latestBrowserVersions)
    debug('user-agent was renewed automatically', await currentUserAgent.get())
  })

  // create a timer to update the remote user-agents list automatically
  const remoteListUpdateTimer = new Timer(
    'update-remote-list',
    m2s(initSettings.remoteUseragentList.updateIntervalMillis),
    async () => {
      await remoteUserAgentList.update()
      debug('remote user-agent list updated automatically', await remoteUserAgentList.get(false))
    }
  )

  // create a timer to update the latest browser versions automatically (once in 6 hours)
  const latestBrowserVersionsTimer = new Timer('update-latest-browser-versions', 60 * 60 * 6, async () => {
    await latestBrowserVersions.update()
    debug('latest browser versions updated automatically', latestBrowserVersions.get())
  })

  // on current user-agent changes, save it to the storage area, and update the browser request headers
  currentUserAgent.onChange(async (c) => {
    debug('current user-agent was changed', c)

    // update the extension title with the current user-agent information
    await setExtensionTitle(c)

    // reload the request headers with the new user-agent information
    const reloaded = await reloadRequestHeaders(await settings.get(), await currentUserAgent.get())
    debug('the request header rules have been ' + (reloaded ? 'set' : 'unset'), reloaded)
  })

  settings.onChange(async (s) => {
    debug('settings were changed', s)

    if (s.enabled) {
      // 🌝 if the extension is enabled, we need to enable required features

      // 🚀 automatic user-agent renewal
      if (s.renew.enabled) {
        // update the user-agent renewal timer on changes, if needed
        if (m2s(s.renew.intervalMillis) !== userAgentRenewTimer.getIntervalSec) {
          await userAgentRenewTimer.changeInterval(m2s(s.renew.intervalMillis))
        }

        // start the renewal timer if it's not started yet
        if (!userAgentRenewTimer.isStarted) {
          await userAgentRenewTimer.start()
        }
      } else {
        // stop the renewal timer if the extension is enabled, but the user-agent renewal is disabled
        await userAgentRenewTimer.stop()
      }

      // 🚀 remote user-agent list
      if (s.remoteUseragentList.enabled) {
        const intervalSec = m2s(s.remoteUseragentList.updateIntervalMillis)

        // update the remote user-agents list update timer on changes, if needed
        if (intervalSec !== remoteListUpdateTimer.getIntervalSec) {
          if (intervalSec > 0) {
            await remoteListUpdateTimer.changeInterval(intervalSec)
          } else {
            await remoteListUpdateTimer.stop()
          }
        }

        if (!remoteListUpdateTimer.isStarted && s.remoteUseragentList.updateIntervalMillis > 0) {
          await remoteListUpdateTimer.start()
        }
      } else {
        await remoteListUpdateTimer.stop()
      }

      // 🚀 update the browser request headers with the current user-agent information
      const reloaded = await reloadRequestHeaders(await settings.get(), await currentUserAgent.get())
      debug('the request header rules have been ' + (reloaded ? 'set' : 'unset'), reloaded)

      // 🚀 update the latest browser versions automatically
      await latestBrowserVersionsTimer.start()
    } else {
      // 🌚 otherwise, if the extension is disabled, we need to disable everything
      await Promise.allSettled([
        // disable headers replacement
        unsetRequestHeaders(),
        // disable the user-agent renewal timer
        userAgentRenewTimer.stop(),
        // disable the remote user-agents list update timer
        remoteListUpdateTimer.stop(),
        // disable the latest browser versions update timer
        latestBrowserVersionsTimer.stop(),
      ])

      debug('all features have been disabled')
    }

    // 🚀 re-initialize the stats collector on changes, if needed
    if (s.stats.enabled && !stats) {
      stats = newStatsCollector(uuid)
      debug('collection of usage statistics is enabled')
    } else if (!s.stats.enabled) {
      stats = undefined
      debug('collection of usage statistics is disabled')
    }

    // 🚀 update the remote user-agents list URI on changes, if needed
    if (remoteUserAgentList.url?.toString() !== s.remoteUseragentList.uri) {
      if (remoteUserAgentList.setUrl(s.remoteUseragentList.uri)) {
        // note: we do not await the result because we do not want to block the execution
        remoteUserAgentList.update().catch((err) => debug('remote user-agent list update error', err))

        if (s.remoteUseragentList.updateIntervalMillis > 0) {
          await remoteListUpdateTimer.restart()
        }
      }
    }

    // update the extension icon state
    await setExtensionIcon(s.enabled)
  })

  // configure the remote user-agent list service
  if (initSettings.remoteUseragentList.enabled) {
    if (initSettings.remoteUseragentList.uri) {
      if (remoteUserAgentList.setUrl(initSettings.remoteUseragentList.uri)) {
        // note: we do not await the result because we do not want to block the execution
        remoteUserAgentList.update().catch((err) => debug('remote user-agent list update error', err))

        if (initSettings.remoteUseragentList.updateIntervalMillis > 0) {
          await remoteListUpdateTimer.start()
        }
      }
    }
  }

  // renew the user-agent on startup, if the feature is enabled or the user-agent is missing (first run?)
  if (initSettings.renew.onStartup || !(await currentUserAgent.get())) {
    await renewUserAgent(settings, currentUserAgent, remoteUserAgentList, hostOS, latestBrowserVersions)
  }

  // start the renewal timer on startup, if the extension and this feature are enabled
  if (initSettings.enabled && initSettings.renew.enabled) {
    await userAgentRenewTimer.start()
  }

  // start the latest browser versions update timer on startup, if the extension is enabled
  if (initSettings.enabled) {
    // initial update of the latest browser versions
    latestBrowserVersions.update().catch((err) => debug('latest browser versions update error', err))

    await latestBrowserVersionsTimer.start()
  }

  // register hotkeys for the extension commands, such as renewing the user-agent
  registerHotkeys({
    renewUserAgent: async () => {
      await renewUserAgent(settings, currentUserAgent, remoteUserAgentList, hostOS, latestBrowserVersions)
    },
  })

  // set the extension icon state on startup
  await setExtensionIcon(initSettings.enabled)

  listenRuntime(handlers)

  // send an initial event about the extension loading
  stats?.send(newExtensionLoadedEvent(initSettings)).then((err) => err && debug('stats error', err))
})().catch((error: unknown): void => {
  if (stats) {
    stats.send(newErrorEvent(error, { page: 'background' })).then((err) => err && debug('stats error', err))
  }

  throw error
})
