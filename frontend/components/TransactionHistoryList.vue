<template>
  <a-table
    v-if="transactions.length > 0"
    :columns="columns"
    :data-source="transactions"
    :row-key="(row) => row.id"
    :pagination="false"
    class="transaction-history-list"
  />
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

export default {
  props: {
    transactions: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters('app', ['formatCurrency']),
    ...mapGetters('transaction', ['getLabel']),
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
        title: 'Tipo',
        align: 'center',
        width: 200,
        sorter: (a, b) => FilterHelper.sort(a.type, b.type),
        customRender: (_, transaction) => (
          <span>{this.getTypeLabel(transaction.type)}</span>
        ),
      }

      const details = {
        key: 'details',
        title: 'Detalhes',
        sorter: (a, b) => FilterHelper.sort(a.type, b.type),
        customRender: (_, transaction) => <span>{transaction.details}</span>,
      }

      const amount = {
        key: 'half',
        width: 200,
        title: 'Valor',
        align: 'right',
        sorter: (a, b) => FilterHelper.sort(a.half, b.half),
        customRender: (_, transaction) => {
          const textClass =
            transaction.amount >= 0 ? 'text-success' : 'text-error'
          return (
            <span class={textClass}>
              {this.formatCurrency(transaction.amount)}
            </span>
          )
        },
      }

      return [when, type, details, amount]
    },
  },
}
</script>
