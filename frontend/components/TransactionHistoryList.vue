<template>
  <a-table
    v-if="transactions.length > 0"
    :columns="columns"
    :data-source="transactions"
    :row-key="(row) => row.id"
    :pagination="false"
    class="transaction-history-list"
  >
    <TransactionHistoryListFooter slot="footer" :total="total" />
  </a-table>
  <AppEmpty
    v-else
    title="Sem movimentações"
    description="Nenhuma movimentação foi encontrada no período. Que tal criar uma agora mesmo?"
    action-label="Fazer depósito"
    @action="$router.push('/deposit')"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import DateHelper from '~/helpers/DateHelper'
import FilterHelper from '~/helpers/FilterHelper'
import TransactionHistoryListDetails from '~/components/TransactionHistoryListDetails.vue'

export default {
  props: {
    transactions: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters('app', ['formatCurrency']),
    ...mapGetters('transaction', ['getTypeLabel']),
    columns() {
      const when = {
        key: 'when',
        title: 'Data',
        width: 150,
        sorter: (a, b) => FilterHelper.sort(a.when, b.when),
        customRender: (_, transaction) => (
          <span>{DateHelper.formatBrazilian(transaction.when)}</span>
        ),
      }

      const type = {
        key: 'type',
        title: 'Movimentação',
        width: 150,
        sorter: (a, b) => FilterHelper.sort(a.type, b.type),
        customRender: (_, transaction) => (
          <span>{this.getTypeLabel(transaction.type)}</span>
        ),
      }

      const details = {
        key: 'details',
        title: 'Detalhes',
        sorter: (a, b) => FilterHelper.sort(a.details, b.details),
        customRender: (_, transaction) => (
          <TransactionHistoryListDetails transaction={transaction} />
        ),
      }

      const amount = {
        key: 'amount',
        width: 150,
        title: 'Valor',
        align: 'right',
        sorter: (a, b) => FilterHelper.sort(a.amount, b.amount),
        customRender: (_, transaction) => {
          const textClass =
            transaction.amount >= 0 ? 'text-success' : 'text-error'
          return (
            <span>
              <span class="text-muted text-small mr-2">R$</span>
              <span class={textClass}>
                {this.formatCurrency(transaction.amount)}
              </span>
            </span>
          )
        },
      }

      return [when, type, details, amount]
    },
  },
}
</script>
