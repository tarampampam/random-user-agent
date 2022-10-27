<template>
  <control-item>
    <template v-slot:label>
      <ul class="mode-selector">
        <li
          :class="['item', {active: !$store.state.settings.blacklist.modeWhitelist}]"
          @click="change(false)"
        >{{ i18n('blacklist_mode', 'Blacklist mode)') }}</li>
        <li
          :class="['item', {active: $store.state.settings.blacklist.modeWhitelist}]"
          @click="change(true)"
        >{{ i18n('whitelist_mode', 'Whitelist mode)') }}</li>
      </ul>
    </template>
  </control-item>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ControlItem from './control-item.vue'
import i18n from '../../mixins/i18n'
import {Mutation} from '../../store/mutations'

export default defineComponent({
  components: {
    'control-item': ControlItem,
  },
  mixins: [i18n],
  methods: {
    change(isWhiteListMode: boolean): void {
      this.$store.commit(Mutation.UpdateBlacklist, {whitelistMode: isWhiteListMode})
    },
  },
})
</script>

<style lang="scss" scoped>
$border-radius: 5px;

.mode-selector {
  display: flex;
  list-style: none;
  padding: 0;
  border: 1px solid var(--color-ui-border-light);
  border-radius: $border-radius;

  .item {
    flex: 1;
    text-align: center;
    padding: .6em 1.2em;
    cursor: pointer;
    border-radius: $border-radius;

    &.active {
      background-color: var(--color-bg-info);
    }
  }
}
</style>
