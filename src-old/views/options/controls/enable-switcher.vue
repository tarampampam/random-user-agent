<template>
  <control-item>
    <template v-slot:label>
      <label :for="randomId">
        {{ i18n('enable_switcher', 'Enable Switcher') }}
      </label>
    </template>

    <template v-slot:toggle>
      <toggle
        :id="randomId"
        :checked="$store.state.settings.enabled"
        @change="change"
      />
    </template>
  </control-item>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ControlItem from './control-item.vue'
import Toggle from '../common/toggle.vue'
import i18n from '../../mixins/i18n'
import randomId from '../../mixins/random-id'
import {Mutation} from '../../store/mutations'

export default defineComponent({
  components: {
    'control-item': ControlItem,
    'toggle': Toggle,
  },
  mixins: [i18n, randomId],
  methods: {
    change(newState: boolean): void {
      this.$store.commit(Mutation.UpdateEnabled, newState)
    },
  },
})
</script>
