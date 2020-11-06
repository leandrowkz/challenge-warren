import BaseAPI from '@/api/BaseAPI'

export default class WalletAPI extends BaseAPI {
  /**
   * Attempt to get current user wallet.
   */
  fetchUserWallet() {
    return this.http.get('/wallets')
  }
}
