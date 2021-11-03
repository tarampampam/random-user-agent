<template>
  <li>
    <label :for="id">
      {{ caption }}
      <span v-if="hint" class="hint">{{ hint }}</span>
    </label>
    <p class="control">
      <input type="checkbox"
             :id="id"
             :checked="checked"
             @change="$emit('change', $event.target.checked)"/>
    </p>
  </li>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    caption: String,
    hint: String,
    checked: Boolean,
  },
  emits: {
    change(state: boolean | any): boolean {
      return typeof state === 'boolean'
    },
  },
  data: (): { [key: string]: string } => {
    return {
      id: '',
    }
  },
  mounted() {
    this.id = Math.random().toString(36).substring(3)
  },
})
</script>

<style lang="scss" scoped>
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;

  .control {
    padding-left: 2em;
    margin: 0;
  }

  .hint {
    display: block;
    padding: .3em 0 0 0;
    font-size: .9em;
    color: var(--options-hint-color);
  }
}
</style>
