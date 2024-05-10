import type React from 'react'
import { StrictMode, useCallback, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { type BrowserType, type OSType, detectBrowser, generatorTypesToSets, setsToGeneratorTypes } from '~/shared'
import { send } from '~/shared/messaging'
import {
  Header,
  ActiveUserAgent,
  EnabledOnDomain,
  QuickSelect,
  type QuickSelectProps,
  Actions,
  Feedback,
  Footer,
} from './components'
import './index.scss'

const storeUrl = ((): string | undefined => {
  switch (detectBrowser()) {
    case 'chrome':
      return `${__CHROME_STORE_URL__}/reviews`
    case 'firefox':
      return `${__MOZILLA_STORE_URL__}/reviews`
    case 'opera':
      return __OPERA_STORE_URL__
    case 'edge':
      return __MICROSOFT_STORE_URL__
  }
})()

const rateStateKey: Readonly<string> = 'rate_was_clicked'

const App = (): React.JSX.Element => {
  const [version, setVersion] = useState<string>()
  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const [currentUserAgent, setCurrentUserAgent] = useState<string>()
  const [currentTabDomain, setCurrentTabDomain] = useState<string>()
  const [currentTabId, setCurrentTabId] = useState<number>()
  const [quickSelectDefaults, setQuickSelectDefaults] = useState<QuickSelectProps['defaults']>()
  const [isEnabledOnCurrentDomain, setIsEnabledOnCurrentDomain] = useState<boolean>(false)
  const [isShowRateBtn, setIsShowRateBtn] = useState<boolean>(!!storeUrl && !localStorage.getItem(rateStateKey))

  // the timer us used to throttle the reload requests
  const reloadTimer = useRef<NodeJS.Timeout>()

  /** Function to reload the current tab with a throttle time */
  const reloadCurrentTab = useCallback(
    async (throttle: number): Promise<void> => {
      reloadTimer.current && clearTimeout(reloadTimer.current) // remove the previous timer
      reloadTimer.current = setTimeout(async () => {
        if (typeof currentTabId === 'number') {
          await chrome.tabs.reload(currentTabId)
        }

        reloadTimer.current && clearTimeout(reloadTimer.current) // clear the timer
        reloadTimer.current = undefined // unset the reference
      }, throttle) // and set a new one
    },
    [currentTabId]
  )

  /** Handle the enable/disable button click */
  const handleEnable = useCallback(
    async (enabled: boolean): Promise<void> => {
      const { updateSettings } = await send({ updateSettings: [{ enabled }] })
      if (updateSettings instanceof Error) {
        throw updateSettings
      }

      setIsEnabled(updateSettings.enabled)

      await reloadCurrentTab(500)
    },
    [reloadCurrentTab]
  )

  /** Handle the "renew" user agent button click */
  const handleRenewUserAgent = useCallback(async (): Promise<void> => {
    const { renewUserAgent } = await send({ renewUserAgent: undefined })
    if (renewUserAgent instanceof Error) {
      throw renewUserAgent
    }

    setCurrentUserAgent(renewUserAgent)

    await reloadCurrentTab(3000)
  }, [reloadCurrentTab])

  /** Handle the enabled on current domain change */
  const handleEnabledOnCurrentDomainChange = useCallback(
    async (enabled: boolean): Promise<void> => {
      if (!currentTabDomain) {
        return
      }

      const { settings } = await send({ settings: undefined })
      if (settings instanceof Error) {
        throw settings
      }

      let domains: Array<string>

      switch (settings.blacklist.mode) {
        case 'blacklist':
          if (enabled) {
            domains = settings.blacklist.domains.filter((d) => d !== currentTabDomain)
          } else {
            domains = settings.blacklist.domains.concat(currentTabDomain)
          }
          break

        case 'whitelist':
          if (enabled) {
            domains = settings.blacklist.domains.concat(currentTabDomain)
          } else {
            domains = settings.blacklist.domains.filter((d) => d !== currentTabDomain)
          }
          break
      }

      await send({ updateSettings: [{ blacklist: { domains } }] })
      setIsEnabledOnCurrentDomain(enabled)
      await reloadCurrentTab(500)
    },
    [currentTabDomain, reloadCurrentTab]
  )

  const handleQuickSelectChange = useCallback(
    async ({ browsers, os, syncOs }: { browsers: Array<BrowserType>; os: Array<OSType>; syncOs: boolean }) => {
      await send({
        updateSettings: [
          {
            generator: {
              types: setsToGeneratorTypes(browsers, os.length ? os : 'any'),
              syncOsWithHost: syncOs,
            },
          },
        ],
      })

      // force to renew the user agent
      const { renewUserAgent } = await send({ renewUserAgent: undefined })
      if (renewUserAgent instanceof Error) {
        throw renewUserAgent
      }

      setCurrentUserAgent(renewUserAgent)
    },
    [setCurrentUserAgent]
  )

  /** Handle the open options button click */
  const handleOpenOptions = useCallback(async (): Promise<void> => {
    await chrome.runtime.openOptionsPage()
    window && window.close()
  }, [])

  /** Handle the rate link click */
  const handleRateLinkClick = useCallback(async (): Promise<void> => {
    localStorage.setItem(rateStateKey, '1')
    storeUrl && (await chrome.tabs.create({ url: storeUrl }))
    window && window.close()
    setIsShowRateBtn(false)
  }, [])

  /** Handle the bug report button click */
  const handleBugReportClick = useCallback(async (): Promise<void> => {
    await chrome.tabs.create({ url: __BUGREPORT_URL__ })
    window && window.close()
  }, [])

  /** Get the current extension settings and other data */
  const initSettings = useCallback((): void => {
    send({ version: undefined, settings: undefined, currentUserAgent: undefined })
      .then(({ version, settings, currentUserAgent }): void => {
        switch (true) {
          case version instanceof Error:
            throw version
          case settings instanceof Error:
            throw settings
          case currentUserAgent instanceof Error:
            throw currentUserAgent
        }

        setVersion(version)
        setIsEnabled(settings.enabled)
        setCurrentUserAgent(currentUserAgent)

        const [browsers, os] = generatorTypesToSets(settings.generator.types)
        setQuickSelectDefaults({ browsers: [...browsers], os: [...os], syncOs: settings.generator.syncOsWithHost })
      })
      .catch((err) => {
        throw err
      })
  }, [])

  // on component mount
  useEffect(() => {
    initSettings()

    // get the current tab domain and check if the extension is enabled on it
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs): void => {
      if (tabs.length && tabs[0].url) {
        const domain = new URL(tabs[0].url).hostname

        setCurrentTabDomain(domain)
        setCurrentTabId(tabs[0].id)

        send({ isApplicableForDomain: [domain] }).then(({ isApplicableForDomain }): void => {
          if (isApplicableForDomain instanceof Error) {
            throw isApplicableForDomain
          }

          setIsEnabledOnCurrentDomain(isApplicableForDomain)
        })
      }
    })

    if (chrome && chrome?.storage?.onChanged) {
      // add listener for changes
      chrome.storage.onChanged.addListener(initSettings)

      // remove listener on component unmount
      return () => chrome.storage.onChanged.removeListener(initSettings)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header isExtensionEnabled={isEnabled} onPauseResumeClick={handleEnable} />
      <ActiveUserAgent userAgent={currentUserAgent} />
      {currentTabDomain && (
        <EnabledOnDomain isEnabled={isEnabledOnCurrentDomain} onChange={handleEnabledOnCurrentDomainChange} />
      )}
      {quickSelectDefaults && <QuickSelect defaults={quickSelectDefaults} onChange={handleQuickSelectChange} />}
      <Actions
        isExtensionEnabled={isEnabled}
        onPauseResumeClick={handleEnable}
        onRefreshClick={handleRenewUserAgent}
        onOpenOptionsClick={handleOpenOptions}
      />
      {isShowRateBtn && <Feedback onRateLinkClick={handleRateLinkClick} />}
      <Footer version={version} onBugReportClick={handleBugReportClick} />
    </>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
