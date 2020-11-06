<template>
  <AppLoaderDots v-if="bootLoading" />
  <transition v-else name="home" mode="in-out">
    <section>
      <Nuxt />
    </section>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'auth',
  transition: 'home',
  computed: mapState('app', ['bootLoading']),
  created() {
    this.$store.dispatch('app/bootApplication')
  },
}
</script>

<style lang="less">
body {
  background-image: none;
  background-color: @layout-body-background;
  .home-enter-active,
  .home-leave-active {
    transition: opacity 0.5s;
  }
  .home-enter,
  .home-leave-active {
    opacity: 0;
  }
}
</style>
