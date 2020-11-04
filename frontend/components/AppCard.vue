<template>
  <a-card v-bind="$attrs" class="app-card">
    <AppCardHeader
      v-if="title || description"
      :title="title"
      :description="description"
    />
    <slot />
  </a-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="less">
.app-card {
  margin-bottom: @spacer-lg;
}
</style>
