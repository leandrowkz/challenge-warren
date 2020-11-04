<template>
  <nuxt-link :to="to" :href="to" class="app-logo">
    <span>Banco</span>
    <span>magenta</span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '/',
    },
  },
}
</script>

<style lang="less">
.app-logo {
  width: 200px;
  font-size: calc(@font-size-lg + 5px);
  font-weight: bold;
  > span:last-child {
    color: @primary-color;
  }
}
</style>
