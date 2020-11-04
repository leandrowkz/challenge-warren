<template>
  <a-layout class="app-view">
    <AppViewHeader v-if="header" />
    <AppViewSidebar v-if="sidebar" />
    <AppViewContent :container="container">
      <slot />
    </AppViewContent>
  </a-layout>
</template>

<script>
export default {
  props: {
    sidebar: {
      type: Boolean,
      default: true,
    },
    header: {
      type: Boolean,
      default: true,
    },
    container: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
