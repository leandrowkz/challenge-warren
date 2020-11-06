<template>
  <div class="signup-page">
    <a-card class="signup-card">
      <AppLogo />
      <AppMessageErrors
        v-if="signUpErrors"
        :errors="signUpErrors"
        class="mb-6"
      />
      <AuthSignupForm />
      <section class="has-account">
        <div class="text-bold">Já possui uma conta?</div>
        <nuxt-link to="/">Faça login</nuxt-link>
      </section>
    </a-card>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'

export default {
  layout: 'login',
  computed: mapState('app', ['signUpErrors']),
}
</script>

<style lang="less">
.signup-page {
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;

  .signup-card {
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

    .has-account {
      margin-top: @spacer-sm;
      text-align: center;
      width: 100%;
    }
  }

  @media only screen and (max-width: 600px) {
    .signup-card {
      width: 300px;
      padding: @padding-md;
    }
  }
}
</style>
