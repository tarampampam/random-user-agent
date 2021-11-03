<template>
  <main>
    <header>
      <div class="container">
        <!--div class="alert success">
          <span>Notification</span>
        </div-->
      </div>
    </header>
    <section class="container">
      <nav>
        <ul>
          <li :class="{active: page === 'general'}"
              @click="page = 'general'">
            <span>{{ i18n('general_settings', 'General settings') }}</span>
          </li>
          <li :class="{active: page === 'generator'}"
              @click="page = 'generator'">
            <span>{{ i18n('generator_settings', 'Generator settings') }}</span>
          </li>
          <li :class="{active: page === 'blacklist'}"
              @click="page = 'blacklist'">
            <span>{{ i18n('blacklist_settings', 'Blacklist settings') }}</span>
          </li>
        </ul>
        <div class="actions">
          <input
            v-if="!saved"
            type="button"
            class="btn"
            @click="save"
            :value="i18n('save_changes', 'Save changes')"
          />
        </div>
      </nav>
      <aside>
        <div v-if="page === 'general'">
          <h1>{{ i18n('general_settings', 'General settings') }}</h1>
          <p>{{ i18n('general_settings_hint', 'Change the behavior of the switcher to best fit your needs') }}:</p>

          <ul>
            <li class="control" v-for="id in [randomString()]">
              <label :for="id">
                {{ i18n('enable_switcher', 'Enable Switcher') }}
              </label>
              <toggle
                :id="id"
                :checked="settings.enabled"
                @change="value => {settings.enabled = value; saved = false}"
              />
            </li>

            <li class="control" v-for="id in [randomString()]">
              <div>
                <label :for="id">
                  {{ i18n('auto_renew', 'Automatically change the User-Agent after specified period of time') }}
                </label>
                <div class="hint">
                  {{
                    i18n(
                      'auto_renew_interval',
                      'Time (in seconds) to automatically update the User-Agent (e.g. 1 hour = 3600)',
                    )
                  }}
                </div>
                <div class="option">
                  <input
                    type="number"
                    :disabled="!settings.renew.enabled"
                    :value="Math.round(settings.renew.intervalMillis / 1000)"
                    min="1"
                    max="86400"
                    placeholder="60"
                    required
                  />
                </div>
              </div>
              <toggle
                :id="id"
                :checked="settings.renew.enabled"
                @change="value => {settings.renew.enabled = value; saved = false}"
              />
            </li>
          </ul>
        </div>
        <div v-else-if="page === 'generator'">
          <h1>{{ i18n('generator_settings', 'Generator settings') }}</h1>
          <p>{{ i18n('generator_settings_hint', 'Here you can change the agent switching behavior') }}:</p>
        </div>
        <div v-else-if="page === 'blacklist'">
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
import i18n from './mixins/i18n'
import {RuntimeSender, Sender} from '../messaging/runtime'
import {getSettings, GetSettingsResponse} from '../messaging/handlers/get-settings'
import Toggle from './components/options/toggle.vue'
import {BlacklistMode} from '../settings/settings'
import {GeneratorType} from '../useragent/generator'

const backend: Sender = new RuntimeSender

export default defineComponent({
  components: {
    'toggle': Toggle,
  },
  mixins: [i18n],
  data: (): { [key: string]: any } => {
    return {
      page: 'general' as 'general' | 'generator' | 'blacklist',
      saved: true,

      settings: {
        enabled: false,
        renew: {
          enabled: false,
          intervalMillis: 0,
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
      this.saved = true
    },

    randomString(): string {
      return Math.random().toString(36).substring(3)
    },
  },
  created(): void {
    window.addEventListener('beforeunload', (event): void => {
      if (!this.saved) {
        event.returnValue = 'You have unsaved changes!'
      }
    })

    backend
      .send(getSettings())
      .then((resp): void => {
        const settings = (resp[0] as GetSettingsResponse).payload

        this.settings.enabled = settings.enabled
        this.settings.renew.enabled = settings.renew.enabled
        this.settings.renew.intervalMillis = settings.renew.intervalMillis
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

<style lang="scss">
:root {
  --options-scrollbar-color: #aaa;
  --options-bg-primary-color: #fff;
  --options-text-primary-color: #454545;
  --options-border-primary-color: #e7e7e7;

  --options-nav-active-color: #66b574;

  --options-btn-bg-color: #68bc86;
  --options-btn-bg-hover-color: #5ba575;
  --options-btn-text-color: #fff;
  --options-btn-border-color: #68bc86;

  --options-toggle-brick-bg-color: #fff;
  --options-toggle-off-bg-color: #f56f23;
  --options-toggle-on-bg-color: #62c162;

  --options-success-bg-color: #d1e7dd;
  --options-success-border-color: #badbcc;
  --options-success-text-color: #0f5132;

  --options-error-bg-color: #f8d7da;
  --options-error-border-color: #f5c2c7;
  --options-error-text-color: #842029;

  --options-footer-bg-color: #787878;
  --options-footer-text-color: #fff;
}

@media (prefers-color-scheme: dark) {
  :root {
    //
  }
}

$header-height: 80px;
$footer-height: 3.5rem;
$scrollbar-width: 8px;

::-webkit-scrollbar {
  width: $scrollbar-width;
  height: $scrollbar-width;
}

::-webkit-scrollbar-thumb {
  border: 2px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: $scrollbar-width;
  background-color: var(--options-scrollbar-color);
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, Arial, sans-serif;
  font-size: 16px;
  background-color: var(--options-bg-primary-color);

  &, a {
    color: var(--options-text-primary-color);
  }
}

.alert {
  border-radius: 5px;
  padding: 1rem;
  border-style: solid;
  border-width: 1px;
  background-color: var(--options-bg-primary-color);
  border-color: var(--options-border-primary-color);
  color: var(--options-text-primary-color);

  &.success {
    background-color: var(--options-success-bg-color);
    border-color: var(--options-success-border-color);
    color: var(--options-success-text-color);
  }

  &.error {
    background-color: var(--options-error-bg-color);
    border-color: var(--options-error-border-color);
    color: var(--options-error-text-color);
  }
}

.btn {
  display: inline-block;
  cursor: pointer;
  border-radius: 0.25rem;
  line-height: 1.5;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  user-select: none;
  padding: 0.5rem 1rem;
  margin: 0;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out;
  border-style: solid;
  border-width: 1px;

  background-color: var(--options-btn-bg-color);
  border-color: var(--options-btn-border-color);
  color: var(--options-btn-text-color);

  &:hover {
    background-color: var(--options-btn-bg-hover-color);
  }

  &.passive {
    background-color: var(--options-text-primary-color);
    border-color: var(--options-text-primary-color);
    color: var(--options-bg-primary-color);
  }
}

input[type='text'], input[type='number'] {
  padding: 0.5rem 1rem;
  margin: 0;
  border-style: solid;
  border-width: 1px;

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

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          padding: 1.2rem 0;
          cursor: pointer;

          span {
            position: relative;
          }

          &.active {
            span:before {
              content: '';
              position: absolute;
              left: 0;
              right: 0;
              height: .25em;
              background-color: var(--options-nav-active-color);
              bottom: -0.7em;
            }
          }

          &.active, &:hover {
            -webkit-text-stroke: 1px currentColor;
          }
        }
      }

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

          &.control {
            display: flex;
            justify-content: space-between;
            align-items: center;

            label {
              cursor: pointer;
            }

            .hint, .option {
              display: block;
              padding: .8em 0 0 0;
              font-size: .9em;
              margin: 0;
              max-width: 80%;
            }

            .hint {
              opacity: .7;
            }

            .option {
              opacity: .9;
            }
          }

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
