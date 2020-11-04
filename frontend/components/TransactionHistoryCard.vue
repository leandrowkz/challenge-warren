<template>
  <AppCard
    :loading="loadingWalletTransactions"
    class="transaction-history-card"
    title="Extrato bancário"
    description="Veja suas movimentações no período selecionado."
  >
    <TransactionHistoryList :transactions="walletTransactions" />
  </AppCard>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState('transaction', [
    'walletTransactions',
    'loadingWalletTransactions',
  ]),
}
</script>

<style lang="less">
.transaction-history-card {
  //
}
</style>
