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

    <div class="right" v-if="$slots['toggle']">
      <slot name="toggle"/>
    </div>
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem .3rem;

  .left {
    width: 100%;
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

  .right {
    padding-left: 1.2em;
  }

  &:not(:last-child) {
    border: solid var(--color-ui-border-light);
    border-width: 0 0 1px 0;
  }
}
</style>
