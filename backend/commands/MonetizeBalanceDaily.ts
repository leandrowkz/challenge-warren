import { BaseCommand } from '@adonisjs/ace'
import Wallet from 'App/Models/Wallet'
import WalletService from 'App/Services/WalletService'

export default class MonetizeBalanceDaily extends BaseCommand {
  /**
	 * Command Name is used to run the command
	 */
  public static commandName = 'monetize:balance:daily'

  /**
	 * Command Name is displayed in the "help" output
	 */
  public static description = 'Monetize all wallet balances.'

  /**
   * Command settings.
   */
  public static settings = {
    loadApp: true,
  }

  /**
   * Run command, monetize all wallets.
   */
  public async run () {
    const wallets = await Wallet.all()
    await Promise.all(
      wallets.map(async (wallet: Wallet) => {
        console.log(`Monetizing wallet ${wallet.id} AG: ${wallet.ag} - CC: ${wallet.cc}`)
        await WalletService.monetizeBalance(wallet)
      })
    )
  }
}
