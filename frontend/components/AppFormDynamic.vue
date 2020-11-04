<template>
  <section class="app-form-dynamic">
    <AppMessageErrors :errors="formState.errors" />
    <a-form layout="vertical">
      <slot :form="form" />
      <a-button :loading="formState.loading" type="primary" @click="submit">
        {{ submitText }}
      </a-button>
      <a-button
        v-if="showBack"
        :disabled="formState.loading"
        icon="arrow-left"
        type="default"
        class="ml-3"
        @click="back"
      >
        {{ backText }}
      </a-button>
    </a-form>
  </section>
</template>

<script>
export default {
  props: {
    storeModule: {
      type: String,
      required: true,
    },
    storeAction: {
      type: String,
      default: 'saveForm',
    },
    submitText: {
      type: String,
      default: 'Salvar',
    },
    backText: {
      type: String,
      default: 'Voltar',
    },
    showBack: {
      type: Boolean,
      default: true,
    },
    beforeSubmit: {
      type: Function,
      default: null,
    },
    beforeBack: {
      type: Function,
      default: null,
    },
    redirectAfterSubmit: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    form: {},
  }),
  computed: {
    formState() {
      return this.$store.state[this.storeModule].form || {}
    },
  },
  mounted() {
    this.copyStoreForm()
  },
  beforeDestroy() {
    // this.unwatchStoreForm()
  },
  methods: {
    /**
     * Copy form model to local form data.
     */
    copyStoreForm() {
      this.form = { ...this.formState.model }
    },

    /**
     * Watch form.model on state and sets locally.
     */
    // watchStoreForm() {
    //   const whenThis = (state) => {
    //     console.log('dispatch change', state[this.storeModule].form.model)
    //     return state[this.storeModule].form.model
    //   }
    //   const doThis = (newValue) => {
    //     console.log('form changed', newValue)
    //     this.form = { ...newValue }
    //   }
    //   this.unwatchStoreForm = this.$store.watch(whenThis, doThis)
    // },

    updateStoreModel() {
      const payload = { key: 'model', data: { ...this.form } }
      this.$store.commit(`${this.storeModule}/SET_FORM_ITEM`, payload)
    },

    /**
     * Submit button click handler.
     */
    async submit() {
      this.updateStoreModel()

      if (this.beforeSubmit) {
        this.beforeSubmit.call(null, this.form)
      }

      try {
        const action = `${this.storeModule}/${this.storeAction}`
        const payload = {
          action: this.formState.action,
          data: { ...this.form },
        }
        await this.$store.dispatch(action, payload)
      } catch {
        return false
      }

      if (this.redirectAfterSubmit) {
        this.back()
      }
    },

    /**
     * Back button click handler.
     */
    back() {
      if (this.beforeBack) {
        this.beforeBack.call(null, this.form)
      }

      const prev = this.$nuxt.context.from
        ? this.$nuxt.context.from.path
        : this.formState.backRoute

      this.$router.push(prev)
    },
  },
}
</script>
