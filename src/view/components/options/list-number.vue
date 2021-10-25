<template>
  <li>
    <label :for="id">
      {{ caption }}
      <span v-if="hint" class="hint">{{ hint }}</span>
    </label>
    <p class="control">
      <input type="number"
             :id="id"
             :value="value"
             :placeholder="placeholder"
             :min="minimum"
             :max="maximum"
             @change="checkValue($event)"
             @keyup="checkValue($event)"/>
    </p>
  </li>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    caption: String,
    hint: String,
    value: Number,
    placeholder: Number,
    minimum: Number,
    maximum: Number,
  },
  emits: {
    change(state: number | any): boolean {
      return typeof state === 'number'
    },
  },
  data: (): { [key: string]: string } => {
    return {
      id: '',
    }
  },
  methods: {
    checkValue(event: KeyboardEvent): void {
      const $el = (event.target as HTMLInputElement), max = Number(this.maximum), min = Number(this.minimum)

      if ($el.valueAsNumber > max) {
        $el.valueAsNumber = max
      }

      if ($el.valueAsNumber < min) {
        $el.valueAsNumber = min
      }

      if (!isNaN($el.valueAsNumber)) {
        this.$emit('change', $el.valueAsNumber)
      }
    },
  },
  mounted(): void {
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

    input[type=number] {
      width: 5.5em;
      outline: none;
      box-shadow: none;
      margin: 0;
      border-width: 1px;
      background-color: var(--main-bg-color);
      color: var(--main-text-color);
      border-color: var(--input-border-color);
      border-radius: 3px;

      &::placeholder {
        color: var(--placeholder-color);
      }
    }
  }

  .hint {
    display: block;
    padding: .3em 0 0 0;
    font-size: .9em;
    color: var(--hint-color);
  }
}
</style>
