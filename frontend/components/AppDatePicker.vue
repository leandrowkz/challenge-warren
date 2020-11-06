<template>
  <a-date-picker
    v-model="date"
    v-bind="$attrs"
    :locale="configs.locale"
    :format="configs.format"
    class="app-date-picker w-100"
    dropdown-class-name="app-date-picker-dropdown"
    @change="change"
  >
    <slot />
  </a-date-picker>
</template>

<script>
import DateHelper from '~/helpers/DateHelper'

export default {
  props: {
    value: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      date: null,
      configs: DateHelper.configs.datepicker,
    }
  },
  watch: {
    value: {
      handler(val) {
        this.value = val
        this.date = val ? DateHelper.cast(val) : null
      },
      immediate: true,
    },
  },
  methods: {
    change(dt) {
      const input = dt ? DateHelper.format(dt) : null
      this.date = dt
      this.$emit('input', input)
    },
  },
}
</script>

<style lang="less">
.app-date-picker-dropdown {
  z-index: 10001;
}
</style>
