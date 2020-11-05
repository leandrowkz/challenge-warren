<template>
  <AppView>
    <a-row :gutter="32">
      <a-col :lg="15">
        <WalletResumeCard />
      </a-col>
      <a-col :lg="9">
        <WalletHintCard />
      </a-col>
    </a-row>
    <TransactionHistoryCard />
  </AppView>
</template>

<script>
export default {
  layout: 'app',
  fetch() {
    this.$store.dispatch('transaction/fetchWalletTransactions')
  },
}
</script>
