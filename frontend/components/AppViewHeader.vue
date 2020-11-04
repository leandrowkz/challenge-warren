<template>
  <a-layout-header class="app-view-header">
    <AppViewHeaderUser />
  </a-layout-header>
</template>

<script>
export default {
  //
}
</script>

<style lang="less">
.app-view-header {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: @layout-header-height;
  background: @layout-header-background;
  box-shadow: @layout-header-shadow;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .trigger {
    position: absolute;
    left: 100px;
    font-size: @font-size-lg;
    color: @text-color-muted;

    &:hover {
      color: @text-color;
    }
  }
}
</style>
