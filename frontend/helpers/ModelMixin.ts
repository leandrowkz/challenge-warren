export default {
  props: {
    value: {
      type: String,
      default: undefined,
    },
  },
  data: () => ({
    selected: <any>undefined,
  }),
  watch: {
    value: {
      immediate: true,
      handler(val: any) {
        // @ts-ignore
        this.selected = val
      },
    },
  },
  methods: {
    change() {
      // @ts-ignore
      this.$emit('input', this.selected)
      // @ts-ignore
      this.$emit('change', this.selected)
    },
  },
}
