<template>
  <currency-input
    v-model="selected"
    v-bind="$attrs"
    :precision="2"
    :allow-negative="false"
    :auto-decimal-mode="true"
    placeholder="R$ 100,00"
    currency="BRL"
    locale="pt-br"
    class="app-input-number ant-input w-100"
    @change="change"
  />
</template>

<script>
import ModelMixin from '~/helpers/ModelMixin'

export default {
  mixins: [ModelMixin],
}
</script>
