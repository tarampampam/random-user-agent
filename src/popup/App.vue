<template>
  <div>
    <p>Hello world! From {{ from }}</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return {
        from: 'Indostan'
      };
    },
  });
</script>

<style lang="scss" scoped>
  p {
    font-size: 20px;
  }
</style>
