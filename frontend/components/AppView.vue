<template>
  <a-layout class="app-view">
    <AppViewHeader v-if="header" :container="container" />
    <AppViewContent :container="container">
      <slot />
    </AppViewContent>
  </a-layout>
</template>

<script>
export default {
  props: {
    header: {
      type: Boolean,
      default: true,
    },
    container: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
