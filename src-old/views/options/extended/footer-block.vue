<template>
  <div>
    {{ i18n('like_this_extension', 'Do you like this extension?') }} ⭐
    <a href="https://github.com/tarampampam/random-user-agent" target="_blank">
      {{ i18n('give_a_star_on_github', 'Give us a star on GitHub!') }}
    </a>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import i18n from '../../mixins/i18n'

export default defineComponent({
  mixins: [i18n],
})
</script>

<style lang="scss" scoped>
div {
  font-size: .85em;
  color: var(--color-text-light);
  background-color: var(--color-bg-light);

  a {
    color: var(--color-link-light);
  }
}
</style>
