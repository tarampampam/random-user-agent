<template>
  <li>
    <div>
      <label :for="id">{{ caption }}</label>
      <textarea :id="id"
                :rows="rowsCount"
                :placeholder="placeholder"
                @input="checkValue">{{ lines }}</textarea>
      <p class="hint" v-if="hint">{{ hint }}</p>
    </div>
  </li>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    caption: String,
    value: {
      type: Array,
      default: [] as string[],
    },
    rowsCount: {
      type: Number,
      default: 3,
    },
    placeholder: String,
    hint: String,
  },
  emits: {
    change(text: string[] | any): boolean {
      return Array.isArray(text)
    },
  },
  data: (): { [key: string]: string } => {
    return {
      id: '',
    }
  },
  methods: {
    checkValue(event: InputEvent): void {
      const $el = event.target as HTMLTextAreaElement

      this.$emit(
          'change',
          $el.value
              .split('\n')
              .map((s: string): string => s.trim())
              .filter((s: string): boolean => s.length > 0),
      )
    },
  },
  computed: {
    lines(): string {
      return this.value.join('\n')
    }
  },
  mounted(): void {
    this.id = Math.random().toString(36).substring(3)
  },
})
</script>

<style lang="scss" scoped>
li {
  div {
    width: 100%;
  }

  textarea {
    display: block;
    width: 100%;
    min-height: 4em;
    resize: vertical;
    font-size: .8em;
    padding: .7em .5em;
    margin: .5em 0 0 0;

    outline: none;
    box-shadow: none;
    box-sizing: border-box;
    border-width: 1px;
    background-color: var(--options-main-bg-color);
    color: var(--options-main-text-color);
    border-color: var(--options-input-border-color);
    border-radius: 3px;

    &::placeholder {
      color: var(--options-placeholder-color);
    }
  }

  .hint {
    display: block;
    padding: .3em 0 0 0;
    margin: 0;
    font-size: .9em;
    color: var(--options-hint-color);
  }
}
</style>
