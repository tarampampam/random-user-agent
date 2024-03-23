<template>
  <input
    type="text"
    :disabled="disabled"
    :value="value"
    :maxlength="maxlength"
    :placeholder="placeholder"
    @input="$emit('change', $event.target.value)"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    disabled: Boolean,
    value: String,
    maxlength: Number,
    placeholder: String,
  },
  emits: {
    change(value: string | any): boolean {
      return typeof value === 'string'
    },
  },
})
</script>

<style lang="scss" scoped>
input[type='text'] {
  padding: 0.5rem;
  margin: 0;
  background-color: var(--color-ui-bg-primary);
  border: 1px solid var(--color-ui-border-primary);
  color: var(--color-text-primary);
  box-sizing: border-box;

  &::placeholder {
    color: var(--color-text-light);
  }

  &:focus, &:focus-visible {
    outline: none;
  }

  &:disabled {
    background-color: var(--color-ui-bg-disabled);
    cursor: not-allowed;
  }
}
</style>
