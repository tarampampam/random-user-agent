<template>
  <footer>
    <span v-if="version">v{{ version }} | </span>
    <span v-if="donateLink.length">
      <a href="#" @click="openLink(this.donateLink)">{{ i18n('make_donation') }}</a> |
    </span>
    <a href="#" @click="openLink(this.bugReportLink)">{{ i18n('bug_report') }}</a>
  </footer>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import i18n from '../../mixins/i18n'

export default defineComponent({
  mixins: [i18n],
  props: {
    version: String,
  },
  data: (): { [key: string]: string } => {
    return {
      donateLink: '', // TODO: provide donation link
      bugReportLink: 'https://github.com/tarampampam/random-user-agent/issues/new/choose',
    }
  },
  methods: {
    async openLink(url: string): Promise<chrome.tabs.Tab> {
      return await chrome.tabs.create({url: url})
    },
  },
})
</script>

<style lang="scss" scoped>
footer {
  background-color: #f2f2ed;
  text-align: center;
  padding: 1em 1.2em;
  font-size: .75em;
  color: rgb(0, 0, 0, .25);
}
</style>
