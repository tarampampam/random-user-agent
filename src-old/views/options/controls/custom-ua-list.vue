<template>
  <control-item>
    <template v-slot:label>
      <label :for="randomId">
        {{ i18n('custom_useragent', 'Use one of (in the randomized order) custom User-Agent instead generated') }}
      </label>
    </template>

    <template v-slot:hint>
      {{ i18n('custom_useragent_list', 'Custom User-Agents (set a specific User-Agents, one per line)') }}:
    </template>

    <template v-slot:option>
      <!-- Length limitation reason: <https://github.com/tarampampam/random-user-agent/issues/172> -->
      <text-area
        placeholder="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7; rv:92.0) Gecko/20010101 Firefox/92.0"
        :maxlength="4096"
        :rows="7"
        :disabled="!$store.state.settings.customUseragent.enabled"
        :value="agentsList"
        @change="changeList"
      />
    </template>

    <template v-slot:toggle>
      <toggle
        :id="randomId"
        :checked="$store.state.settings.customUseragent.enabled"
        @change="changeEnabled"
      />
    </template>
  </control-item>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Toggle from '../common/toggle.vue'
import TextArea from '../common/text-area.vue'
import ControlItem from './control-item.vue'
import i18n from '../../mixins/i18n'
import randomId from '../../mixins/random-id'
import {Mutation} from '../../store/mutations'

export default defineComponent({
  components: {
    'control-item': ControlItem,
    'toggle': Toggle,
    'text-area': TextArea,
  },
  mixins: [i18n, randomId],
  methods: {
    changeEnabled(newState: boolean): void {
      this.$store.commit(Mutation.UpdateCustomUserAgent, {enabled: newState})
    },
    changeList(value: string): void {
      this.$store.commit(Mutation.UpdateCustomUserAgent, {list: value.split('\n')})
    },
  },
  computed: {
    agentsList(): string {
      return this.$store.state.settings.customUseragent.list.join('\n')
    },
  },
})
</script>
