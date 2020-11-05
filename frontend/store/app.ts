import Vue from 'vue'
import * as moment from 'moment'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import DateHelper from '~/helpers/DateHelper'

export const state = () => ({
  filters: {
    type: <string>'all',
    from: <string>DateHelper.format(<any>moment().startOf('month')),
    to: <string>DateHelper.format(<any>moment().endOf('month')),
  },
  bootLoading: <boolean>false,
  signInErrors: <any[] | false>false,
  signUpErrors: <any[] | false>false,
  signInLoading: <boolean>false,
  signUpLoading: <boolean>false,
})

export type AppState = ReturnType<typeof state>

export const getters: GetterTree<AppState, AppState> = {
  formatCurrency: () => (value: number) => {
    const payload = { minimumFractionDigits: 2 }
    return value.toLocaleString('pt-br', payload)
  },
}

export const actions: ActionTree<AppState, AppState> = {
  /**
   * Dispatch all actions and api calls necessary for the application.
   */
  async bootApplication({ commit }) {
    commit('SET_BOOT_LOADING', true)
    await Promise.all([this.dispatch('wallet/fetchUserWallet')])
    commit('SET_BOOT_LOADING', false)
  },

  /**
   * Login given user.
   */
  async signIn({ commit }, { user }) {
    try {
      commit('SET_SIGNIN_ERRORS')
      commit('SET_SIGNIN_LOADING', true)
      await this.$auth.loginWith('local', { data: user })
      this.$router.push('/dashboard')
    } catch ({ response }) {
      const { errors } = response.data
      commit('SET_SIGNIN_ERRORS', errors)
    } finally {
      commit('SET_SIGNIN_LOADING', false)
    }
  },

  /**
   * Register a new user.
   */
  async signUp({ dispatch, commit }, { user }) {
    try {
      commit('SET_SIGNUP_ERRORS')
      commit('SET_SIGNUP_LOADING', true)
      await this.$api.auth.signUp(user)
      await dispatch('signIn', { user })
    } catch ({ response }) {
      const { errors } = response.data
      commit('SET_SIGNUP_ERRORS', errors)
    } finally {
      commit('SET_SIGNUP_LOADING', false)
    }
  },

  /**
   * Logout user.
   */
  async signOut() {
    await this.$auth.logout()
    this.$router.push('/')
  },

  /**
   * Set date filters.
   */
  setFilterDates({ commit }, dates: any) {
    const from = DateHelper.format(dates.from)
    const to = DateHelper.format(dates.to)
    commit('SET_FILTER_DATES', { from, to })
  },
}

export const mutations: MutationTree<AppState> = {
  SET_FILTER_DATES: (state: AppState, { from, to }) => {
    Vue.set(state.filters, 'from', from)
    Vue.set(state.filters, 'to', to)
  },

  SET_SIGNIN_ERRORS: (state: AppState, errors: [] | false) => {
    state.signInErrors = errors ? [...errors] : false
  },

  SET_SIGNUP_ERRORS: (state: AppState, errors: [] | false) => {
    state.signUpErrors = errors ? [...errors] : false
  },

  SET_BOOT_LOADING: (state: AppState, loading: boolean) => {
    state.bootLoading = loading
  },

  SET_SIGNIN_LOADING: (state: AppState, loading: boolean) => {
    state.signInLoading = loading
  },

  SET_SIGNUP_LOADING: (state: AppState, loading: boolean) => {
    state.signUpLoading = loading
  },
}
