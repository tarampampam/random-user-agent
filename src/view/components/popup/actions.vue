<template>
  <section>
    <div class="enabled-on-this-domain">
      <span>
        <label :for="'enabled_on_this_domain'" :title="enabledOnThisDomainTitle">
          {{ i18n('enabled_on_this_domain') }}
        </label>
      </span>
      <ios-checkbox id="enabled_on_this_domain"
                    :checked="enabledOnThisDomain"
                    :title="enabledOnThisDomainTitle"
                    disabledColor="#dfdfdf"
                    @change="$emit('clickEnabledOnThisDomain')"/>
    </div>

    <div class="action" @click="$emit('clickEnabled')" :class="{ 'blinking-background': !enabled }">
      <control-icon class="icon"
                    :style="{'font-size': '.9em'}"
                    :icon="enabled ? 'pause' : 'unpause'"
                    :color="iconColor"
                    :hoverColor="iconColor"
                    :clickable="false"/>
      <span>{{ i18n(enabled ? 'pause_switcher' : 'unpause_switcher') }}</span>
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
    enabledOnThisDomain: {
      type: Boolean,
      default: true,
    },
    enabledOnThisDomainTitle: {
      type: String,
      default: '',
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    iconColor: {
      type: String,
      default: '#4b4b4b',
    },
  },
  emits: [
    'clickEnabledOnThisDomain',
    'clickEnabled',
    'clickRefresh',
    'clickSettings',
  ],
  mixins: [i18n],
})
</script>

<style lang="scss" scoped>
section {
  font-size: 1.2em;

  .enabled-on-this-domain {
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
