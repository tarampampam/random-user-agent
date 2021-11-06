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
  padding: 0.5rem 1rem;
  margin: 0;
  border-style: solid;
  border-width: 1px;

  &:focus, &:focus-visible {
    outline: none;
  }
}
</style>
