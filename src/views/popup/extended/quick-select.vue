<template>
  <div class="quick-select">
    <div class="device-based">
      <div
        :class="['device', {active: inList(mobileTypes.all)}]"
        @click="toggle(mobileTypes.all)"
      >
        <device-icon icon="mobile"/>
      </div>
      <ul class="types-list">
        <li
          v-for="btn in [
            {title: 'Chrome', icon: 'chrome', list: mobileTypes.chrome},
            {title: 'FireFox', icon: 'firefox', list: mobileTypes.firefox},
            {title: 'Safari', icon: 'safari', list: mobileTypes.safari},
          ]"
          :key="btn.title"
          :title="btn.title"
          :class="['item', {active: inList(btn.list)}]"
          @click="toggle(btn.list)"
        >
          <browser-icon :icon="btn.icon"/>
        </li>
      </ul>
    </div>

    <div class="device-based">
      <div
        :class="['device', {active: inList(desktopTypes.all)}]"
        @click="toggle(desktopTypes.all)"
      >
        <device-icon icon="desktop"/>
      </div>
      <ul class="types-list">
        <li
          v-for="btn in [
            {title: 'Chrome', icon: 'chrome', list: desktopTypes.chrome},
            {title: 'FireFox', icon: 'firefox', list: desktopTypes.firefox},
            {title: 'Safari', icon: 'safari', list: desktopTypes.safari},
            {title: 'Edge', icon: 'edge', list: desktopTypes.edge},
            {title: 'Opera', icon: 'opera', list: desktopTypes.opera},
          ]"
          :key="btn.title"
          :title="btn.title"
          :class="['item', {active: inList(btn.list)}]"
          @click="toggle(btn.list)"
        >
          <browser-icon :icon="btn.icon"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import DeviceIcon from '../common/device-icon.vue'
import BrowserIcon from '../common/browser-icon.vue'
import {GeneratorType} from '../../../useragent/generator'

const generatorLists = {
  mobile: {
    chrome: [
      GeneratorType.chromeAndroid,
    ],
    firefox: [
      GeneratorType.firefoxAndroid,
    ],
    safari: [
      GeneratorType.safariIphone,
    ],
  },
  desktop: {
    chrome: [
      GeneratorType.chromeWin,
      GeneratorType.chromeLinux,
      GeneratorType.chromeMac,
    ],
    firefox: [
      GeneratorType.firefoxWin,
      GeneratorType.firefoxLinux,
      GeneratorType.firefoxMac,
    ],
    safari: [
      GeneratorType.safariMac,
    ],
    edge: [
      GeneratorType.edgeWin,
      GeneratorType.edgeMac,
    ],
    opera: [
      GeneratorType.operaWin,
      GeneratorType.operaMac,
    ],
  },
}

export default defineComponent({
  components: {
    'device-icon': DeviceIcon,
    'browser-icon': BrowserIcon,
  },
  props: {
    generatorTypes: {
      type: Array,
      validator: (values: GeneratorType[]): boolean => {
        const valid: string[] = Object.values(GeneratorType)

        for (let i = 0; i < values.length; i++) {
          if (!valid.includes(values[i])) {
            return false
          }
        }

        return true
      },
    },
  },
  data: (): {
    [key: string]: any
    mobileTypes: {
      chrome, firefox, safari, all: GeneratorType[]
    },
    desktopTypes: {
      chrome, firefox, safari, edge, opera, all: GeneratorType[]
    }
  } => {
    return {
      mobileTypes: {
        chrome: generatorLists.mobile.chrome,
        firefox: generatorLists.mobile.firefox,
        safari: generatorLists.mobile.safari,
        all: [
          ...generatorLists.mobile.chrome,
          ...generatorLists.mobile.firefox,
          ...generatorLists.mobile.safari,
        ],
      },
      desktopTypes: {
        chrome: generatorLists.desktop.chrome,
        firefox: generatorLists.desktop.firefox,
        safari: generatorLists.desktop.safari,
        edge: generatorLists.desktop.edge,
        opera: generatorLists.desktop.opera,
        all: [
          ...generatorLists.desktop.chrome,
          ...generatorLists.desktop.firefox,
          ...generatorLists.desktop.safari,
          ...generatorLists.desktop.edge,
          ...generatorLists.desktop.opera,
        ],
      },
    }
  },
  methods: {
    inList(types: GeneratorType[]): boolean { // at least one in the list
      if (this.generatorTypes) {
        for (let i = 0; i < types.length; i++) {
          if (this.generatorTypes.includes(types[i])) {
            return true
          }
        }
      }

      return false
    },
    toggle(types: GeneratorType[]): void {
      if (this.generatorTypes && Array.isArray(types)) {
        const clone = [...this.generatorTypes]
        const isInList = this.inList(types)

        for (let i = 0; i < types.length; i++) {
          const idx = clone.indexOf(types[i])

          if (isInList && idx !== -1) { // disable (remove)
            clone.splice(idx, 1)
          } else if (!isInList && !clone.includes(types[i])) { // enable (append)
            clone.push(types[i])
          }
        }

        this.$emit('changeGeneratorTypes', clone)
      }
    },
  },
  emits: [
    'changeGeneratorTypes',
  ],
})
</script>

<style lang="scss" scoped>
$border-radius: 5px;
$selector-height: 40px;

.quick-select {
  padding: .5em 1em;
  background-color: var(--color-bg-light);
  border-style: solid;
  border-color: var(--color-ui-border-light);
  border-width: 0 0 .1em 0;

  .device-based {
    display: flex;

    .device, .types-list .item {
      cursor: pointer;
    }

    .device {
      display: flex;
      align-items: center;
      padding-right: .75em;

      &.active {

      }
    }

    .types-list {
      flex: 1;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;

      border-radius: $border-radius;
      background-color: var(--color-bg-light);
      box-shadow: inset 0 0 0 .1em var(--color-bg-primary);

      .item {
        $active-border-size: 2px;

        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        transition: background-color 120ms ease-in-out;
        box-sizing: border-box;
        padding-top: $active-border-size;
        padding-bottom: $active-border-size;
        height: $selector-height;

        &:first-child {
          border-radius: $border-radius 0 0 $border-radius;
        }

        &:last-child {
          border-radius: 0 $border-radius $border-radius 0;
        }

        svg {
          height: 65%;
        }

        &.active {
          background-color: var(--color-bg-primary);
          border: solid var(--color-ui-border-active);
          border-width: 0 0 $active-border-size 0;
          padding-bottom: 0;
        }

        &:hover {
          background-color: var(--color-bg-primary);
        }
      }
    }

    &:not(:last-child) {
      padding-bottom: .6em;
    }
  }
}
</style>
