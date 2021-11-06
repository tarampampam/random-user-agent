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

            <li class="control" v-for="id in [randomString()]">
              <label :for="id">
                {{ i18n('js_protection', 'Protect against detection by JavaScript') }}
              </label>
              <toggle
                :id="id"
                :checked="settings.jsProtection.enabled"
                @change="value => {settings.jsProtection.enabled = value; saved = false}"
              />
            </li>

            <li class="control" v-for="id in [randomString()]">
              <div>
                <label :for="id">
                  {{
                    i18n('custom_useragent', 'Use one of (in the randomized order) custom User-Agent instead generated')
                  }}
                </label>
                <div class="hint">
                  {{ i18n('custom_useragent_list', 'Custom User-Agents (set a specific User-Agents, one per line)') }}:
                </div>
                <div class="option">
                  <!-- Length limitation reason: <https://github.com/tarampampam/random-user-agent/issues/172> -->
                  <textarea
                    placeholder="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7; rv:92.0) Gecko/20010101 Firefox/92.0"
                    maxlength="4096"
                    rows="7"
                    :disabled="!settings.customUseragent.enabled"
                    v-model="settings.customUseragent.list"
                    @change="saved = false"
                  ></textarea>
                </div>
              </div>
              <toggle
                :id="id"
                :checked="settings.customUseragent.enabled"
                @change="value => {settings.customUseragent.enabled = value; saved = false}"
              />
            </li>
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
        {{ i18n('like_this_extension', 'Do you like this extension?') }}
        <a href="https://github.com/tarampampam/random-user-agent" target="_blank">
          {{ i18n('give_a_star_on_github', 'Give us a star on GitHub!') }}
        </a>
      </div>
    </footer>
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import i18n from '../mixins/i18n'
import {RuntimeSender, Sender} from '../../messaging/runtime'
import {getSettings, GetSettingsResponse} from '../../messaging/handlers/get-settings'
import {BlacklistMode} from '../../settings/settings'
import {GeneratorType} from '../../useragent/generator'
import {Mutation} from './store'

import Toggle from './common/toggle.vue'
import Alert from './common/alert.vue'
import PrimaryButton from './common/primary-button.vue'
import PagesSwitcher from './extended/pages-switcher.vue'

import EnableSwitcher from './controls/enable-switcher.vue'
import RenewInterval from './controls/renew-interval.vue'
import RenewOnStartup from './controls/renew-on-startup.vue'

const backend: Sender = new RuntimeSender,
  randomString = (): string => {
    return Math.random().toString(36).substring(3)
  }

export default defineComponent({
  components: {
    'toggle': Toggle,
    'alert': Alert,
    'primary-button': PrimaryButton,
    'pages-switcher': PagesSwitcher,
    'enable-switcher': EnableSwitcher,
    'renew-interval': RenewInterval,
    'renew-on-startup': RenewOnStartup,
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

    randomString(): string {
      return randomString()
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

        this.settings.enabled = settings.enabled
        this.settings.renew.enabled = settings.renew.enabled
        this.settings.renew.intervalSec = Math.round(settings.renew.intervalMillis / 1000)
        this.settings.renew.onStartup = settings.renew.onStartup
        this.settings.customUseragent.enabled = settings.customUseragent.enabled
        this.settings.customUseragent.list = settings.customUseragent.list
        this.settings.jsProtection.enabled = settings.jsProtection.enabled
        this.settings.generator.types = settings.generator.types
        this.settings.blacklist.modeWhitelist = settings.blacklist.mode === BlacklistMode.WhiteList
        this.settings.blacklist.domains = settings.blacklist.domains
        this.settings.blacklist.custom.rules = settings.blacklist.custom.rules
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

textarea {
  display: block;
  width: 100%;
  min-height: 4em;
  resize: vertical;
  padding: .7em .5em;

  box-sizing: border-box;
  border-style: solid;
  border-width: 1px;

  &::placeholder {
    //color: var(--options-placeholder-color);
  }

  &:focus, &:focus-visible {
    outline: none;
  }
}

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

        li {
          padding: 1.5rem .3rem;
        }

        li {
          //  display: flex;
          //  justify-content: space-between;
          //  align-items: center;
          //  padding: 1.5rem .3rem;
          //
          //  .hint, .option {
          //    display: block;
          //    padding: .8em 0 0 0;
          //    font-size: .9em;
          //    margin: 0;
          //    max-width: 90%;
          //  }
          //
          //  .hint {
          //    opacity: .7;
          //  }
          //
          //  .option {
          //    opacity: .9;
          //  }

          &:not(:last-child) {
            border: solid var(--options-border-primary-color);
            border-width: 0 0 1px 0;
          }
        }
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
    font-size: .85em;

    &, a {
      color: var(--options-footer-text-color);
    }
  }
}
</style>
