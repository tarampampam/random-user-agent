<template>
  <div class="alert" :class="type">
    {{ text }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    text: String,
    type: {
      type: String,
      validator: (value: string): boolean => ['success', 'error'].indexOf(value) !== -1,
    },
  },
})
</script>

<style lang="scss" scoped>
.alert {
  border-radius: 5px;
  padding: 1rem;
  border-style: solid;
  border-width: 1px;
  background-color: var(--options-bg-primary-color);
  border-color: var(--options-border-primary-color);
  color: var(--options-text-primary-color);

  &.success {
    background-color: var(--options-success-bg-color);
    border-color: var(--options-success-border-color);
    color: var(--options-success-text-color);
  }

  &.error {
    background-color: var(--options-error-bg-color);
    border-color: var(--options-error-border-color);
    color: var(--options-error-text-color);
  }
}
</style>
