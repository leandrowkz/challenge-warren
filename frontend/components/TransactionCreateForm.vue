<template>
  <AppFormDynamic
    store-module="transaction"
    submit-text="Salvar"
    class="transaction-create-form"
  >
    <template v-slot="{ form }">
      <a-form-item label="Valor">
        <AppInputCurrency v-model="form.amount" />
      </a-form-item>
      <a-form-item
        label="Descrição (opcional)"
        extra="Ex: Pagamento do site, depósito referente ao pagamento XYZ"
      >
        <a-textarea
          v-model="form.description"
          placeholder="Insira uma descrição..."
        />
      </a-form-item>
    </template>
  </AppFormDynamic>
</template>
