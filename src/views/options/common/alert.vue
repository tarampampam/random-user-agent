<template>
  <div class="alert" :class="type">
    {{ text }} <a href="#">asd</a>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    text: String,
    type: {
      type: String,
      default: 'info',
      validator: (value: string): boolean => ['success', 'error', 'info'].indexOf(value) !== -1,
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
  background-color: var(--color-bg-primary);
  border-color: var(--color-ui-border-primary);
  color: var(--color-text-primary);

  &.info {
    background-color: var(--color-bg-info);
    border-color: var(--color-ui-border-info);

    &, & a {
      color: var(--color-text-info);
    }
  }

  &.success {
    background-color: var(--color-bg-ok);
    border-color: var(--color-ui-border-ok);
    &, & a {
      color: var(--color-text-ok);
    }
  }

  &.error {
    background-color: var(--color-bg-err);
    border-color: var(--color-ui-border-err);
    &, & a {
      color: var(--color-text-err);
    }
  }
}
</style>
