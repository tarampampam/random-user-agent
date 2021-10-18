<template>
  <header>
    <div class="logo">
      <span class="caption">{{ i18n('active_user_agent') }}</span>
    </div>
    <div class="buttons">
      <control-icon icon="pause" :clickable="true" :title="i18n('pause_switcher')" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import i18n from './../../mixins/i18n'
import ControlIcon from './../control-icon.vue'

export default defineComponent({
  components: {
    'control-icon': ControlIcon,
  },
  mixins: [i18n],
})
</script>

<style lang="scss" scoped>
header {
  min-height: 40px;
  background-color: #fff;
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
      color: #3b3b3b;
    }
  }

  .buttons {
    //align-self: flex-end;
  }
}
</style>
