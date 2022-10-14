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
  <war-hint v-if="showWarHint"/>
  <popup-footer :version="version"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import i18n from './../mixins/i18n'
import PopupHeader from './extended/header.vue'
import ActiveUserAgent from './extended/active-user-agent.vue'
import Actions from './extended/actions.vue'
import WarHint from './extended/war-hint.vue'
import PopupFooter from './extended/footer.vue'
import {version, VersionResponse} from '../../messaging/handlers/version'
import {RuntimeSender, Sender} from '../../messaging/runtime'
import {renewUseragent, RenewUseragentResponse} from '../../messaging/handlers/renew-useragent'
import {enabledForDomain, EnabledForDomainResponse} from '../../messaging/handlers/enabled-for-domain'
import {changeForDomain} from '../../messaging/handlers/change-for-domain'
import {updateSettings} from '../../messaging/handlers/update-settings'
import {getSettings, GetSettingsResponse} from '../../messaging/handlers/get-settings'
import {getUseragent, GetUseragentResponse} from '../../messaging/handlers/get-useragent'

const errorsHandler: (err: Error) => void = console.error,
  backend: Sender = new RuntimeSender

export default defineComponent({
  components: {
    'popup-header': PopupHeader,
    'active-user-agent': ActiveUserAgent,
    'actions': Actions,
    'war-hint': WarHint,
    'popup-footer': PopupFooter,
  },
  mixins: [i18n],
  data: (): { [key: string]: any } => {
    return {
      enabled: false,
      enabledOnThisDomain: false,
      useragent: '',
      version: '',
      showWarHint: false,

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
        .send(updateSettings({enabled: !this.enabled}))
        .then((): void => {
          this.enabled = !this.enabled

          this.refreshCurrentTab()
        })
        .catch(errorsHandler)
    },

    refreshUserAgent(): void {
      backend
        .send(renewUseragent())
        .then((resp): void => {
          this.useragent = (resp[0] as RenewUseragentResponse).payload.new.useragent
        })
        .catch(errorsHandler)
    },

    openSettings(): void {
      chrome.runtime.openOptionsPage()
    },
  },
  created(): void {
    if (chrome.i18n.getUILanguage().toLowerCase().startsWith('ru')) {
      this.showWarHint = true
    }

    backend
      .send( // order is important!
        version(),
        getSettings(),
        getUseragent(),
      )
      .then((resp): void => { // update the current states
        this.version = (resp[0] as VersionResponse).payload.version
        const settings = (resp[1] as GetSettingsResponse).payload
        this.useragent = (resp[2] as GetUseragentResponse).payload.info?.useragent || ''

        this.enabled = settings.enabled
      })
      .catch(errorsHandler)

    // query current page URI
    try {
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
    } catch (err) {
      errorsHandler(err as Error)
    }
  },
  mounted(): void {
    // start state refresher
    window.setInterval((): void => {
      backend
        .send( // order is important!
          getSettings(),
          enabledForDomain(this.currentPageDomain),
          getUseragent(),
        )
        .then((resp): void => {
          const settings = (resp[0] as GetSettingsResponse).payload
          this.enabledOnThisDomain = (resp[1] as EnabledForDomainResponse).payload.enabled
          this.useragent = (resp[2] as GetUseragentResponse).payload.info?.useragent || ''

          this.enabled = settings.enabled
        })
        .catch(errorsHandler)
    }, 500) // twice in a one second
  },
})
</script>

<style lang="scss" src="../styles/colors.scss"/>
<style lang="scss" src="./styles/main.scss"/>

<style lang="scss" scoped>
//
</style>
