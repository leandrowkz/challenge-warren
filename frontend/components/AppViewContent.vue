<template>
  <a-layout-content
    :class="{
      container: container,
      'sidebar-visible': sidebarVisible,
    }"
    class="app-view-content"
  >
    <section class="app-view-content-wrapper">
      <slot />
    </section>
  </a-layout-content>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    container: {
      type: Boolean,
      default: false,
    },
  },
  computed: mapState('app', ['sidebarVisible']),
}
</script>

<style lang="less">
.app-view-content {
  transition: @transition-base;
  margin-left: 80px;
  margin-top: @layout-header-height;
  padding: @layout-body-padding;

  &.sidebar-visible {
    margin-left: @layout-sider-width;
  }

  &.container {
    .app-view-content-wrapper {
      position: relative;
      margin: 0 auto;
      max-width: @layout-body-container-max-width;
    }
  }
}
</style>
