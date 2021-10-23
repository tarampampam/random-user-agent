<template>
  <h1>General settings</h1>

  <p>Change the behavior of the switcher to best fit your needs:</p>

  <ul class="list">
    <li>
      <label for="id_1">Enable Agent switcher</label>
      <p class="control"><input type="checkbox" id="id_1"></p>
    </li>
    <li>
      <label for="id_2">Automatically change the User-Agent after specified period of time</label>
      <p class="control"><input type="checkbox" id="id_2"></p>
    </li>
    <li>
      <label for="id_3">Time (in seconds) to automatically update the User-Agent (e.g. 1 hour = 3600)</label>
      <p class="control"><input type="number" id="id_3" min="1" max="86400" placeholder="60"></p>
    </li>
    <li>
      <label for="id_4">Hide real User-Agent from detection by javascript</label>
      <p class="control"><input type="checkbox" id="id_4"></p>
    </li>
    <li>
      <label for="id_5">Change User-Agent on browser startup</label>
      <p class="control"><input type="checkbox" id="id_5"></p>
    </li>
    <li>
      <label for="id_7">Use one of (in the randomized order) custom User-Agent instead generated</label>
      <p class="control"><input type="checkbox" id="id_7"></p>
    </li>
    <li>
      <div>
        <label for="id_6">Custom User-Agents (set a specific User-Agents, one per line):</label>
        <textarea id="id_6" rows="3"
                  placeholder="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7; rv:92.0) Gecko/20010101 Firefox/92.0"></textarea>
      </div>
    </li>
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
    Blacklist mode - switching enabled everywhere, except the defined rules. Whitelist - on the contrary, disabled
    everywhere except the specified rules:
  </p>

  <ul class="list">
    <li>
      <label for="bl_1">Whitelist mode (disabled - blacklist mode, enabled - whitelist mode)</label>
      <p class="control"><input type="checkbox" id="bl_1"></p>
    </li>
    <li>
      <div>
        <label for="bl_2">Domain names list (one per line):</label>
        <textarea id="bl_2" rows="5" placeholder="docs.google.com"></textarea>
      </div>
    </li>
    <li>
      <div>
        <label for="bl_3">Custom rules (one per line):</label>
        <textarea id="bl_3" rows="5" placeholder="http?://*google.com/*"></textarea>
        <p class="hint">
          You can use wildcards such as * and ?. * will match any length of characters
          (e.g. *google.com will match google.com, www.google.com, mail.google.com, etc.), ? will match only a single
          character (e.g. www.?oogle.com will match www.oogle.com, www.moogle.com, www.google.com, www.woogle.com,
          etc.)
        </p>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import i18n from './mixins/i18n'

export default defineComponent({
  components: {
    //
  },
  mixins: [i18n],
  data: (): { [key: string]: any } => {
    return {
      //
    }
  },
  methods: {
    //
  },
  created(): void {
    //
  },
  mounted(): void {
    //
  },
})
</script>

<style lang="scss">
$scrollbar-width: 8px;

:root {
  --main-bg-color: #fff;
  --main-fg-color: #111;
  --scrollbar-color: #aaa;
  --rows-separator-color: #eee;
  --input-border-color: #ccc;
  --placeholder-color: #bbb;
  --hint-color: #666;
}

@media (prefers-color-scheme: dark) {
  :root {
    --main-bg-color: #23222b;
    --main-fg-color: #fbfbfe;
    --scrollbar-color: #666;
    --rows-separator-color: #4e4d54;
    --input-border-color: #5e5c65;
    --placeholder-color: #777;
    --hint-color: #aaa;
  }
}

::-webkit-scrollbar {
  width: $scrollbar-width;
}

::-webkit-scrollbar-thumb {
  border: 2px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: $scrollbar-width;
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
  color: var(--main-fg-color);
}

body {
  padding: 0 2em;
}

input, textarea {
  outline: none;
  box-shadow: none;
  box-sizing: border-box;
  margin: 0;
  border-width: 1px;
  background-color: var(--main-bg-color);
  color: var(--main-fg-color);
  border-color: var(--input-border-color);
  border-radius: 3px;
}

input[type=number] {
  width: 5.5em;
}

label {
  font-weight: 400;
}

ul {
  list-style: none;
  padding: 0;
}

.hint {
  padding: .3em 0;
  font-size: .9em;
  color: var(--hint-color);
}

ul.list {
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 0;

    * {
      margin: 0;
    }

    div {
      width: 100%;
    }

    textarea {
      display: block;
      width: 100%;
      min-height: 4em;
      resize: vertical;
      font-size: .8em;
      padding: .7em .5em;
      margin-top: .5em;

      &::placeholder {
        color: var(--placeholder-color);
      }
    }

    .control {
      padding-left: 2em;
    }

    &:not(:last-child) {
      border: solid var(--rows-separator-color);
      border-width: 0 0 1px 0;
    }
  }
}

ul.set {
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
</style>
