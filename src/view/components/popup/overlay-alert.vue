<template>
  <div class="alert" @click="$emit('click')">
    <div class="message">
      <h1>{{ caption }}</h1>
      <h2>{{ message }}</h2>
    </div>
    <div class="overlay"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  components: {},
  props: {
    caption: String,
    message: String,
  },
  emits: ['click'],
})
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  .message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

    h1, h2 {
      text-align: center;
    }
  }

  .overlay {
    position: absolute;
    background-color: var(--options-main-bg-color);
    backdrop-filter: blur(8px);
    opacity: .6;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
