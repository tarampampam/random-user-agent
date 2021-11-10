<template>
  <input
    type="number"
    :disabled="disabled"
    :value="value"
    :min="min"
    :max="max"
    :step="step"
    :placeholder="placeholder"
    @input="$emit('change', $event.target.valueAsNumber)"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    disabled: Boolean,
    value: Number,
    min: Number,
    max: Number,
    step: Number,
    placeholder: String,
  },
  emits: {
    change(value: number | any): boolean {
      return typeof value === 'number'
    },
  },
})
</script>

<style lang="scss" scoped>
input[type='number'] {
  padding: 0.5rem;
  margin: 0;
  background-color: var(--color-ui-bg-primary);
  border: 1px solid var(--color-ui-border-primary);
  color: var(--color-text-primary);

  &::placeholder {
    color: var(--color-text-light);
  }

  &:focus, &:focus-visible {
    outline: none;
  }

  &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
    opacity: 1;
  }

  &:disabled {
    background-color: var(--color-ui-bg-disabled);
    cursor: not-allowed;
  }
}
</style>
