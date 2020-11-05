<template>
  <AppView>
    <a-row :gutter="32">
      <a-col :span="15">
        <TransactionCreateCard />
      </a-col>
      <a-col :span="9">
        <WalletBalanceCard />
      </a-col>
    </a-row>
  </AppView>
</template>

<script>
export default {
  layout: 'app',
  created() {
    const payload = {
      model: { type: 'payment' },
      title: 'Fazer um pagamento',
      description: 'Faça um novo pagamento com o saldo da sua conta.',
    }
    this.$store.dispatch('transaction/openForm', payload)
  },
}
</script>
