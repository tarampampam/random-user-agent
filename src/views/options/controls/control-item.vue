<template>
  <li>
    <div class="left">
      <slot name="label"/>
      <div class="hint" v-if="$slots['hint']">
        <slot name="hint"/>
      </div>
      <div class="option" v-if="$slots['option']">
        <slot name="option"/>
      </div>
    </div>

    <slot name="toggle"/>
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem .3rem;

  .left {
    padding-right: 1.2em;
  }

  .hint, .option {
    padding: .8em 0 0 0;
    font-size: .9em;
    opacity: .7;
  }

  .hint {
    opacity: .7;
  }

  .option {
    opacity: .9;
  }

  &:not(:last-child) {
    border: solid var(--options-border-primary-color);
    border-width: 0 0 1px 0;
  }
}
</style>
