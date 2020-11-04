import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  userWallet: <any>{},
})

export type WalletState = ReturnType<typeof state>

export const getters: GetterTree<WalletState, WalletState> = {
  getWalletBalance: (state) => () => {
    const payload = { minimumFractionDigits: 2 }
    return state.userWallet.balance.toLocaleString('pt-br', payload)
  },
}

export const actions: ActionTree<WalletState, WalletState> = {
  /**
   * Fetch user wallet from api.
   */
  async fetchUserWallet({ commit }) {
    const { data } = await this.$api.wallet.fetchUserWallet()
    commit('SET_USER_WALLET', data)
    return data
  },
}

export const mutations: MutationTree<WalletState> = {
  SET_USER_WALLET: (state: WalletState, wallet: {}) => {
    state.userWallet = { ...wallet }
  },
}
