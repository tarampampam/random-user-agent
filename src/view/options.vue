<template>
  <h1>{{ i18n('general_settings') }}</h1>

  <p>{{ i18n('general_settings_hint') }}:</p>

  <ul class="list">
    <list-checkbox :caption="i18n('enable_switcher')"
                   :checked="enabled"
                   @change="saveEnabled"/>
    <list-checkbox :caption="i18n('auto_renew')"
                   :checked="renew_enabled"
                   @change="saveRenewEnabled"/>
    <list-number :caption="i18n('auto_renew_interval')"
                 :minimum="1"
                 :maximum="86400"
                 :placeholder="60"
                 :value="Math.round(renew_intervalMillis / 1000)"
                 @change="saveRenewInterval"/>
    <list-checkbox :caption="i18n('auto_renew_on_startup')"
                   :checked="renew_onStartup"
                   @change="saveRenewOnStartup"/>
    <list-checkbox :caption="i18n('js_protection')"
                   :checked="jsProtection_enabled"
                   @change="saveJsProtectionEnabled"/>
    <list-checkbox :caption="i18n('custom_useragent')"
                   :checked="customUseragent_enabled"
                   @change="saveCustomUseragentEnabled"/>
    <list-textarea :caption="i18n('custom_useragent_list') + ':'"
                   placeholder="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7; rv:92.0) Gecko/20010101 Firefox/92.0"
                   :value="customUseragent_list"
                   @change="saveCustomUseragentList"/>
  </ul>

  <h2>{{ i18n('generator_settings') }}</h2>

  <p>{{ i18n('generator_settings_hint') }}:</p>

  <ul class="set">
    <li v-for="generatorType in allGeneratorTypes">
      <label><input type="checkbox"
                    :key="generatorType"
                    :value="generatorType"
                    :name="generatorType"
                    v-model="generator_types"
                    @change="saveGeneratorTypes">{{ i18n(generatorType) }}</label>
    </li>
  </ul>

  <h2>{{ i18n('blacklist_settings') }}</h2>

  <p>{{ i18n('blacklist_settings_hint') }}:</p>

  <ul class="list">
    <list-checkbox :caption="i18n('white_black_list_mode')"
                   :checked="blacklist_mode_whitelist"
                   @change="saveBlacklistMode"/>
    <list-textarea :caption="i18n('blacklist_domains') + ':'"
                   placeholder="docs.google.com"
                   :value="blacklist_domains"
                   @change="saveBlacklistDomainsList"/>
    <list-textarea :caption="i18n('blacklist_custom_rules') + ':'"
                   placeholder="http?://*google.com/*"
                   :hint="i18n('blacklist_custom_rules_hint')"
                   :value="blacklist_custom_rules"
                   @change="saveBlacklistCustomRulesList"/>
  </ul>

  <div v-if="prev_settings">
    <h3>{{ i18n('previous_settings') }} <input type="button" :value="i18n('remove')" @click="removePrevSettings" /></h3>

    <p>{{ i18n('previous_settings_hint') }}:</p>

    <pre>{{ prev_settings }}</pre>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import i18n from './mixins/i18n'
import ListCheckbox from './components/options/list-checkbox.vue'
import ListTextarea from './components/options/list-textarea.vue'
import ListNumber from './components/options/list-number.vue'
import {RuntimeSender, Sender} from '../messaging/runtime'
import {getSettings, GetSettingsResponse} from '../messaging/handlers/get-settings'
import {GeneratorType, isValidType} from '../useragent/generator'
import {BlacklistMode} from '../settings/settings'
import {updateSettings} from '../messaging/handlers/update-settings'

const errorsHandler: (err: Error) => void = console.error,
  backend: Sender = new RuntimeSender

const v2_config_key: string = 'extension_settings_v2'

export default defineComponent({
  components: {
    'list-checkbox': ListCheckbox,
    'list-number': ListNumber,
    'list-textarea': ListTextarea,
  },
  mixins: [i18n],
  data: (): { [key: string]: any } => {
    return {
      enabled: false,
      renew_enabled: false,
      renew_intervalMillis: 0,
      renew_onStartup: false,
      customUseragent_enabled: false,
      customUseragent_list: [] as string[],
      jsProtection_enabled: false,
      generator_types: [] as GeneratorType[],
      blacklist_mode_whitelist: false,
      blacklist_domains: [] as string[],
      blacklist_custom_rules: [] as string[],

      allGeneratorTypes: Object.values(GeneratorType as {[key: string]: string}) as string[],

      prev_settings: undefined as string | undefined, // TODO remove this property after a some time
    }
  },
  methods: {
    saveEnabled(newState: boolean): void {
      backend.send(updateSettings({enabled: newState}))
        .then(() => this.enabled = newState)
        .catch(errorsHandler)
    },
    saveRenewEnabled(newState: boolean): void {
      backend.send(updateSettings({renew: {enabled: newState}}))
        .then(() => this.renew_enabled = newState)
        .catch(errorsHandler)
    },
    saveRenewInterval(newValue: number): void {
      newValue = Math.round(newValue * 1000)
      backend.send(updateSettings({renew: {intervalMillis: newValue}}))
        .then(() => this.renew_intervalMillis = newValue)
        .catch(errorsHandler)
    },
    saveRenewOnStartup(newState: boolean): void {
      backend.send(updateSettings({renew: {onStartup: newState}}))
        .then(() => this.renew_onStartup = newState)
        .catch(errorsHandler)
    },
    saveJsProtectionEnabled(newState: boolean): void {
      backend.send(updateSettings({jsProtection: {enabled: newState}}))
        .then(() => this.jsProtection_enabled = newState)
        .catch(errorsHandler)
    },
    saveCustomUseragentEnabled(newState: boolean): void {
      backend.send(updateSettings({customUseragent: {enabled: newState}}))
        .then(() => this.customUseragent_enabled = newState)
        .catch(errorsHandler)
    },
    saveCustomUseragentList(newState: string[]): void {
      backend.send(updateSettings({customUseragent: {list: newState}}))
        .then(() => this.customUseragent_list = newState)
        .catch(errorsHandler)
    },
    saveGeneratorTypes(): void {
      const types = this.generator_types.filter((t): boolean => isValidType(t))

      backend.send(updateSettings({generator: {types: types}}))
        .then(() => this.generator_types = types)
        .catch(errorsHandler)
    },
    saveBlacklistMode(newState: boolean): void {
      backend.send(updateSettings({blacklist: {mode: newState ? BlacklistMode.WhiteList : BlacklistMode.BlackList}}))
        .then(() => this.blacklist_mode_whitelist = newState)
        .catch(errorsHandler)
    },
    saveBlacklistDomainsList(newState: string[]): void {
      backend.send(updateSettings({blacklist: {domains: newState}}))
        .then(() => this.blacklist_domains = newState)
        .catch(errorsHandler)
    },
    saveBlacklistCustomRulesList(newState: string[]): void {
      backend.send(updateSettings({blacklist: {custom: {rules: newState}}}))
        .then(() => this.blacklist_custom_rules = newState)
        .catch(errorsHandler)
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

        this.enabled = settings.enabled
        this.renew_enabled = settings.renew.enabled
        this.renew_intervalMillis = settings.renew.intervalMillis
        this.renew_onStartup = settings.renew.onStartup
        this.customUseragent_enabled = settings.customUseragent.enabled
        this.customUseragent_list = settings.customUseragent.list
        this.jsProtection_enabled = settings.jsProtection.enabled
        this.generator_types = settings.generator.types
        this.blacklist_mode_whitelist = settings.blacklist.mode === BlacklistMode.WhiteList
        this.blacklist_domains = settings.blacklist.domains
        this.blacklist_custom_rules = settings.blacklist.custom.rules
      })
      .catch(errorsHandler)

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
  mounted(): void {
    // start state refresher
    window.setInterval((): void => {
      backend
        .send(getSettings())
        .then((resp): void => {
          const settings = (resp[0] as GetSettingsResponse).payload
          this.enabled = settings.enabled
        })
        .catch(errorsHandler)
    }, 500) // twice in a one second
  },
})
</script>

<style lang="scss">
:root {
  --main-bg-color: #fff;
  --main-text-color: #111;
  --scrollbar-color: #aaa;
  --rows-separator-color: #eee;
  --input-border-color: #ccc;
  --placeholder-color: #bbb;
  --hint-color: #666;
  --scrollbar-width: 8px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --main-bg-color: #23222b;
    --main-text-color: #fbfbfe;
    --scrollbar-color: #666;
    --rows-separator-color: #4e4d54;
    --input-border-color: #5e5c65;
    --placeholder-color: #777;
    --hint-color: #aaa;
  }
}

::-webkit-scrollbar {
  width: var(--scrollbar-width);
}

::-webkit-scrollbar-thumb {
  border: 2px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: var(--scrollbar-width);
  background-color: var(--scrollbar-color);
}

html, body {
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, Arial, sans-serif;
  font-weight: 400;
  font-size: 12px;
  min-width: 500px;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
}

body {
  padding: 0 2em;
}

ul {
  list-style: none;
  padding: 0;

  &.list {
    li {
      padding: 1em 0;

      &:not(:last-child) {
        border: solid var(--rows-separator-color);
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
