<template>
  <div class="example">
    {{ msg }} {{ i18n('manifest_name') }}
  </div>
</template>

<script lang="ts">
import i18n from './mixins/i18n'

export default {
  mixins: [i18n],
  data: (): { [key: string]: any } => {
    return {
      msg: 'Hello world11!',
    }
  },
}
</script>

<style lang="scss" scoped>
.example {
  background-color: red;
}
</style>
