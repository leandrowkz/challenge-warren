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
      <template v-if="form.type === 'transfer'">
        <a-row :gutter="24">
          <a-col :lg="12">
            <a-form-item label="Nome da pessoa">
              <a-input v-model="form.person_name" />
            </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item label="Nº documento">
              <a-input v-model="form.person_document" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :lg="10">
            <a-form-item label="Código do banco">
              <a-input v-model="form.bank" />
            </a-form-item>
          </a-col>
          <a-col :lg="7">
            <a-form-item label="Agência">
              <a-input v-model="form.ag" />
            </a-form-item>
          </a-col>
          <a-col :lg="7">
            <a-form-item label="Conta">
              <a-input v-model="form.cc" />
            </a-form-item>
          </a-col>
        </a-row>
      </template>
      <template v-if="form.type === 'payment'">
        <a-form-item label="Linha digitável">
          <a-input-number v-model="form.barcode" class="w-100" />
        </a-form-item>
      </template>
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
