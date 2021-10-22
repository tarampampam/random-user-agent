<template>
  <popup-header :enabled="enabled"
                @clickEnabled="changeEnabled"/>
  <active-user-agent :useragent="useragent"/>
  <actions :enabledOnThisDomain="enabledOnThisDomain"
           :enabled="enabled"
           :enabledOnThisDomainTitle="currentPageUriPattern"
           @clickEnabledOnThisDomain="changeEnabledOnThisDomain"
           @clickEnabled="changeEnabled"
           @clickRefresh="refreshUserAgent"
           @clickSettings="openSettings"/>
  <popup-footer :version="version"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import i18n from './mixins/i18n'
import PopupHeader from './components/popup/header.vue'
import ActiveUserAgent from './components/popup/active-user-agent.vue'
import Actions from './components/popup/actions.vue'
import PopupFooter from './components/popup/footer.vue'
import {version, VersionResponse} from '../api/handlers/version'
import {RuntimeSender} from '../api/transport/runtime'
import {Sender} from '../api/transport/transport'
import {getEnabled, GetEnabledResponse} from '../api/handlers/get-enabled'
import {setEnabled} from '../api/handlers/set-enabled'
import {getUseragent, GetUseragentResponse} from '../api/handlers/get-useragent'
import {newUseragent, NewUseragentResponse} from '../api/handlers/new-useragent'
import {setUseragent} from '../api/handlers/set-useragent'
import {uriMatchesAnyException, UriMatchesAnyExceptionResponse} from '../api/handlers/uri-matches-any-exception'
import {manageException, ManageExceptionResponse} from '../api/handlers/manage-exception'
import {uriToPattern} from '../utils/exceptions'

const errorsHandler: (err: Error) => void = console.error,
  backend: Sender = new RuntimeSender

export default defineComponent({
  components: {
    'popup-header': PopupHeader,
    'active-user-agent': ActiveUserAgent,
    'actions': Actions,
    'popup-footer': PopupFooter,
  },
  mixins: [i18n],
  data: (): { [key: string]: any } => {
    return {
      enabled: true,
      enabledOnThisDomain: false,
      useragent: '',
      version: '',

      currentPageUriPattern: '',
    }
  },
  methods: {
    changeEnabledOnThisDomain(): void {
      backend
        .send(manageException(this.currentPageUriPattern, !this.enabledOnThisDomain ? 'remove' : 'add'))
        .then(resp => {
          if (!(resp[0] as ManageExceptionResponse).payload.success) {
            throw new Error(`Appending/removing from the exceptions list failed: ${this.currentPageUriPattern}`)
          }

          this.enabledOnThisDomain = !this.enabledOnThisDomain
        })
        .catch(errorsHandler)
    },

    changeEnabled(): void {
      backend
        .send(setEnabled(!this.enabled))
        .then((): void => {
          this.enabled = !this.enabled
        })
        .catch(errorsHandler)
    },

    refreshUserAgent(): void {
      backend
        .send(newUseragent())
        .then((resp): void => {
          const newUserAgent = (resp[0] as NewUseragentResponse).payload.useragent

          if (newUserAgent.length === 0) { // simple fuse
            throw new Error('Empty user-agent cannot be used')
          }

          backend
            .send(setUseragent(newUserAgent))
            .then((): void => {
              this.useragent = newUserAgent
            })
            .catch(errorsHandler)
        })
    },

    openSettings(): void {
      chrome.runtime.openOptionsPage()
    },
  },
  created(): void {
    backend
      .send( // order is important!
        version(),
        getEnabled(),
        getUseragent(),
      )
      .then((resp): void => { // update the current states
        this.version = (resp[0] as VersionResponse).payload.version
        this.enabled = (resp[1] as GetEnabledResponse).payload.enabled
        this.useragent = (resp[2] as GetUseragentResponse).payload.useragent || ''
      })
      .catch(errorsHandler)

    // update the "enabled" (on this domain) state
    chrome.tabs.query({active: true, currentWindow: true}, (tabs): void => {
      if (tabs.length > 0 && typeof tabs[0].url === 'string') {
        const currentPageUri = tabs[0].url as string

        this.currentPageUriPattern = uriToPattern(currentPageUri)

        backend
          .send(uriMatchesAnyException(currentPageUri))
          .then(resp => {
            this.enabledOnThisDomain = !(resp[0] as UriMatchesAnyExceptionResponse).payload.matched
          })
          .catch(errorsHandler)
      }
    })
  },
  mounted(): void {
    // start state refresher
    window.setInterval((): void => {
      backend
        .send(getUseragent(), getEnabled())
        .then((resp): void => {
          this.useragent = (resp[0] as GetUseragentResponse).payload.useragent || ''
          this.enabled = (resp[1] as GetEnabledResponse).payload.enabled
        })
        .catch(errorsHandler)
    }, 500) // twice in a one second
  },
})
</script>

<style lang="scss">
*, :after, :before {
  user-select: none; // disable user-selection by default
}

::selection {
  color: #fff;
  background: #222;
}

html, body {
  width: 280px;
  height: auto;
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, Arial, sans-serif;
  font-weight: 400;
  font-size: 11px;
}

a {
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
