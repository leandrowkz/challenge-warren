<template>
  <a-form-model
    ref="form"
    :model="user"
    :rules="rules"
    layout="vertical"
    class="auth-signup-form"
  >
    <a-form-model-item ref="name" prop="name">
      <a-input
        v-model="user.name"
        size="large"
        placeholder="Digite seu nome"
        required
      >
        <a-icon slot="prefix" type="user" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item ref="email" prop="email">
      <a-input
        v-model="user.email"
        type="email"
        size="large"
        placeholder="Digite seu email"
        required
      >
        <a-icon slot="prefix" type="mail" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item ref="password" prop="password">
      <a-input
        v-model="user.password"
        type="password"
        size="large"
        placeholder="Defina sua senha"
        required
      >
        <a-icon slot="prefix" type="lock" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item ref="confirm_password" prop="confirm_password">
      <a-input
        v-model="user.confirm_password"
        type="password"
        size="large"
        placeholder="Confirme sua senha"
        required
      >
        <a-icon slot="prefix" type="lock" />
      </a-input>
    </a-form-model-item>
    <a-button
      :loading="signUpLoading"
      type="primary"
      size="large"
      class="mt-3"
      block
      @click="submit()"
    >
      Cadastre-se gratuitamente
    </a-button>
  </a-form-model>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      user: {
        name: null,
        email: null,
        password: null,
        confirm_password: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Nome é obrigatório.',
            trigger: 'blur',
          },
        ],
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
        confirm_password: [
          {
            required: true,
            message: 'Confirmação de senha é obrigatório.',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: mapState('app', ['signUpLoading']),
  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('app/signUp', { user: this.user })
        }
      })
    },
  },
}
</script>
