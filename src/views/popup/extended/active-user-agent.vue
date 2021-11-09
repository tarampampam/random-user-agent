<template>
  <div>
    {{ useragent || '(╯°□°)╯︵ ┻━┻' }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    useragent: String,
  },
})
</script>

<style lang="scss" scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100px;
  padding: 0 1.2em;
  background-color: var(--popup-secondary-bg-color); // we should not use gradient here - https://github.com/tarampampam/random-user-agent/issues/184
  font-family: 'Lucida Console', 'Lucida Sans Typewriter', monaco, 'Bitstream Vera Sans Mono', monospace;
  font-size: 1.1em;
  color: var(--popup-active-ua-text-color);
  overflow: hidden;

  user-select: text;
}
</style>
