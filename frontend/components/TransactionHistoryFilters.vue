<template>
  <section class="transaction-history-filters">
    <div class="label">Período</div>
    <a-range-picker
      :value="[DateHelper.cast(filters.from), DateHelper.cast(filters.to)]"
      :format="DateHelper.configs.datepicker.format"
      :locale="DateHelper.configs.datepicker.locale"
      class="datepicker"
      @change="filterDate"
    />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import DateHelper from '~/helpers/DateHelper'

export default {
  data: () => ({
    DateHelper,
  }),
  computed: mapState('app', ['filters']),
  methods: {
    filterDate(dates) {
      const from = DateHelper.format(dates[0])
      const to = DateHelper.format(dates[1])
      this.$store.dispatch('app/setFilterDates', { from, to })
      this.$store.dispatch('transaction/fetchWalletTransactions')
    },
  },
}
</script>

<style lang="less">
.transaction-history-filters {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .label {
    color: @text-color-muted;
    margin-right: @spacer-sm;
  }

  .datepicker {
    max-width: 250px;
  }
}
</style>
