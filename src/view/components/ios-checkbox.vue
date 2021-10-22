<template>
  <div :style="cssVars">
    <input class="toggle toggle-light"
           type="checkbox"
           :id="id"
           :title="title"
           :checked="checked"
           @change="$emit('change', $event.target.checked)"/>
    <label class="toggle-btn" :for="id" :title="title"></label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    id: {
      type: String,
      default: 'checkbox-id'
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabledColor: {
      type: String,
      default: '#f04742',
    },
    title: {
      type: String,
      default: '',
    }
  },
  emits: {
    change(state: boolean | any): boolean {
      return typeof state === 'boolean'
    },
  },
  computed: {
    cssVars(): { [key: string]: string } {
      return {
        '--disabled-color': this.disabledColor,
      }
    },
  }
})
</script>

<style lang="scss" scoped>
// @link: <https://codepen.io/mallendeo/pen/eLIiG>

.toggle {
  display: none;

  // add default box-sizing for this scope
  &,
  &:after,
  &:before,
  & *,
  & *:after,
  & *:before,
  & + .toggle-btn {
    box-sizing: border-box;

    &::selection {
      background: none;
    }
  }

  + .toggle-btn {
    outline: 0;
    display: block;
    width: 2.7em;
    height: 1.5em;
    position: relative;
    cursor: pointer;
    user-select: none;

    &:after,
    &:before {
      position: relative;
      display: block;
      content: "";
      width: 50%;
      height: 100%;
    }

    &:after {
      left: 0;
    }

    &:before {
      display: none;
    }
  }

  &:checked + .toggle-btn:after {
    left: 50%;
  }
}

.toggle-light {
  + .toggle-btn {
    background: var(--disabled-color);
    border-radius: 1.5em;
    padding: 2px;
    transition: all .3s ease;

    &:after {
      border-radius: 50%;
      background: #fff;
      transition: all .045s ease;
    }
  }

  &:checked + .toggle-btn {
    background: #57de72;
  }
}
</style>
