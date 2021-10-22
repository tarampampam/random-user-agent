<template>
  <popup-header :enabled="enabled"
                @clickEnabled="changeEnabled"/>
  <active-user-agent :useragent="useragent"/>
  <actions :enabledOnThisDomain="enabledOnThisDomain"
           :enabled="enabled"
           :enabledOnThisDomainTitle="currentPageDomain"
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
import {renewUseragent, RenewUseragentResponse} from '../api/handlers/renew-useragent'
import {enabledForDomain, EnabledForDomainResponse} from '../api/handlers/enabled-for-domain'
import {changeForDomain} from '../api/handlers/change-for-domain'

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

      currentPageDomain: '',
      currentTabID: undefined as number | undefined,
    }
  },
  methods: {
    refreshCurrentTab(): void {
      if (typeof this.currentTabID === 'number') { // refresh the current tab
        chrome.tabs.reload(this.currentTabID)
      }
    },

    changeEnabledOnThisDomain(): void {
      backend
        .send(changeForDomain(this.currentPageDomain, !this.enabledOnThisDomain))
        .then((): void => {
          this.enabledOnThisDomain = !this.enabledOnThisDomain

          this.refreshCurrentTab()
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
        .send(renewUseragent())
        .then((resp): void => {
          this.useragent = (resp[0] as RenewUseragentResponse).payload.new

          this.refreshCurrentTab()
        })
        .catch(errorsHandler)
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

    // query current page URI
    chrome.tabs.query({active: true, currentWindow: true}, (tabs): void => {
      if (tabs.length > 0 && typeof tabs[0].url === 'string') {
        this.currentPageDomain = new URL(tabs[0].url as string).hostname
        this.currentTabID = tabs[0].id

        backend
          .send(enabledForDomain(this.currentPageDomain))
          .then(resp => {
            this.enabledOnThisDomain = (resp[0] as EnabledForDomainResponse).payload.enabled
          })
          .catch(errorsHandler)
      } else {
        throw new Error('Cannot get the URL of the current page')
      }
    })
  },
  mounted(): void {
    // start state refresher
    window.setInterval((): void => {
      backend
        .send( // order is important!
          getUseragent(),
          getEnabled(),
          enabledForDomain(this.currentPageDomain),
        )
        .then((resp): void => {
          this.useragent = (resp[0] as GetUseragentResponse).payload.useragent || ''
          this.enabled = (resp[1] as GetEnabledResponse).payload.enabled
          this.enabledOnThisDomain = (resp[2] as EnabledForDomainResponse).payload.enabled
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
