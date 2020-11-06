<template>
  <AppCard class="wallet-hint-card">
    <div class="header">Funcionalidades de teste!</div>
    <div class="body">
      <div class="message">
        Você está usando uma conta de testes. Isso quer dizer que tanto o saldo
        apresentado quanto as operações de depósito, transferência, pagamento e
        saque não refletem a realidade, ok?
      </div>
      <div class="image">
        <img src="~/assets/img/img-rocket.svg" class="img-fluid" />
      </div>
    </div>
  </AppCard>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState('wallet', ['userWallet']),
}
</script>

<style lang="less">
.wallet-hint-card {
  height: 185px;
  background: linear-gradient(
    45deg,
    darken(@primary-color, 15%),
    lighten(@primary-color, 5%),
    lighten(@primary-color, 20%)
  );
  overflow: hidden;

  .header {
    margin-bottom: @spacer-xs;
    color: #fff;
    font-size: @font-size-sm;
    font-weight: bold;
  }

  .body {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .message {
      z-index: 1;
      position: relative;
      color: lighten(@text-color-muted, 30%);
      padding-right: 70px;
      font-size: 13px;
    }
  }

  .image {
    max-width: 200px;
    position: absolute;
    top: 20px;
    right: -40px;
  }

  @media only screen and (max-width: 600px) {
    height: auto;
  }
}
</style>
