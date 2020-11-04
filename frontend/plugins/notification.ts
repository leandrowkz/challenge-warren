import { Plugin } from '@nuxt/types'
import { notification as AntDesignNotification } from 'ant-design-vue'
import { Notification } from 'ant-design-vue/types/notification'

declare module 'vue/types/vue' {
  // this.$notification inside Vue components
  interface Vue {
    $notification: Notification
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$notification inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $notification: Notification
  }
  // nuxtContext.$notification
  interface Context {
    $notification: Notification
  }
}

declare module 'vuex/types/index' {
  // this.$notification inside Vuex stores
  interface Store<S> {
    $notification: Notification
  }
}

const notification: Plugin = (_, inject) => {
  AntDesignNotification.config({
    duration: 4,
    placement: 'bottomLeft',
  })
  inject('notification', AntDesignNotification)
}

export default notification
