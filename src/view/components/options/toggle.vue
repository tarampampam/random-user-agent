<template>
  <div>
    <input
      type="checkbox"
      :id="id"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    />
    <label :for="id">
      <svg class="is-checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.67 426.67">
        <path d="M153.504 366.84c-8.657 0-17.323-3.303-23.927-9.912L9.914 237.265c-13.218-13.218-13.218-34.645
                 0-47.863 13.218-13.218 34.645-13.218 47.863 0l95.727 95.727 215.39-215.387c13.218-13.214
                 34.65-13.218 47.86 0 13.22 13.218 13.22 34.65 0 47.863L177.435 356.928c-6.61 6.605-15.27
                 9.91-23.932 9.91z"/>
      </svg>
      <svg class="is-unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982">
        <path d="M131.804 106.49l75.936-75.935c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312
                 0L106.49 81.18 30.555 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.99 6.99-6.99 18.323 0
                 25.312L81.18 106.49 5.24 182.427c-6.99 6.99-6.99 18.323 0 25.312 6.99 6.99 18.322
                 6.99 25.312 0L106.49 131.8l75.938 75.937c6.99 6.99 18.322 6.99 25.312 0 6.99-6.99
                 6.99-18.323 0-25.313l-75.936-75.936z"
              fill-rule="evenodd" clip-rule="evenodd"/>
      </svg>
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    checked: Boolean,
    id: String,
  },
  emits: {
    change(state: boolean | any): boolean {
      return typeof state === 'boolean'
    },
  },
})
</script>

<style lang="scss" scoped>
div {
  width: 3em;
  height: 1.6em;
  position: relative;
  cursor: pointer;

  input[type='checkbox'] {
    width: 3em;
    height: 1.6em;
    cursor: pointer;
    appearance: none;
    background: var(--options-toggle-off-bg-color);
    border-radius: 3px;
    position: relative;
    outline: 0;
    transition: all .02s;

    &:after { // brick
      position: absolute;
      content: '';
      top: .3em;
      left: .3em;
      height: 1em;
      width: 1em;
      background: var(--options-toggle-brick-bg-color);
      z-index: 2;
      border-radius: 2px;
      transition: all .035s;
    }

    // checked state
    &:checked {
      background: var(--options-toggle-on-bg-color);
    }

    &:checked:after {
      left: calc(100% - 1.25em);
    }

    &:checked + label .is-checked {
      transform: translateX(0) translateY(-30%) scale(.7);
    }

    &:checked ~ label .is-unchecked {
      transform: translateX(-190%) translateY(-30%) scale(0);
    }
  }

  svg {
    position: absolute;
    top: 40%;
    transform-origin: 50% 50%;
    fill: #fff;
    transition: all .025s;
    z-index: 1;
  }

  .is-checked {
    width: 1em;
    left: 15%;
    transform: translateX(190%) translateY(-30%) scale(0);
  }

  .is-unchecked {
    width: 1em;
    right: 15%;
    transform: translateX(0) translateY(-30%) scale(.5);
  }
}
</style>
