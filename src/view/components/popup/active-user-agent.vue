<template>
  <div>
    {{ useragent || '(╯°□°)╯︵ ┻━┻' }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    useragent: String,
  }
})
</script>

<style lang="scss" scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100px;
  background-image: radial-gradient(circle at 50% 54%, #f2f2ed, #c9c9c5);

  font-family: 'Lucida Console','Lucida Sans Typewriter',monaco,'Bitstream Vera Sans Mono',monospace;
  font-size: 1.1em;
  color: #333;

  text-overflow: ellipsis;
  //white-space: nowrap;
  overflow: hidden;
}
</style>
