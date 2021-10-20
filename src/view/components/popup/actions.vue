<template>
  <section>
    <div class="enabled">
      <span>
        <label :for="'enabled'">{{ i18n('enabled_on_this_domain') }}</label>
      </span>
      <ios-checkbox id="enabled"
                    :checked="enabled"
                    disabledColor="#dfdfdf"
                    @change="$emit('clickEnabled')"/>
    </div>

    <div class="action" @click="$emit('clickPaused')" :class="{ 'blinking-background': paused }">
      <control-icon class="icon"
                    :style="{'font-size': '.9em'}"
                    :icon="paused ? 'unpause' : 'pause'"
                    :color="iconColor"
                    :hoverColor="iconColor"
                    :clickable="false"/>
      <span>{{ i18n(paused ? 'unpause_switcher' : 'pause_switcher') }}</span>
    </div>

    <div class="action" @click="$emit('clickRefresh')">
      <control-icon class="icon"
                    icon="refresh"
                    :color="iconColor"
                    :hoverColor="iconColor"
                    :clickable="false"/>
      <span>{{ i18n('get_new_agent') }}</span>
    </div>

    <div class="action" @click="$emit('clickSettings')">
      <control-icon class="icon"
                    icon="settings"
                    :color="iconColor"
                    :hoverColor="iconColor"
                    :clickable="false"/>
      <span>{{ i18n('open_settings') }}</span>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ControlIcon from '../control-icon.vue'
import i18n from '../../mixins/i18n'
import IOSCheckbox from '../ios-checkbox.vue'

export default defineComponent({
  components: {
    'ios-checkbox': IOSCheckbox,
    'control-icon': ControlIcon,
  },
  props: {
    enabled: {
      type: Boolean,
      default: true,
    },
    paused: {
      type: Boolean,
      default: true,
    },
    iconColor: {
      type: String,
      default: '#4b4b4b',
    },
  },
  emits: [
    'clickEnabled',
    'clickPaused',
    'clickRefresh',
    'clickSettings',
  ],
  mixins: [i18n],
})
</script>

<style lang="scss" scoped>
section {
  font-size: 1.2em;

  .enabled {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-style: solid;
    border-color: #e9e9e9;
    border-width: 0 0 .1em 0;

    & > * {
      margin: 1em;
    }
  }

  .action {
    display: flex;
    align-items: center;
    padding: 0.75em 1em;
    color: #3b3b3b;
    cursor: pointer;
    transition: background-color 120ms ease-in-out;

    .icon {
      font-size: .8em;
    }

    span {
      padding-left: .4em;
    }

    &.blinking-background {
      @keyframes blinking-background {
        0% {
          background-color: transparent;
        }
        30% {
          background-color: rgba(87, 222, 114, 0.2);
        }
        50% {
          background-color: rgba(87, 222, 114, 0.25);
        }
        100% {
          background-color: transparent;
        }
      }

      animation: blinking-background 2s infinite;
      text-shadow: 0 0 4px #fff;
    }

    &:hover, &:hover .blinking-background {
      background-color: #f2f2ed;
      animation: none;
    }
  }
}
</style>
