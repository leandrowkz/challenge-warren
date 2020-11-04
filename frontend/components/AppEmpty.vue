<template>
  <a-empty :image="img" :image-style="{}" class="app-empty">
    <div slot="description">
      <div class="title">
        {{ title }}
      </div>
      <div v-if="description" class="description">
        {{ description }}
      </div>
    </div>
    <a-button
      v-if="showAction"
      size="large"
      type="primary"
      class="action"
      ghost
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </a-button>
  </a-empty>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Está meio vazio aqui',
    },
    description: {
      type: String,
      default: null,
    },
    actionLabel: {
      type: String,
      default: 'Clique aqui',
    },
    image: {
      type: String,
      default: 'blank-canvas.svg',
    },
    showAction: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    img() {
      return require(`~/assets/img/${this.image}`)
    },
  },
}
</script>

<style lang="less">
.app-empty {
  position: relative;
  max-width: @app-empty-max-width;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: calc(@app-empty-margin-vertical * 4) auto @app-empty-margin-vertical
    auto;

  .ant-empty-image {
    height: auto;
    img {
      height: auto;
      max-height: @app-empty-img-max-height;
    }
  }
  .ant-empty-footer {
    margin-top: @app-empty-spacer;
  }
  .title {
    margin-top: @app-empty-spacer;
    font-size: 16px;
    font-weight: bold;
  }
  .description {
    margin-top: calc(@app-empty-spacer - 5px);
    color: @text-color-muted;
  }
  .action {
    background: #fff !important;
  }
}
</style>
