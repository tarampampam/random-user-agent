<template>
  <control-item>
    <template v-slot:label>
      <label :for="randomId">
        {{ i18n('remote_useragent_list', 'Use one of (in the randomized order) the User-Agents from the list by the following URL') }}
      </label>
    </template>

    <template v-slot:hint>
      {{ i18n('remote_useragent_list_hint', 'The extension will periodically download it to keep it up to date') }}:
    </template>

    <template v-slot:option>
      <input-text
        :disabled="!$store.state.settings.remoteUseragentList.enabled"
        :value="$store.state.settings.remoteUseragentList.uri"
        :maxlength="256"
        placeholder="https://..."
        style="width: 100%"
        @change="changeURI"
      />

      <p>{{ i18n('remote_useragent_updating_interval', 'Updating interval (in seconds)') }}:</p>

      <div>
        <input-number
          :disabled="!$store.state.settings.remoteUseragentList.enabled"
          :value="$store.state.settings.remoteUseragentList.updateIntervalSec"
          :min="0"
          :max="604800"
          :step="60"
          placeholder="3600"
          @change="changeInterval"
        />
      </div>
    </template>

    <template v-slot:toggle>
      <toggle
        :id="randomId"
        :checked="$store.state.settings.remoteUseragentList.enabled"
        @change="changeEnabled"
      />
    </template>
  </control-item>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Toggle from '../common/toggle.vue'
import InputText from '../common/input-text.vue'
import InputNumber from '../common/input-number.vue'
import ControlItem from './control-item.vue'
import i18n from '../../mixins/i18n'
import randomId from '../../mixins/random-id'
import {Mutation} from '../../store/mutations'

export default defineComponent({
  components: {
    'control-item': ControlItem,
    'toggle': Toggle,
    'input-text': InputText,
    'input-number': InputNumber,
  },
  mixins: [i18n, randomId],
  methods: {
    changeEnabled(newState: boolean): void {
      this.$store.commit(Mutation.UpdateRemoteUserAgent, {enabled: newState})
    },
    changeURI(uri: string): void {
      this.$store.commit(Mutation.UpdateRemoteUserAgent, {uri: uri})
    },
    changeInterval(value: number): void {
      this.$store.commit(Mutation.UpdateRemoteUserAgent, {intervalSec: value})
    },
  },
})
</script>
