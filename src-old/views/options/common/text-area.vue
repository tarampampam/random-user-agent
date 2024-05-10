<template>
  <textarea
    :id="id"
    :cols="cols"
    :rows="rows"
    :maxlength="maxlength"
    :disabled="disabled"
    :placeholder="placeholder"
    @input="$emit('change', $event.target.value)"
  >{{ value }}</textarea>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    id: String,
    cols: Number,
    rows: Number,
    maxlength: Number,
    disabled: Boolean,
    value: String,
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
textarea {
  display: block;
  width: 100%;
  min-height: 4em;
  resize: vertical;
  padding: .7em .5em;

  box-sizing: border-box;
  background-color: var(--color-ui-bg-primary);
  border: 1px solid var(--color-ui-border-primary);
  color: var(--color-text-primary);

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
