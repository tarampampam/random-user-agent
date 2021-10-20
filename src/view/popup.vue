<template>
  <popup-header :paused="paused"
                @clickPaused="changePaused"/>
  <active-user-agent :useragent="useragent"/>
  <actions :enabled="enabled"
           :paused="paused"
           @clickEnabled="changeEnabled"
           @clickPaused="changePaused"
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
      useragent: '',
      enabled: false, // enabled on this domain
      paused: true, // working is paused
      version: '', // current extension version
    }
  },
  methods: {
    changePaused(): void {
      this.paused = !this.paused
    },
    changeEnabled(): void {
      this.enabled = !this.enabled
    },
    refreshUserAgent(): void {
      console.log('refreshUserAgent')
    },
    openSettings(): void {
      chrome.runtime.openOptionsPage()
    },
  },
  created() {
    backend
      .send( // order is important!
        version(),
        getEnabled(),
        getUseragent(),
      )
      .then(resp => {
        // update the current states
        this.version = (resp[0] as VersionResponse).payload.version
        this.paused = !(resp[1] as GetEnabledResponse).payload.enabled
        this.useragent = (resp[2] as GetUseragentResponse).payload.useragent || ''

        // save new state on changes
        this.$watch(() => this.paused, (paused) => {
          backend.send(setEnabled(!paused)).catch(errorsHandler)
        })
      })
      .catch(errorsHandler)
  },
})
</script>

<style lang="scss">
$popup-width: 280px;

// Disable user-selection by default
//*, :after, :before {
//  box-sizing: border-box;
//  user-select: none;
//  -moz-user-select: none; // Firefox still requires their prefix
//}

html, body {
  min-width: $popup-width;
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
