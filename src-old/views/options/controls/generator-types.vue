<template>
  <ul>
    <li
      v-for="type in allTypes"
      :key="type"
    >
      <toggle
        :id="type"
        :checked="$store.state.settings.generator.types.includes(type)"
        @change="checked => {change(checked, type)}"
      />
      <label :for="type">
        {{ i18n(type) }}
      </label>
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Toggle from '../common/toggle.vue'
import i18n from '../../mixins/i18n'
import {Mutation} from '../../store/mutations'
import {GeneratorType} from '../../../useragent/generator'

export default defineComponent({
  components: {
    'toggle': Toggle,
  },
  mixins: [i18n],
  data(): {
    allTypes: string[]
  } {
    return {
      allTypes: Object.values(GeneratorType as { [key: string]: string }),
    }
  },
  methods: {
    change(checked: boolean, type: GeneratorType | string): void {
      let state = this.$store.state.settings.generator.types.splice(0)

      if (checked) {
        state.push(type as GeneratorType) // append
      } else {
        state = state.filter(t => t !== type) // remove
      }

      this.$store.commit(Mutation.UpdateGeneratorOptions, {
        types: state,
      })
    },
  },
})
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  columns: 3;

  li {
    display: flex;
    align-items: center;
    break-inside: avoid-column;
    padding: 1em 0;

    label {
      padding-top: .1em;
      padding-left: .2em;
    }
  }
}
</style>
