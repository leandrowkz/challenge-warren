<template>
  <a-form-model
    ref="form"
    :model="user"
    :rules="rules"
    layout="vertical"
    class="auth-login-form"
  >
    <a-form-model-item ref="email" prop="email">
      <a-input
        v-model="user.email"
        type="email"
        size="large"
        placeholder="Seu email"
        required
        @keyup.enter="submit"
      >
        <a-icon slot="prefix" type="mail" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item ref="password" prop="password">
      <a-input
        v-model="user.password"
        type="password"
        size="large"
        placeholder="Sua senha"
        required
        @keyup.enter="submit"
      >
        <a-icon slot="prefix" type="lock" />
      </a-input>
      <nuxt-link to="/forgot" class="forgot-link">
        Esqueci minha senha
      </nuxt-link>
    </a-form-model-item>
    <a-button
      :loading="signInLoading"
      type="primary"
      size="large"
      class="mt-4"
      block
      @click="submit"
    >
      Entrar
    </a-button>
    <a-button
      :loading="signInLoading"
      type="default"
      size="large"
      icon="google"
      block
      @click="signInGoogle"
    >
      Entrar com Google
    </a-button>
    <a-button
      :loading="signInLoading"
      type="default"
      size="large"
      icon="facebook"
      block
      @click="signInFacebook"
    >
      Entrar com Facebook
    </a-button>
  </a-form-model>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Email é obrigatório.',
            trigger: 'blur',
          },
          {
            // eslint-disable-next-line no-useless-escape
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Email inválido.',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Senha é obrigatório.',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: mapState('app', ['signInLoading']),
  methods: {
    signInGoogle() {
      this.$store.dispatch('app/signInGoogle')
    },
    signInFacebook() {
      this.$store.dispatch('app/signInSocial')
    },
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('app/signIn', { user: this.user })
        }
      })
    },
  },
}
</script>

<style lang="less">
.auth-login-form {
  .forgot-link {
    position: absolute;
    right: 0;
    top: 30px;
    font-size: @font-size-sm;
  }

  .ant-btn {
    margin-bottom: @spacer-md;
  }
}
</style>
