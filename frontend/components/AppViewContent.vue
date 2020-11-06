<template>
  <a-layout-content :class="{ container: container }" class="app-view-content">
    <section class="app-view-content-wrapper">
      <slot />
    </section>
  </a-layout-content>
</template>

<script>
export default {
  props: {
    container: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="less">
.app-view-content {
  transition: @transition-base;
  margin-top: @layout-header-height;
  padding: @layout-body-padding;

  &.container {
    .app-view-content-wrapper {
      position: relative;
      margin: 0 auto;
      max-width: @layout-body-container-max-width;
    }
  }
}
</style>
