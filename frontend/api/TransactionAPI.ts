import BaseAPI from '@/api/BaseAPI'

export default class TransactionAPI extends BaseAPI {
  /**
   * Attempt to get current user wallet transactions.
   */
  fetchWalletTransactions({ filters }: any) {
    console.log(filters)
    return this.http.get('/transactions/history', { params: { ...filters } })
  }

  /**
   * Attempt to make a deposit.
   */
  deposit({ data }: any) {
    return this.http.post('/transactions/deposit', data)
  }

  /**
   * Attempt to make a transfer.
   */
  transfer({ data }: any) {
    return this.http.post('/transactions/transfer', data)
  }

  /**
   * Attempt to make a payment.
   */
  payment({ data }: any) {
    return this.http.post('/transactions/payment', data)
  }

  /**
   * Attempt to make a withdraw.
   */
  withdraw({ data }: any) {
    return this.http.post('/transactions/withdraw', data)
  }
}
