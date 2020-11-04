<template>
  <div class="login-page">
    <a-card class="login-card">
      <AppLogo />
      <h1 class="title">Faça login</h1>
      <div class="description">Continue para seu dashboard.</div>
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
    </div>
  </a-card>
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
    display: grid;
    place-items: center;
    align-content: center;
    max-width: 430px;
    min-height: 100%;
    height: auto;
    padding: @padding-lg + @padding-md;
    background: #fff;
    box-shadow: 5px 0px 20px 0px fade(@gray-8, 40%);

    .app-logo {
      width: 100%;
      margin-top: -@spacer-lg;
      margin-bottom: @spacer-xs;
      text-align: left;

      img {
        width: 140px;
      }
    }

    .title {
      width: 100%;
      text-align: left;
      margin-bottom: 0;

      .anticon {
        font-size: @font-size-base;
        color: @text-color-muted;
      }
    }

    .description {
      width: 100%;
      margin-bottom: @spacer-md;
      color: @text-color-muted;
      text-align: left;
    }

    .no-account {
      margin-top: @spacer-md;
      text-align: center;
      width: 100%;
    }
  }
}
</style>
