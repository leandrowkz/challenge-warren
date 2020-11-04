<template>
  <section :class="transaction.type" class="transaction-history-list-details">
    <div>
      <a
        v-if="['payment', 'transfer'].includes(transaction.type)"
        href="javascript:void(0)"
        class="mr-2"
        @click="open = !open"
      >
        <a-icon :type="open ? 'minus-square' : 'plus-square'" />
      </a>
      <span>{{ details.description }}</span>
    </div>
    <div v-if="open">
      <template v-if="transaction.type === 'payment'">
        <div>
          <a-icon type="barcode" class="mr-2" />
          <span>Código de barras: {{ details.barcode }}</span>
        </div>
      </template>
      <template v-if="transaction.type === 'transfer'">
        <div>
          <a-icon type="user" class="mr-2" />
          <span>
            Para {{ details.person_name }} {{ details.person_document }}
          </span>
        </div>
        <div>
          <a-icon type="bank" class="mr-2" />
          <span>
            Banco {{ details.bank }}
            <a-icon type="line" />
            AG {{ details.ag }} CC {{ details.cc }}
          </span>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    transaction: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    open: false,
  }),
  computed: {
    details() {
      return this.transaction.details || {}
    },
  },
}
</script>

<style lang="less">
.transaction-history-list-details {
  color: @text-color-muted;
}
</style>
