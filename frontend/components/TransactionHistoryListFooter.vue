<template>
  <section class="transaction-history-list-footer">
    <div class="label mr-5">Total no período</div>
    <div class="total">
      <div class="currency mr-2">R$</div>
      <div :class="{ 'text-success': total >= 0, 'text-error': total < 0 }">
        {{ formatCurrency(total) }}
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters('app', ['formatCurrency']),
  },
}
</script>

<style lang="less">
.transaction-history-list-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .label {
    font-weight: bold;
    white-space: nowrap;
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .currency {
      font-size: @font-size-sm;
      color: @text-color-muted;
    }
  }
}
</style>
