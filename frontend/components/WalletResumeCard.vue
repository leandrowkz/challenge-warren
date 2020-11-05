<template>
  <AppCard class="wallet-resume-card">
    <div class="header">
      <div>Sua conta</div>
      <div>Saldo disponível</div>
    </div>
    <div class="body">
      <div class="wallet">
        <h5>Conta corrente de {{ $auth.user.first_name }}</h5>
        <div class="bank-info">
          <span>Agência {{ userWallet.ag }}</span>
          <a-icon type="line" />
          <span>Conta {{ userWallet.cc }}</span>
        </div>
      </div>
      <h3 class="balance">
        <small>R$</small>
        {{ getWalletBalance() }}
      </h3>
    </div>
    <div class="actions">
      <nuxt-link to="/deposit" href="/deposit">
        <a-button type="primary">Depósito</a-button>
      </nuxt-link>
      <a-button type="primary" ghost>Pagamento</a-button>
      <a-button type="primary" ghost>Transferência</a-button>
      <a-button type="primary" ghost>Saque</a-button>
    </div>
  </AppCard>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('wallet', ['userWallet']),
    ...mapGetters('wallet', ['getWalletBalance']),
  },
}
</script>

<style lang="less">
.wallet-resume-card {
  height: 185px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: @spacer-sm;
    color: @text-color-muted;
    font-size: @font-size-sm;
    font-weight: bold;
  }

  .body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: @spacer-6;

    .wallet {
      h5 {
        margin-bottom: 0;
      }
      .bank-info {
        color: @text-color-muted;
      }
    }

    .balance {
      margin: 2px 0 0 0;
      small {
        color: @text-color-muted;
        font-weight: normal;
      }
    }
  }

  .actions {
    .ant-btn {
      margin-right: @spacer-xs;
    }
  }
}
</style>
