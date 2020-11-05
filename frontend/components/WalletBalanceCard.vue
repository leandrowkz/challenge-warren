<template>
  <AppCard class="wallet-balance-card">
    <div class="header">Saldo da conta</div>
    <h3 class="balance">
      <small>R$</small>
      {{ getWalletBalance() }}
    </h3>
    <div class="description">Valor disponível para transações.</div>
  </AppCard>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters('wallet', ['getWalletBalance']),
}
</script>

<style lang="less">
.wallet-balance-card {
  .header {
    margin-bottom: @spacer-sm;
    color: @text-color-muted;
    font-size: @font-size-sm;
    font-weight: bold;
  }

  .balance {
    margin: 2px 0 @spacer-sm 0;

    small {
      color: @text-color-muted;
      font-weight: normal;
    }
  }

  .description {
    color: @text-color-muted;
  }
}
</style>
