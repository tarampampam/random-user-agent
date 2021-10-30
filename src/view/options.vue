<template>
  <overlay-alert :caption="'⛔ ' + i18n('error_occurred', 'Error occurred')"
                 :message="error.message"
                 @click="error.visible = false"
                 v-if="error.visible"/>

  <article>
    <h1>
      {{ i18n('general_settings', 'General settings') }}
      <input type="button"
             class="save-btn"
             v-if="saveButtons.general"
             :value="i18n('save_changes', 'Save changes')"
             @click="save"/>
    </h1>

    <p>{{ i18n('general_settings_hint', 'Change the behavior of the switcher to best fit your needs') }}:</p>

    <ul class="list">
      <list-checkbox :checked="settings.enabled"
                     :caption="i18n('enable_switcher', 'Enable Switcher')"
                     @change="value => {settings.enabled = value; saveButtons.general = true}"/>
      <list-checkbox :checked="settings.renew.enabled"
                     :caption="i18n('auto_renew', 'Automatically change the User-Agent after specified period of time')"
                     @change="value => {settings.renew.enabled = value; saveButtons.general = true}"/>
      <list-number :value="Math.round(settings.renew.intervalMillis / 1000)"
                   :caption="i18n('auto_renew_interval', 'Time (in seconds) to automatically update the User-Agent (e.g. 1 hour = 3600)')"
                   :minimum="1"
                   :maximum="86400"
                   :placeholder="60"
                   @change="value => {settings.renew.intervalMillis = Math.round(value * 1000); saveButtons.general = true}"/>
      <list-checkbox :checked="settings.renew.onStartup"
                     :caption="i18n('auto_renew_on_startup', 'Change User-Agent on browser startup')"
                     @change="value => {settings.renew.onStartup = value; saveButtons.general = true}"/>
      <list-checkbox :checked="settings.jsProtection.enabled"
                     :caption="i18n('js_protection', 'Protect against detection by JavaScript')"
                     @change="value => {settings.jsProtection.enabled = value; saveButtons.general = true}"/>
      <list-checkbox :checked="settings.customUseragent.enabled"
                     :caption="i18n('custom_useragent', 'Use one of (in the randomized order) custom User-Agent instead generated')"
                     @change="value => {settings.customUseragent.enabled = value; saveButtons.general = true}"/>
      <!-- Length limitation reason: <https://github.com/tarampampam/random-user-agent/issues/172> -->
      <list-textarea :value="settings.customUseragent.list"
                     :caption="i18n('custom_useragent_list', 'Custom User-Agents (set a specific User-Agents, one per line)') + ':'"
                     :maxlength="4096"
                     placeholder="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7; rv:92.0) Gecko/20010101 Firefox/92.0"
                     @change="value => {settings.customUseragent.list = value; saveButtons.general = true}"/>
    </ul>

    <h2>
      {{ i18n('generator_settings', 'Generator settings') }}
      <input type="button"
             class="save-btn"
             v-if="saveButtons.generator"
             :value="i18n('save_changes', 'Save changes')"
             @click="save"/>
    </h2>

    <p>{{ i18n('generator_settings_hint', 'Here you can change the agent switching behavior') }}:</p>

    <ul class="set">
      <li v-for="generatorType in allGeneratorTypes">
        <label><input type="checkbox"
                      :key="generatorType"
                      :value="generatorType"
                      :name="generatorType"
                      v-model="settings.generator.types"
                      @change="saveButtons.generator = true">{{ i18n(generatorType) }}</label>
      </li>
    </ul>

    <h2>
      {{ i18n('blacklist_settings', 'Blacklist settings') }}
      <input type="button"
             class="save-btn"
             v-if="saveButtons.blacklist"
             :value="i18n('save_changes', 'Save changes')"
             @click="save"/>
    </h2>

    <p>{{
        i18n('blacklist_settings_hint', 'Blacklist mode - switching enabled everywhere, except the defined domains & rules. Whitelist - on the contrary, disabled everywhere except the specified domains & rules')
      }}:</p>

    <ul class="list">
      <list-checkbox :checked="settings.blacklist.modeWhitelist"
                     :caption="i18n('white_black_list_mode', 'Whitelist mode (blacklist mode - disabled, whitelist mode - enabled)')"
                     @change="value => {settings.blacklist.modeWhitelist = value; saveButtons.blacklist = true}"/>
      <list-textarea :value="settings.blacklist.domains"
                     :caption="i18n('blacklist_domains', 'Domain names list (one per line)') + ':'"
                     placeholder="docs.google.com"
                     @change="value => {settings.blacklist.domains = value; saveButtons.blacklist = true}"/>
      <list-textarea :value="settings.blacklist.custom.rules"
                     :caption="i18n('blacklist_custom_rules', 'Custom rules (one per line)') + ':'"
                     placeholder="http?://*google.com/*"
                     :hint="i18n('blacklist_custom_rules_hint', 'You can use wildcards such as * and ?')"
                     @change="value => {settings.blacklist.custom.rules = value; saveButtons.blacklist = true}"/>
    </ul>

    <div v-if="prev_settings">
      <h3>{{ i18n('previous_settings', 'Previous settings') }} <input type="button"
                                                                      :value="i18n('remove', 'Remove')"
                                                                      @click="removePrevSettings"/></h3>

      <p>{{
          i18n('previous_settings_hint', 'These settings were used by you on the previous extension version. Keep it somewhere or remove')
        }}:</p>

      <pre>{{ prev_settings }}</pre>
    </div>
  </article>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import i18n from './mixins/i18n'
import OverlayAlert from './components/popup/overlay-alert.vue'
import ListCheckbox from './components/options/list-checkbox.vue'
import ListTextarea from './components/options/list-textarea.vue'
import ListNumber from './components/options/list-number.vue'
import {RuntimeSender, Sender} from '../messaging/runtime'
import {getSettings, GetSettingsResponse} from '../messaging/handlers/get-settings'
import {GeneratorType} from '../useragent/generator'
import {BlacklistMode} from '../settings/settings'
import {updateSettings} from '../messaging/handlers/update-settings'

const backend: Sender = new RuntimeSender,
  v2_config_key: string = 'extension_settings_v2'

export default defineComponent({
  components: {
    'list-checkbox': ListCheckbox,
    'list-number': ListNumber,
    'list-textarea': ListTextarea,
    'overlay-alert': OverlayAlert,
  },
  mixins: [i18n],
  data: (): { [key: string]: any } => {
    return {
      settings: {
        enabled: false,
        renew: {
          enabled: false,
          intervalMillis: 0,
          onStartup: false,
        },
        customUseragent: {
          enabled: false,
          list: [],
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

      error: {
        visible: false,
        message: undefined as string | undefined,
      },

      saveButtons: { // visibility
        general: false,
        generator: false,
        blacklist: false,
      },

      prev_settings: undefined as string | undefined, // TODO remove this property after a some time
    }
  },
  computed: {
    allGeneratorTypes(): string[] {
      return Object.values(GeneratorType as { [key: string]: string })
    },
  },
  methods: {
    handleError(err: Error): void {
      console.error(err)

      this.error.message = err.toString()
      this.error.visible = true
    },

    save(): void {
      backend
        .send(updateSettings({
          enabled: this.settings.enabled,
          renew: {
            enabled: this.settings.renew.enabled,
            intervalMillis: this.settings.renew.intervalMillis,
            onStartup: this.settings.renew.onStartup,
          },
          customUseragent: {
            enabled: this.settings.customUseragent.enabled,
            list: this.settings.customUseragent.list.slice(0), // proxy object to the plain array
          },
          jsProtection: {
            enabled: this.settings.jsProtection.enabled,
          },
          generator: {
            types: this.settings.generator.types.slice(0), // proxy object to the plain array
          },
          blacklist: {
            mode: this.settings.blacklist.modeWhitelist ? BlacklistMode.WhiteList : BlacklistMode.BlackList,
            domains: this.settings.blacklist.domains.slice(0), // proxy object to the plain array
            custom: {
              rules: this.settings.blacklist.custom.rules.slice(0), // proxy object to the plain array
            },
          },
        }))
        .then((): void => {
          for (const [key] of Object.entries(this.saveButtons)) {
            this.saveButtons[key] = false
          }
        })
        .catch(this.handleError)
    },

    removePrevSettings(): void { // TODO remove this method after a some time
      chrome.storage.sync.remove(v2_config_key)

      this.prev_settings = undefined
    },
  },
  created(): void {
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

    try { // TODO remove this block after a some time
      // load the prev extension settings
      chrome.storage.sync.get(v2_config_key, (data) => {
        if (chrome.runtime.lastError) {
          throw new Error(chrome.runtime.lastError.message)
        }

        if (typeof data === 'object' && data.hasOwnProperty(v2_config_key)) {
          this.prev_settings = JSON.stringify(data[v2_config_key], null, 2)
        }
      })
    } catch (e) {
      console.warn(e)
    }
  },
})
</script>

<style lang="scss">
:root {
  --options-main-bg-color: #fff;
  --options-main-text-color: #111;
  --options-scrollbar-color: #aaa;
  --options-second-bg-color: #eee;
  --options-input-border-color: #ccc;
  --options-placeholder-color: #bbb;
  --options-hint-color: #666;
  --options-scrollbar-width: 8px;
  --options-shadow-color: rgba(0, 0, 0, 0.2);
}

@media (prefers-color-scheme: dark) {
  :root {
    --options-main-bg-color: #23222b;
    --options-main-text-color: #fbfbfe;
    --options-scrollbar-color: #666;
    --options-second-bg-color: #4e4d54;
    --options-input-border-color: #5e5c65;
    --options-placeholder-color: #777;
    --options-hint-color: #aaa;
    --options-shadow-color: rgba(200, 200, 200, 0.3);
  }
}

::-webkit-scrollbar {
  width: var(--options-scrollbar-width);
  height: var(--options-scrollbar-width);
}

::-webkit-scrollbar-thumb {
  border: 2px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: var(--options-scrollbar-width);
  background-color: var(--options-scrollbar-color);
}

html, body {
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, Arial, sans-serif;
  font-weight: 400;
  font-size: 12px;
  min-width: 500px;
  background-color: var(--options-main-bg-color);
  color: var(--options-main-text-color);
}

article {
  padding: 0 2em;
}

.save-btn {
  margin-left: .5em;
  padding: 0 1em;
  box-shadow: 0 0 12px -2px var(--options-shadow-color);
}

ul {
  list-style: none;
  padding: 0;

  &.list {
    li {
      padding: 1em 0;

      &:not(:last-child) {
        border: solid var(--options-second-bg-color);
        border-width: 0 0 1px 0;
      }
    }
  }

  &.set {
    columns: 3;

    li {
      break-inside: avoid-column;

      padding: .5em 0;

      label {
        display: flex;
        align-items: center;

        input {
          margin-right: .2em;
        }
      }
    }
  }
}
</style>
