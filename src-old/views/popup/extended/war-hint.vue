<template>
  <section>
    <p>Правительство РФ ведёт оккупационную войну на территории Украины, массово убивает мирных жителей и нарушает любые нормы международного права.</p>
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
  padding: 1em .6em;
  text-align: center;
  line-height: 1.4em;
  letter-spacing: -.03em;

  p {
    margin: 0;

    &:not(:last-child) {
      padding-bottom: .4em;
    }
  }
}
</style>
