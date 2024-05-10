<template>
  <section>
    <a
      v-if="rateLink && !wasClicked()"
      href="#"
      @click="openLink(rateLink)"
    >{{ i18n('please_rate_extension', 'Please, rate this addon!') }}</a>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import i18n from '../../mixins/i18n'
import detectBrowserName from '../../../utils/browser-detector'

const clickedStorageKey: string = 'rate_was_clicked'
const clickedStorageValue: string = 'yep'

export default defineComponent({
  mixins: [i18n],
  computed: {
    rateLink(): string | undefined {
      switch (detectBrowserName()) {
        case 'chrome':
          return 'https://chrome.google.com/webstore/detail/random-user-agent/einpaelgookohagofgnnkcfjbkkgepnp/reviews'

        case 'firefox':
          return 'https://addons.mozilla.org/firefox/addon/random_user_agent/reviews/'

        case 'opera':
          return 'https://addons.opera.com/extensions/details/random-user-agent/'

        case 'edge':
          return 'https://microsoftedge.microsoft.com/addons/detail/random-useragent/addfjgllfhpnacoahmmcafmaacjloded'
      }
    },
  },
  methods: {
    async openLink(url: string): Promise<chrome.tabs.Tab> {
      window.localStorage.setItem(clickedStorageKey, clickedStorageValue)

      this.$forceUpdate()

      return await chrome.tabs.create({url: url})
    },
    wasClicked(): boolean {
      return window.localStorage.getItem(clickedStorageKey) === clickedStorageValue
    },
  },
})
</script>

<style lang="scss" scoped>
section {
  a {
    display: block;
    margin: 1.3em 1em;
    text-align: center;

    background-color: var(--color-bg-info);
    padding: .5em 1em;
    border-radius: .3em;
    border: 1px solid var(--color-ui-border-info);

    animation: pulse 2s infinite;

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(125, 125, 125, 0.25);
      }
      70% {
        box-shadow: 0 0 0 7px rgba(125, 125, 125, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(125, 125, 125, 0);
      }
    }

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
