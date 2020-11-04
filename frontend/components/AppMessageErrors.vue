<template>
  <a-alert
    v-if="errors"
    type="error"
    message="Ops! Encontramos estes problemas:"
    class="app-message-errors"
    show-icon
    closable
  >
    <div v-if="errors" slot="description" class="errors">
      <div v-for="(error, key) in errors" :key="key" class="error">
        <a-icon type="line" />
        <div class="error-message">
          {{ error.message }}
        </div>
      </div>
    </div>
  </a-alert>
</template>

<script>
export default {
  props: {
    errors: {
      type: [Array, Boolean],
      default: false,
    },
  },
}
</script>

<style lang="less">
.app-message-errors {
  width: 100%;
  margin-bottom: @spacer-md;

  .error {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 4px;

    > .anticon {
      margin-right: @spacer-sm;
      margin-top: 4px;
      color: @text-color-muted;
    }
  }
}
</style>
