<template>
  <!-- icon from: <https://tabler-icons.io/> -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1" fill="none"
       stroke-linecap="round" stroke-linejoin="round"
       :width="width"
       :height="height">
    <g v-if="icon === 'desktop'">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <rect x="3" y="4" width="18" height="12" rx="1"/>
      <line x1="7" y1="20" x2="17" y2="20"/>
      <line x1="9" y1="16" x2="9" y2="20"/>
      <line x1="15" y1="16" x2="15" y2="20"/>
    </g>
    <g v-else-if="icon === 'mobile'">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <rect x="6" y="3" width="12" height="18" rx="2"/>
      <line x1="11" y1="4" x2="13" y2="4"/>
      <line x1="12" y1="17" x2="12" y2="17.01"/>
    </g>
  </svg>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    width: {
      type: Number,
      default: 32,
    },
    height: {
      type: Number,
      default: 32,
    },
    icon: {
      type: String,
      validator: (value: string): boolean => ['desktop', 'mobile'].indexOf(value) !== -1
    }
  },
})
</script>

<style lang="scss" scoped>
svg {
  stroke: var(--color-text-primary);
}
</style>
