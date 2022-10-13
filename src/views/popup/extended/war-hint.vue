<template>
  <section>
    <p>Правительство РФ ведёт оккупационную войну на территории Украины, массово убивает мирных и нарушает любые нормы международного права.</p>
    <p>Не верьте государственным СМИ, ищите информацию в независимых источниках.</p>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({})
</script>

<style lang="scss" scoped>
section {
  font-size: 1.1em;
  font-weight: bold;
  padding: 2em 1.1em;
  text-align: center;
  line-height: 1.4em;

  p {
    margin: 0;

    &:not(:last-child) {
      padding-bottom: .4em;
    }
  }
}
</style>
