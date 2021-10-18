<template>
  <footer>
    <span v-if="donateLink.length > 0"><a :href="donateLink">{{ i18n('make_donation', 'Donate') }}</a> | </span>
    <a :href="bugReportLink">{{ i18n('bug_report', 'Bug report') }}</a>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import i18n from '../../mixins/i18n'

export default defineComponent({
  mixins: [i18n],
  data: (): { [key: string]: string } => {
    return {
      donateLink: '',
      bugReportLink: 'https://github.com/tarampampam/random-user-agent/issues/new/choose',
    }
  },
})
</script>

<style lang="scss" scoped>
footer {
  background-color: #f2f2ed;
  text-align: center;
  padding: 1em 1.2em;
}
</style>
