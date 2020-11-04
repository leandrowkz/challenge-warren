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
  background: linear-gradient(
    45deg,
    lighten(@primary-color, 20%),
    lighten(@primary-color, 5%),
    darken(@primary-color, 15%)
  );
}
</style>
