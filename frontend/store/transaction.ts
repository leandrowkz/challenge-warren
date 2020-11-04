import Vue from 'vue'
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  walletTransactions: <any[]>[],
  loadingWalletTransactions: <boolean>false,
  form: {
    model: <any>{},
    type: <string>null,
    errors: <any[] | false>false,
    loading: <boolean>false,
    title: <string>null,
    description: <string>null,
    backRoute: '/dashboard',
  },
  labels: {
    deposit: 'Depósito',
    payment: 'Pagamento',
    transfer: 'Transferência',
    withdraw: 'Saque',
  },
})

export type TransactionState = ReturnType<typeof state>

export const getters: GetterTree<TransactionState, TransactionState> = {
  getTransaction: (state) => (id: string) => {
    return (
      state.walletTransactions.find(
        (transaction: any) => transaction.id === id
      ) || null
    )
  },
  getTypeLabel: (state) => (type: string) => {
    return state.labels[type] || 'Não identificado'
  },
}

export const actions: ActionTree<TransactionState, TransactionState> = {
  /**
   * Fetch all user tags from api.
   */
  async fetchWalletTransactions({ commit, rootState }) {
    // @ts-ignore
    const { filters } = rootState.app
    commit('SET_LOADING_WALLET_TRANSACTIONS', true)
    const { data } = await this.$api.transaction.fetchWalletTransactions({
      filters,
    })
    commit('SET_WALLET_TRANSACTIONS', data)
    commit('SET_LOADING_WALLET_TRANSACTIONS', false)
    return data
  },

  /**
   * Sets transaction dynamic form data.
   */
  async openForm(
    { state, commit },
    { model, action, title, description, backRoute = state.form.backRoute }
  ) {
    if (!model) {
      return this.$router.push(state.form.backRoute)
    }

    await Promise.all([
      commit('SET_FORM_ITEM', { key: 'model', data: { ...model } }),
      commit('SET_FORM_ITEM', { key: 'action', data: action }),
      commit('SET_FORM_ITEM', { key: 'errors', data: false }),
      commit('SET_FORM_ITEM', { key: 'title', data: title }),
      commit('SET_FORM_ITEM', { key: 'description', data: description }),
      commit('SET_FORM_ITEM', { key: 'backRoute', data: backRoute }),
    ])
  },

  /**
   * Saves (create/update) current state method dynamic form.
   */
  async saveForm({ commit, dispatch, state }) {
    let notification = ''
    const { type, model } = state.form
    switch (type.toLowerCase()) {
      case 'payment':
        notification = 'Pagamento realizado.'
        break
      case 'transfer':
        notification = 'Transferência realizada.'
        break
      case 'deposit':
        notification = 'Depósito realizado.'
        break
      case 'withdraw':
        notification = 'Saque realizado.'
        break
    }

    try {
      commit('SET_FORM_ITEM', { key: 'errors', data: false })
      commit('SET_FORM_ITEM', { key: 'loading', data: true })
      // @ts-ignore
      await this.$api.transaction[type]({ data: model })
      await dispatch('fetchWalletTransactions')
      this.$notification.success({
        message: model.name,
        description: notification,
      })
    } catch ({ response }) {
      const { errors } = response.data
      commit('SET_FORM_ITEM', { key: 'errors', data: errors })
      return Promise.reject(errors)
    } finally {
      commit('SET_FORM_ITEM', { key: 'loading', data: false })
    }
  },
}

export const mutations: MutationTree<TransactionState> = {
  SET_WALLET_TRANSACTIONS: (state: TransactionState, transactions: []) => {
    state.walletTransactions = [...transactions]
  },

  SET_LOADING_WALLET_TRANSACTIONS: (
    state: TransactionState,
    loading: boolean
  ) => {
    state.loadingWalletTransactions = loading
  },

  SET_FORM_ITEM: (state: TransactionState, payload: any) => {
    const { key, data } = payload
    const content = key === 'errors' && Array.isArray(data) ? [...data] : data
    Vue.set(state.form, key, content)
  },
}
