<template>
  <section class="app-card-header">
    <h4 class="title">{{ title }}</h4>
    <div v-if="description" class="description" v-html="description" />
  </section>
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
.app-card-header {
  padding-bottom: @spacer-md;

  .title {
    margin: 0;
  }

  .description {
    color: @text-color-muted;
    margin-top: 4px;
  }
}
</style>
