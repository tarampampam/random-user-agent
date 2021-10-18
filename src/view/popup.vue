<template>
  <popup-header/>
  <active-user-agent/>
  <actions :enabledOnThisDomain="enabledOnThisDomain"
           :onEnabledChange="userChangedEnabledOnThisDomain"
           :onPausedChange="userChangedPausedState"
           :paused="paused"/>
  <popup-footer/>
  <button @click="test">test</button>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import i18n from './mixins/i18n'
import PopupHeader from './components/popup/header.vue'
import ActiveUserAgent from './components/popup/active-user-agent.vue'
import Actions from './components/popup/actions.vue'
import PopupFooter from './components/popup/footer.vue'

export default defineComponent({
  components: {
    'popup-header': PopupHeader,
    'active-user-agent': ActiveUserAgent,
    'actions': Actions,
    'popup-footer': PopupFooter,
  },
  mixins: [i18n],
  data: (): { [key: string]: any } => {
    return {
      enabledOnThisDomain: false,
      paused: true, // working is paused
    }
  },
  methods: {
    userChangedEnabledOnThisDomain(newState: boolean) {
      console.log('newState', newState)
      this.enabledOnThisDomain = newState
    },
    userChangedPausedState(isPaused: boolean) {
      console.log('isPaused', isPaused)
      this.paused = isPaused
    },
    test() {
      this.enabledOnThisDomain = !this.enabledOnThisDomain
      this.paused = !this.paused
      console.log('this.enabledOnThisDomain', this.enabledOnThisDomain)
      console.log('this.paused', this.paused)
    }
  },
})
</script>

<style lang="scss">
$popup-width: 280px;

// Disable user-selection by default
//*, :after, :before {
//  box-sizing: border-box;
//  user-select: none;
//  -moz-user-select: none; /* Firefox still requires their prefix */
//}

html, body {
  min-width: $popup-width;
  height: auto;
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, Arial, sans-serif;
  font-weight: 400;
}

a, a:hover, a:active {
  color: inherit;
  text-decoration: none;
}
</style>
