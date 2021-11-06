<template>
  <input
    type="button"
    :class="{pulse: pulse}"
    :value="text"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    text: String,
    pulse: Boolean,
  },
})
</script>

<style lang="scss" scoped>
input[type='button'] {
  display: inline-block;
  cursor: pointer;
  border-radius: 0.25rem;
  line-height: 1.5;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  user-select: none;
  padding: 0.5rem 1rem;
  margin: 0;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out;
  border-style: solid;
  border-width: 1px;

  background-color: var(--color-ui-bg-active);
  border-color: var(--color-ui-border-active);
  color: var(--color-text-inverted);

  &:hover {
    background-color: var(--color-ui-bg-active-dark);
  }

  &.pulse {
    animation: pulse 2s infinite;

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(125, 125, 125, 0.25);
      }
      70% {
        box-shadow: 0 0 0 15px rgba(125, 125, 125, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(125, 125, 125, 0);
      }
    }
  }
}
</style>
