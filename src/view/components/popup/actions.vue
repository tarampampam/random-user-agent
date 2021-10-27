<template>
  <section>
    <div class="enabled-on-this-domain">
      <span>
        <label :for="'enabled_on_this_domain'" :title="enabledOnThisDomainTitle">
          {{ i18n('enabled_on_this_domain', 'Enabled on this domain') }}
        </label>
      </span>
      <ios-checkbox id="enabled_on_this_domain"
                    :checked="enabledOnThisDomain"
                    :title="enabledOnThisDomainTitle"
                    @change="$emit('clickEnabledOnThisDomain')"/>
    </div>

    <div class="action" @click="$emit('clickEnabled')" :class="{ 'blinking-background': !enabled }">
      <control-icon class="icon"
                    :style="{'font-size': '.9em'}"
                    :icon="enabled ? 'pause' : 'unpause'"
                    :clickable="false"/>
      <span>{{
          i18n(
            enabled ? 'pause_switcher' : 'unpause_switcher',
            enabled ? 'Pause Switcher' : 'Resume Switcher'
          )
        }}</span>
    </div>

    <div class="action" @click="$emit('clickRefresh')">
      <control-icon class="icon"
                    icon="refresh"
                    :clickable="false"/>
      <span>{{ i18n('get_new_agent', 'Get new agent') }}</span>
    </div>

    <div class="action" @click="$emit('clickSettings')">
      <control-icon class="icon"
                    icon="settings"
                    :clickable="false"/>
      <span>{{ i18n('open_settings', 'Open settings') }}</span>
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
    border-color: var(--popup-actions-secondary-color);
    border-width: 0 0 .1em 0;

    & > * {
      margin: 1em;
    }
  }

  .action {
    display: flex;
    align-items: center;
    padding: 0.75em 1em;
    color: var(--popup-action-text-color);
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
          background-color: var(--popup-blinking-bg-1-color);
        }
        50% {
          background-color: var(--popup-blinking-bg-2-color);
        }
        100% {
          background-color: transparent;
        }
      }

      animation: blinking-background 2s infinite;
      text-shadow: 0 0 4px var(--popup-main-bg-color);
    }

    &:hover, &:hover .blinking-background {
      background-color: var(--popup-action-hover-bg-color);
      animation: none;
    }
  }
}
</style>
