<template>
  <main>
    <header>
      <div class="container">
        <alert
          v-if="false"
          text="foo"
          type="success"
        />
      </div>
    </header>
    <section class="container">
      <nav>
        <pages-switcher/>
        <div class="actions">
          <primary-button
            v-if="!$store.state.saved"
            :text="i18n('save_changes', 'Save changes')"
            @click="save"
          />
        </div>
      </nav>
      <aside>
        <div v-if="$store.state.page === 'general'">
          <h1>{{ i18n('general_settings', 'General settings') }}</h1>
          <p>{{ i18n('general_settings_hint', 'Change the behavior of the switcher to best fit your needs') }}:</p>

          <ul>
            <enable-switcher/>
            <renew-interval/>
            <renew-on-startup/>
            <js-protection/>
            <custom-ua-list/>
          </ul>
        </div>
        <div v-else-if="$store.state.page === 'generator'">
          <h1>{{ i18n('generator_settings', 'Generator settings') }}</h1>
          <p>{{ i18n('generator_settings_hint', 'Here you can change the agent switching behavior') }}:</p>
        </div>
        <div v-else-if="$store.state.page === 'blacklist'">
          <h1>{{ i18n('blacklist_settings', 'Blacklist settings') }}</h1>
          <p>{{
              i18n('blacklist_settings_hint', 'Blacklist mode - switching enabled everywhere, except the defined ' +
                'domains & rules. Whitelist - on the contrary, disabled everywhere except the specified domains & rules')
            }}:</p>
        </div>
        <div v-else>
          <h1>(╯°□°)╯︵ ┻━┻</h1>
        </div>
      </aside>
    </section>
    <footer>
      <div class="container">
        <footer-block/>
      </div>
    </footer>
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import i18n from '../mixins/i18n'
import {RuntimeSender, Sender} from '../../messaging/runtime'
import {getSettings, GetSettingsResponse} from '../../messaging/handlers/get-settings'
import {GeneratorType} from '../../useragent/generator'
import {Mutation} from './store'

import Toggle from './common/toggle.vue'
import Alert from './common/alert.vue'
import PrimaryButton from './common/primary-button.vue'
import PagesSwitcher from './extended/pages-switcher.vue'
import FooterBlock from './extended/footer-block.vue'

import EnableSwitcher from './controls/enable-switcher.vue'
import RenewInterval from './controls/renew-interval.vue'
import RenewOnStartup from './controls/renew-on-startup.vue'
import JSProtection from './controls/js-protection.vue'
import CustomUAList from './controls/custom-ua-list.vue'

const backend: Sender = new RuntimeSender

export default defineComponent({
  components: {
    'toggle': Toggle,
    'alert': Alert,
    'primary-button': PrimaryButton,
    'pages-switcher': PagesSwitcher,
    'enable-switcher': EnableSwitcher,
    'renew-interval': RenewInterval,
    'renew-on-startup': RenewOnStartup,
    'js-protection': JSProtection,
    'custom-ua-list': CustomUAList,
    'footer-block': FooterBlock,
  },
  mixins: [i18n],
  data: (): { [key: string]: any } => {
    return {
      settings: {
        enabled: false,
        renew: {
          enabled: false,
          intervalSec: 0,
          onStartup: false,
        },
        customUseragent: {
          enabled: false,
          list: [] as string[],
        },
        jsProtection: {
          enabled: false,
        },
        generator: {
          types: [] as GeneratorType[],
        },
        blacklist: {
          modeWhitelist: false,
          domains: [] as string[],
          custom: {
            rules: [] as string[],
          },
        },
      },
    }
  },
  methods: {
    handleError(err: Error): void {
      console.error(err)
    },

    save(): void {
      this.$store.commit(Mutation.Save)
    },
  },
  created(): void {
    // TODO uncomment this:
    // window.addEventListener('beforeunload', (event): void => {
    //   if (!this.$store.state.saved) {
    //     event.returnValue = 'You have unsaved changes!'
    //   }
    // })

    backend
      .send(getSettings())
      .then((resp): void => {
        const settings = (resp[0] as GetSettingsResponse).payload

        this.$store.commit(Mutation.UpdateEnabled, settings.enabled)
        this.$store.commit(Mutation.UpdateRenew, {
          enabled: settings.renew.enabled,
          intervalSec: Math.round(settings.renew.intervalMillis / 1000),
          onStartup: settings.renew.onStartup,
        })
        this.$store.commit(Mutation.UpdateJSProtection, {
          enabled: settings.jsProtection.enabled,
        })
        this.$store.commit(Mutation.UpdateCustomUserAgent, {
          enabled: settings.customUseragent.enabled,
          list: settings.customUseragent.list,
        })
      })
      .then((): void => {
        this.$store.commit(Mutation.Save) // just a little "logic" hack :)
      })
      .catch(this.handleError)
  },
})
</script>

<style lang="scss" src="../styles/colors.scss"/>
<style lang="scss" src="./styles/main.scss"/>

<style lang="scss" scoped>
$header-height: 80px;
$footer-height: 3.5rem;

main {
  position: relative;
  min-height: 100vh;

  .container {
    max-width: 990px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  header {
    box-sizing: border-box;
    padding-top: .9rem;
    min-height: $header-height;
  }

  section {
    display: flex;

    nav {
      flex: 1;
      padding-bottom: $footer-height;

      .actions {
        margin-top: 2em;

        .btn {
          padding-left: 2em;
          padding-right: 2em;
        }
      }
    }

    aside {
      flex: 2.3;
      padding-left: 1rem;
      padding-bottom: $footer-height;
      margin-top: .5rem;

      h1 {
        font-weight: bold;
        font-size: 2em;
        margin: 0;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
    }
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: $footer-height;

    display: flex;
    align-items: center;

    background-color: var(--options-footer-bg-color);
  }
}
</style>
