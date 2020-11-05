<template>
  <AppCard
    :loading="loadingWalletTransactions"
    class="transaction-history-card"
    title="Extrato bancário"
    description="Veja suas movimentações no período selecionado."
  >
    <TransactionHistoryFilters class="filters" />
    <TransactionHistoryList
      :transactions="walletTransactions"
      :total="walletTransactionsTotal"
    />
  </AppCard>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState('transaction', [
    'walletTransactions',
    'walletTransactionsTotal',
    'loadingWalletTransactions',
  ]),
}
</script>

<style lang="less">
.transaction-history-card {
  .filters {
    position: absolute;
    top: calc(@card-padding-base + 10px);
    right: @card-padding-base;
  }

  @media only screen and (max-width: 600px) {
    .filters {
      position: relative;
      left: 0;
      top: 0;
      margin-bottom: @spacer-lg;
    }
  }
}
</style>
