<template>
  <div class="login-page">
    <a-card class="login-card">
      <AppLogo />
      <AppMessageErrors
        v-if="signInErrors"
        :errors="signInErrors"
        class="mb-6"
      />
      <AuthLoginForm />
      <section class="no-account">
        <div class="text-bold">Não possui uma conta?</div>
        <nuxt-link to="/signup">Cadastre-se gratuitamente!</nuxt-link>
      </section>
    </a-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'login',
  computed: mapState('app', ['signInErrors']),
}
</script>

<style lang="less">
.login-page {
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;

  .login-card {
    margin: 0 auto;
    width: 430px;
    height: auto;
    padding: @padding-lg + @padding-md;
    background: #fff;
    box-shadow: 0px 0px 20px 0px fade(@gray-8, 30%);

    .app-logo {
      display: block;
      text-align: center;
      position: relative;
      width: 100%;
      margin: @spacer-lg auto;
      margin-top: -@spacer-xs;
    }

    .no-account {
      margin-top: @spacer-sm;
      text-align: center;
      width: 100%;
    }
  }

  @media only screen and (max-width: 600px) {
    .login-card {
      width: 300px;
      padding: @padding-md;
    }
  }
}
</style>
