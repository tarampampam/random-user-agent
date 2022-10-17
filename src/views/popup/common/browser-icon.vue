<template>
  <!-- icon from: <https://github.com/edent/SuperTinyIcons> -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    :width="width"
    :height="height"
  >
    <g v-if="icon === 'chrome'">
      <path d="M 255.95894,161.59859 H 451.82387 A 219.91852,208.2978 0 0 1 245.65026,464.03722" fill="#fc4"/>
      <path d="M 342.72367,303.176 245.65026,464.03722 A 219.91852,208.2978 0 0 1 70.402684,143.698" fill="#0f9d58"/>
      <path d="M 255.95894,161.59859 H 451.82387 A 219.91852,208.2978 0 0 0 70.402684,143.698 l 98.791526,159.478"
            fill="#db4437"/>
      <circle cx="255.95894" cy="255.98352" r="90" fill="#4285f4" stroke="#f1f1f1" stroke-width="20"/>
    </g>
    <g v-else-if="icon === 'firefox'">
      <linearGradient id="firefox_a" x1=".7" x2=".3" y2=".8">
        <stop offset=".3" stop-color="#fd5"/>
        <stop offset=".6" stop-color="#f85"/>
        <stop offset="1" stop-color="#d06"/>
      </linearGradient>
      <radialGradient id="firefox_b" cx=".4" cy=".7">
        <stop offset=".4" stop-color="#74d"/>
        <stop offset="1" stop-color="#a2d"/>
      </radialGradient>
      <linearGradient id="firefox_c" x1=".8" y1=".2" x2=".4" y2=".8">
        <stop offset=".2" stop-color="#fd5"/>
        <stop offset="1" stop-color="#f33"/>
      </linearGradient>
      <g transform="scale(4)">
        <path d="M48 49s-3-9-1-16c-9 2-33 35-33 35a51 48 0 1087-32s5 9 5 15c-3-9-20-25-26-37-24 13-16 39-16 39"
              fill="url(#firefox_a)"/>
        <circle cx="64" cy="67" r="26" fill="url(#firefox_b)"/>
        <path d="M21 45l43 12c-6 11-16 3-23 14a22 22 0 1034-20s33 3 17 42H28m36 25h1" fill="url(#firefox_a)"/>
        <path
          d="M35 43c16 0 12 7 29 14-18 6-23-9-38 0 5 9 12 8 12 8 1 43 72 29 67-17a50 46.6 47 01-88 33c-9-18-1-40 16-51"
          fill="url(#firefox_c)"/>
      </g>
    </g>
    <g v-else-if="icon === 'edge'">
      <radialGradient id="edge_a" cx=".6" cy=".5">
        <stop offset=".8" stop-color="#148"/>
        <stop offset="1" stop-color="#137"/>
      </radialGradient>
      <radialGradient id="edge_b" cx=".5" cy=".6" fx=".2" fy=".6">
        <stop offset=".8" stop-color="#38c"/>
        <stop offset="1" stop-color="#269"/>
      </radialGradient>
      <linearGradient id="edge_c" y1=".5" y2="1">
        <stop offset=".1" stop-color="#5ad"/>
        <stop offset=".6" stop-color="#5c8"/>
        <stop offset=".8" stop-color="#7d5"/>
      </linearGradient>
      <path fill="url(#edge_a)"
            d="M439 374c-50 77-131 98-163 96-191-9-162-262-47-261-82 52 30 224 195 157 17-12 20 3 15 8"/>
      <path fill="url(#edge_b)"
            d="M311 255c18-82-31-135-129-135S38 212 38 259c0 124 125 253 287 203-134 39-214-116-146-210 46-66 123-68
             132 3 M411 99h1"/>
      <path fill="url(#edge_c)"
            d="M39 253C51-15 419-30 472 202c14 107-86 149-166 115-42-26 26-20-3-99-48-112-251-103-264 35"/>
    </g>
    <g v-else-if="icon === 'opera'">
      <path fill="#a70014"
            d="M255.9 41a215 215 0 000 430 215 215 0 000-430m2.4 56.5a113.3 158.5 0 010 317 113.3 158.5 0 010-317"/>
      <path fill="#ff1b2d"
            d="M185.2 377.2a113.3 158.5 0 010-242.3c30.9-40.1 76.7-65.5 128-65.5 31.4 0 60.9 9.6 86 26.3a215 215 0
             100 320.6c-25.5 17.1-55.5 26.3-86.2 26.3-51.2 0-97-25.4-127.9-65.4"/>
    </g>
    <g v-else-if="icon === 'safari'">
      <radialGradient id="safari_a">
        <stop stop-color="#0bd" offset="0"/>
        <stop offset="1" stop-color="#17d"/>
      </radialGradient>
      <g transform="matrix(4 0 0 4 256 256)">
        <g stroke="#eee" fill="none">
          <circle r="52.5" fill="url(#safari_a)" stroke-width="5"/>
          <circle r="45" stroke-dasharray="1.25 8.175" stroke-dashoffset=".5" stroke-width="5.5"/>
          <circle r="42.5" stroke-dasharray="1.25 7.65" stroke-dashoffset="5" stroke-width="10"/>
        </g>
        <path d="M6 6l-12-12l-29 39" fill="#eee"/>
        <path d="M6 6l-12-12l41-28" fill="#f55"/>
        <path opacity=".3" d="M-35 33l7-5-3 5 37-27 28-35-4 2 4-6"/>
      </g>
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
      validator: (value: string): boolean => ['chrome', 'firefox', 'edge', 'opera', 'safari'].indexOf(value) !== -1,
    },
  },
})
</script>

<style lang="scss" scoped>
</style>
