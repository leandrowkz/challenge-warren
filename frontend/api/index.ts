import { NuxtAxiosInstance } from '@nuxtjs/axios'
import AuthAPI from '~/api/AuthAPI'
import UserAPI from '~/api/UserAPI'
import TransactionAPI from '~/api/TransactionAPI'
import WalletAPI from '~/api/WalletAPI'

export default class API {
  public auth: AuthAPI
  public transaction: TransactionAPI
  public user: UserAPI
  public wallet: WalletAPI

  constructor(axios: NuxtAxiosInstance) {
    this.auth = new AuthAPI(axios)
    this.transaction = new TransactionAPI(axios)
    this.user = new UserAPI(axios)
    this.wallet = new WalletAPI(axios)
  }
}
