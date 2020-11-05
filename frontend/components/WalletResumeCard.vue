<template>
  <AppCard class="wallet-resume-card">
    <div class="body">
      <div class="account">
        <div class="header">Sua conta</div>
        <div class="wallet">
          <h5>Conta corrente de {{ $auth.user.first_name }}</h5>
          <div class="bank-info">
            <span>Agência {{ userWallet.ag }}</span>
            <a-icon type="line" />
            <span>Conta {{ userWallet.cc }}</span>
          </div>
        </div>
      </div>
      <div class="balance">
        <div class="header">Saldo disponível</div>
        <h3 class="amount">
          <small>R$</small>
          {{ getWalletBalance() }}
        </h3>
      </div>
    </div>
    <div class="actions">
      <nuxt-link to="/deposit" href="/deposit">
        <a-button type="primary">Depósito</a-button>
      </nuxt-link>
      <nuxt-link to="/payment" href="/payment">
        <a-button type="primary" ghost>Pagamento</a-button>
      </nuxt-link>
      <nuxt-link to="/transfer" href="/transfer">
        <a-button type="primary" ghost>Transferência</a-button>
      </nuxt-link>
      <nuxt-link to="/withdraw" href="/withdraw">
        <a-button type="primary" ghost>Saque</a-button>
      </nuxt-link>
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

    .account {
      .wallet {
        h5 {
          margin-bottom: 0;
        }
        .bank-info {
          color: @text-color-muted;
        }
      }
    }

    .balance {
      .amount {
        margin: 2px 0 0 0;
        small {
          color: @text-color-muted;
          font-weight: normal;
        }
      }
    }
  }

  .actions {
    .ant-btn {
      margin-right: @spacer-xs;
    }
  }

  @media only screen and (max-width: 600px) {
    height: auto;
    .body {
      display: block;
      margin-bottom: @spacer-xs;

      .balance {
        margin-top: @spacer-lg;
        .amount {
          margin-top: -5px;
        }
      }
    }

    .actions {
      .ant-btn {
        margin-top: @spacer-xs;
      }
    }
  }
}
</style>
