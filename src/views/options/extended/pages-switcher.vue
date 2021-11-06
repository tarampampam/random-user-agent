<template>
  <ul>
    <li v-for="page in pages" :key="page.id" :class="{active: isActive(page.id)}" @click="changePage(page.id)">
      <span>{{ page.text }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {Mutation, Page} from '../store'
import i18n from '../../mixins/i18n'

export default defineComponent({
  mixins: [i18n],
  data(): {
    pages: { id: Page, text: string }[]
  } {
    return {
      pages: [
        {id: Page.General, text: this.i18n('general_settings', 'General settings')},
        {id: Page.Generator, text: this.i18n('generator_settings', 'Generator settings')},
        {id: Page.Blacklist, text: this.i18n('blacklist_settings', 'Blacklist settings')},
      ],
    }
  },
  methods: {
    changePage(page: Page): void {
      this.$store.commit(Mutation.SwitchPage, page)
    },

    isActive(page: Page): boolean {
      return this.$store.state.page === page
    },
  },
})
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 1.2rem 0;
    cursor: pointer;

    span {
      position: relative;
    }

    &.active {
      span:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        height: .25em;
        background-color: var(--color-ui-on);
        bottom: -0.7em;
      }
    }

    &.active, &:hover {
      -webkit-text-stroke: 1px currentColor;
    }
  }
}
</style>
