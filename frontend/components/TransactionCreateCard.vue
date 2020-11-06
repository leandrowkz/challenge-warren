<template>
  <AppCard
    :title="form.title"
    :description="form.description"
    class="transaction-create-card"
  >
    <TransactionCreateForm />
  </AppCard>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState('transaction', ['form']),
}
</script>
