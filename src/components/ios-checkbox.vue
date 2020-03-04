<template>
  <div>
    <input class="toggle toggle-light" :id="id" type="checkbox" checked />
    <label class="toggle-btn" :for="id"></label>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'iosCheckbox',
    props: {
      id: {
        default: 'checkbox-id',
        type: String
      },
    }
  };
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
      background: #f04742;
      border-radius: 1.5em;
      padding: 2px;
      transition: all .3s ease;
      &:after {
        border-radius: 50%;
        background: #fff;
        transition: all .175s ease;
      }
    }

    &:checked + .toggle-btn {
      background: #57de72;
    }
  }
</style>
