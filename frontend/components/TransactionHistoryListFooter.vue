<template>
  <section class="transaction-history-list-footer">
    <div class="label mr-5">Total no período</div>
    <div class="total">
      <div class="currency mr-2">R$</div>
      <div :class="{ 'text-success': total >= 0, 'text-error': total < 0 }">
        {{ total }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    transactions: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    total() {
      return this.transactions.reduce((prev, item) => prev + item.amount, 0)
    },
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

  .currency {
    font-size: @font-size-sm;
    color: @text-color-muted;
  }
}
</style>
