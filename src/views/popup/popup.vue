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
import i18n from './../mixins/i18n'
import PopupHeader from './extended/header.vue'
import ActiveUserAgent from './extended/active-user-agent.vue'
import Actions from './extended/actions.vue'
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
    'popup-footer': PopupFooter,
  },
  mixins: [i18n],
  data: (): { [key: string]: any } => {
    return {
      enabled: false,
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

<style lang="scss">
:root {
  --popup-main-bg-color: #fff;
  --popup-secondary-bg-color: #f2f2f2;
  --popup-main-text-color: #111;
  --popup-actions-secondary-color: #e9e9e9;
  --popup-action-text-color: #3b3b3b;
  --popup-action-hover-bg-color: #f2f2ed;
  --popup-blinking-bg-1-color: rgba(87, 222, 114, 0.2);
  --popup-blinking-bg-2-color: rgba(87, 222, 114, 0.25);

  --popup-active-ua-text-color: #333;
  --popup-enabled-switcher-bg-color: #57de72;

  --popup-footer-text-color: rgba(0, 0, 0, .25);
}

@media (prefers-color-scheme: dark) {
  :root {
    --popup-main-bg-color: #2f2f2f;
    --popup-secondary-bg-color: #2a2a2a;
    --popup-main-text-color: #fbfbfb;
    --popup-actions-secondary-color: #3a3a3a;
    --popup-action-text-color: #eee;
    --popup-action-hover-bg-color: #3a3a3a;

    --popup-active-ua-text-color: #ebebeb;
    --popup-enabled-switcher-bg-color: #2a9f41;

    --popup-footer-text-color: rgba(255, 255, 255, .35);
  }
}
</style>