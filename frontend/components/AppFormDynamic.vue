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
      default: 'Cancelar',
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
  methods: {
    /**
     * Copy form model to local form data.
     */
    copyStoreForm() {
      this.form = { ...this.formState.model }
    },

    /**
     * Update state form.model on state.
     */
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
      } catch (err) {
        console.log(err)
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
