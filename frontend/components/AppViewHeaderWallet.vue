<template>
  <div class="app-view-header-wallet">
    <div class="ag">AG {{ userWallet.ag }}</div>
    <a-icon type="line" class="mx-2" />
    <div class="cc">CC {{ userWallet.cc }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState('wallet', ['userWallet']),
}
</script>

<style lang="less">
.app-view-header-wallet {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1px;
  color: @text-color-muted;
  font-size: @font-size-sm;

  @media only screen and (max-width: 600px) {
    display: block;
    line-height: 1.5;
    white-space: nowrap;
    font-size: 9px;

    .anticon {
      display: none;
    }
  }
}
</style>
