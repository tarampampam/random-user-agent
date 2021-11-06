<template>
  <control-item>
    <template v-slot:label>
      <label :for="randomId">
        {{ i18n('auto_renew', 'Automatically change the User-Agent after specified period of time') }}
      </label>
    </template>

    <template v-slot:hint>
      {{
        i18n(
          'auto_renew_interval',
          'Time (in seconds) to automatically update the User-Agent (e.g. 1 hour = 3600)',
        )
      }}:
    </template>

    <template v-slot:option>
      <input-number
        :disabled="!$store.state.settings.renew.enabled"
        :value="$store.state.settings.renew.intervalSec"
        :min="1"
        :max="86400"
        :step="10"
        placeholder="60"
        @change="changeInterval"
      />
    </template>

    <template v-slot:toggle>
      <toggle
        :id="randomId"
        :checked="$store.state.settings.renew.enabled"
        @change="changeEnabled"
      />
    </template>
  </control-item>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Toggle from '../common/toggle.vue'
import InputNumber from '../common/input-number.vue'
import ControlItem from './control-item.vue'
import i18n from '../../mixins/i18n'
import randomId from '../../mixins/random-id'
import {Mutation} from '../store'

export default defineComponent({
  components: {
    'control-item': ControlItem,
    'toggle': Toggle,
    'input-number': InputNumber,
  },
  mixins: [i18n, randomId],
  methods: {
    changeEnabled(newState: boolean): void {
      this.$store.commit(Mutation.UpdateRenew, {enabled: newState})
    },
    changeInterval(value: number): void {
      this.$store.commit(Mutation.UpdateRenew, {intervalSec: value})
    },
  },
})
</script>
