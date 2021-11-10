<template>
  <control-item>
    <template v-slot:label>
      <label :for="randomId">
        {{ i18n('blacklist_domains', 'Domain names list (one per line)') }}
      </label>
    </template>

    <template v-slot:option>
      <text-area
        placeholder="docs.google.com"
        :id="randomId"
        :maxlength="2048"
        :rows="12"
        :value="domainsList"
        @change="changeList"
      />
    </template>
  </control-item>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import TextArea from '../common/text-area.vue'
import ControlItem from './control-item.vue'
import i18n from '../../mixins/i18n'
import randomId from '../../mixins/random-id'
import {Mutation} from '../../store/mutations'

export default defineComponent({
  components: {
    'control-item': ControlItem,
    'text-area': TextArea,
  },
  mixins: [i18n, randomId],
  methods: {
    changeList(value: string): void {
      this.$store.commit(Mutation.UpdateBlacklist, {domains: value.split('\n')})
    },
  },
  computed: {
    domainsList(): string {
      return this.$store.state.settings.blacklist.domains.join('\n')
    },
  },
})
</script>
