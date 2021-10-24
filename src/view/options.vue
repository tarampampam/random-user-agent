<template>
  <h1>General settings</h1>

  <p>Change the behavior of the switcher to best fit your needs:</p>

  <ul class="list">
    <list-checkbox caption="Enable Agent switcher"
                   :checked="settings.enabled"
                   @change="test"/>
    <list-checkbox caption="Automatically change the User-Agent after specified period of time"
                   :checked="settings.renew.enabled"
                   @change="test"/>
    <list-number caption="Time (in seconds) to automatically update the User-Agent (e.g. 1 hour = 3600)"
                 :minimum="1"
                 :maximum="86400"
                 :placeholder="60"
                 :value="settings.renew.intervalMillis / 1000"
                 @change="test"/>
    <list-checkbox caption="Change User-Agent on browser startup"
                   :checked="settings.renew.onStartup"
                   @change="test"/>
    <list-checkbox caption="Hide real User-Agent from detection by javascript"
                   :checked="settings.jsProtection.enabled"
                   @change="test"/>
    <list-checkbox caption="Use one of (in the randomized order) custom User-Agent instead generated"
                   :checked="true"
                   @change="test"/>
    <list-textarea caption="Custom User-Agents (set a specific User-Agents, one per line):"
                   placeholder="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7; rv:92.0) Gecko/20010101 Firefox/92.0"
                   @change="test"/>
  </ul>

  <h2>Generator settings</h2>

  <p>Here you can change the agent switching behavior:</p>

  <ul class="set">
    <li>
      <label><input type="checkbox">Chrome on windows</label>
    </li>
    <li>
      <label><input type="checkbox">Chrome on linux</label>
    </li>
    <li>
      <label><input type="checkbox">Firefox on windows</label>
    </li>
    <li>
      <label><input type="checkbox">Firefox on linux</label>
    </li>
    <li>
      <label><input type="checkbox">Safari on MacOS</label>
    </li>
  </ul>

  <h2>Blacklist settings</h2>

  <p>
    Blacklist mode - switching enabled everywhere, except the defined domains & rules. Whitelist - on the contrary,
    disabled everywhere except the specified domains & rules:
  </p>

  <ul class="list">
    <list-checkbox caption="Whitelist mode (blacklist mode - disabled, whitelist mode - enabled)"
                   :checked="true"
                   @change="test"/>
    <list-textarea caption="Domain names list (one per line):"
                   placeholder="docs.google.com"
                   @change="test"/>
    <list-textarea caption="Custom rules (one per line):"
                   placeholder="http?://*google.com/*"
                   @change="test"
                   hint="You can use wildcards such as * and ?. * will match any length of characters
          (e.g. *google.com will match google.com, www.google.com, mail.google.com, etc.), ? will match only a single
          character (e.g. www.?oogle.com will match www.oogle.com, www.moogle.com, www.google.com, www.woogle.com,
          etc.)"/>
  </ul>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import i18n from './mixins/i18n'
import ListCheckbox from './components/options/list-checkbox.vue'
import ListTextarea from './components/options/list-textarea.vue'
import ListNumber from './components/options/list-number.vue'
import {Sender} from '../api/transport/transport'
import {RuntimeSender} from '../api/transport/runtime'
import {getSettings, GetSettingsResponse} from '../api/handlers/get-settings'

const errorsHandler: (err: Error) => void = console.error,
  backend: Sender = new RuntimeSender

export default defineComponent({
  components: {
    'list-checkbox': ListCheckbox,
    'list-number': ListNumber,
    'list-textarea': ListTextarea,
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
        jsProtection: {
          enabled: false,
        },
      }
    }
  },
  methods: {
    test(...args): void {
      console.warn(...args)
    },
  },
  created(): void {
    backend
      .send( // order is important!
        getSettings(),
      )
    .then((resp): void => {
      const settings = (resp[0] as GetSettingsResponse).payload

      this.settings.enabled = settings.enabled
      this.settings.renew.enabled = settings.renew.enabled
      this.settings.renew.intervalMillis = settings.renew.intervalMillis
      this.settings.renew.onStartup = settings.renew.onStartup

      this.settings.jsProtection.enabled = settings.jsProtection.enabled
    })
    .catch(errorsHandler)
  },
  mounted(): void {
    //
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
