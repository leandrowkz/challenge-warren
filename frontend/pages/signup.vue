<template>
  <div class="signup-page">
    <div class="signup-section">
      <AppLogo type="dark" />
      <h1 class="title">Cadastre-se</h1>
      <div class="description">Comece a usar seu dashboard.</div>
      <AppMessageErrors
        v-if="signUpErrors"
        :errors="signUpErrors"
        class="mb-6"
      />
      <AuthSignupForm />
      <section class="has-account">
        <div class="text-bold">Já possui uma conta?</div>
        <nuxt-link to="/login">Faça login</nuxt-link>
      </section>
    </div>
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

  .signup-section {
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

    .has-account {
      margin-top: @spacer-md;
      text-align: center;
      width: 100%;
    }
  }
}
</style>
