import { Plugin } from '@nuxt/types'
import API from '@/api'

declare module 'vue/types/vue' {
  // this.$api inside Vue components
  interface Vue {
    $api: API
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$api inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $api: API
  }
  // nuxtContext.$api
  interface Context {
    $api: API
  }
}

declare module 'vuex/types/index' {
  // this.$api inside Vuex stores
  interface Store<S> {
    $api: API
  }
}

const api: Plugin = (context, inject) => {
  // @ts-ignore
  const api = new API(context.$axios)
  inject('api', api)
}

export default api
