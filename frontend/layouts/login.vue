<template>
  <div class="login-layout">
    <Nuxt />
  </div>
</template>

<script>
export default {
  auth: false,
}
</script>

<style lang="less">
.login-layout {
  height: 100%;
  background: linear-gradient(45deg, @primary-color, darken(@primary-color, 5%));
}
</style>
