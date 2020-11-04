import Vue from 'vue'
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  transactions: <any[]>[],
  form: {
    model: <any>{},
    type: <string>null,
    errors: <any[] | false>false,
    loading: <boolean>false,
    title: <string>null,
    description: <string>null,
    backRoute: '/dashboard',
  },
})

export type TransactionState = ReturnType<typeof state>

export const getters: GetterTree<TransactionState, TransactionState> = {
  getTransaction: (state) => (id: string) => {
    return (
      state.transactions.find((transaction: any) => transaction.id === id) ||
      null
    )
  },
}

export const actions: ActionTree<TransactionState, TransactionState> = {
  /**
   * Fetch all user tags from api.
   */
  async fetchWalletTransactions({ commit }) {
    const { data } = await this.$api.transaction.fetchWalletTransactions()
    commit('SET_TRANSACTIONS', data)
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
  SET_TRANSACTIONS: (state: TransactionState, tags: []) => {
    state.transactions = [...tags]
  },

  SET_FORM_ITEM: (state: TransactionState, payload: any) => {
    const { key, data } = payload
    const content = key === 'errors' && Array.isArray(data) ? [...data] : data
    Vue.set(state.form, key, content)
  },
}
