<template>
  <a-dropdown
    :trigger="['click']"
    class="app-view-header-user"
    overlay-class-name="app-view-header-user-dropdown"
    placement="bottomRight"
  >
    <a-menu slot="overlay">
      <a-menu-item class="header">
        <h6 class="m-0">
          {{ $auth.user.name }}
        </h6>
        <div class="text-muted text-small">
          {{ $auth.user.email }}
        </div>
      </a-menu-item>
      <a-menu-item>
        <nuxt-link to="/settings/profile" href="/settings/profile">
          <a-icon type="user" />
          <span>Seu perfil</span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-item>
        <nuxt-link to="/settings" href="/settings">
          <a-icon type="setting" />
          <span>Configurações</span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item @click="logout">
        <a-icon type="logout" />
        <span>Sair</span>
      </a-menu-item>
    </a-menu>
    <div class="handler">
      <a-avatar :size="28" :src="$auth.user.avatar" icon="user" />
      <div class="name">
        {{ $auth.user.first_name }}
      </div>
      <a-icon type="down" />
    </div>
  </a-dropdown>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch('app/signOut')
    },
  },
}
</script>

<style lang="less">
.app-view-header-user {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: @spacer-md;

  &:hover {
    > .anticon {
      color: @text-color;
    }
  }

  .name {
    font-weight: 600;
    margin: 0 @spacer-xs;
  }

  > .anticon {
    color: @text-color-muted;
  }

  &-dropdown {
    top: calc(@layout-header-height - @spacer-xs) !important;
  }
}
</style>
