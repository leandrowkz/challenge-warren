<template>
  <a-spin
    v-bind="$attrs"
    :tip="tip"
    :spinning="spinning"
    class="app-loader-dots"
  >
    <AppDotFlashing slot="indicator" />
    <slot />
  </a-spin>
</template>

<script>
export default {
  props: {
    tip: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: '50px',
    },
    spinning: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="less">
.app-loader-dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.5);

  .ant-spin-text {
    font-size: @font-size-lg;
    font-weight: bold;
  }
}
</style>
