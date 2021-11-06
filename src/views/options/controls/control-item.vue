<template>
  <li>
    <div>
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

  .hint, .option {
    padding: .8em 0 0 0;
    font-size: .9em;
    max-width: 90%;
    opacity: .7;
  }

  .hint {
    opacity: .7;
  }

  .option {
    opacity: .9;
  }
}
</style>
