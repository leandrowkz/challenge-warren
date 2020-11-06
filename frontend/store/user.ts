import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  //
})

export type UserState = ReturnType<typeof state>

export const getters: GetterTree<UserState, UserState> = {
  //
}

export const actions: ActionTree<UserState, UserState> = {
  //
}

export const mutations: MutationTree<UserState> = {
  //
}
