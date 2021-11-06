<template>
  <header>
    <div class="logo">
      <span class="caption">{{ i18n('active_user_agent', 'Active User-Agent') }}</span>
    </div>
    <div class="buttons">
      <control-icon :icon="enabled ? 'pause' : 'unpause'"
                    :clickable="true"
                    style="opacity: .3"
                    :title="i18n(
                      enabled ? 'pause_switcher' : 'unpause_switcher',
                      enabled ? 'Pause Switcher' : 'Resume Switcher',
                      )"
                    @click="$emit('clickEnabled')"/>
    </div>
  </header>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import i18n from './../../mixins/i18n'
import ControlIcon from './../control-icon.vue'

export default defineComponent({
  components: {
    'control-icon': ControlIcon,
  },
  props: {
    enabled: Boolean,
  },
  emits: ['clickEnabled'],
  mixins: [i18n],
})
</script>

<style lang="scss" scoped>
header {
  min-height: 40px;
  padding: 0 .8em;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .logo, .buttons {
    display: flex;
    align-items: center;
  }

  .logo {
    .caption {
      font-weight: 600;
      font-size: 1.2em;
      padding-left: .4em;
      color: var(--popup-main-text-color);
    }
  }

  .buttons {
    //align-self: flex-end;
  }
}
</style>
