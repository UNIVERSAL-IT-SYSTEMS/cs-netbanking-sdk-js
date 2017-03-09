import * as CSCoreSDK from 'cs-core-sdk';
import { Amount } from '../common';

/**
 * Get information about the account's balance
 * @class AccountBalanceResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.GetEnabled<AccountBalance>}
 */
export class AccountBalanceResource extends CSCoreSDK.Resource
  implements CSCoreSDK.GetEnabled<AccountBalance> {

  /**
   * Fetches the balance and returns them in a promise
   * @returns {Promise<AccountBalance>}
   */
  get = (): Promise<AccountBalance> => {
    return CSCoreSDK.ResourceUtils.CallGet(this, null);
  }
}

/**
 * @interface AccountBalance
 */
export interface AccountBalance {

  /**
  * Account balance for Current, Saved amount for Saving, Principal Outstanding for Loan/Mortgage.
  */
  balance: Amount;

  /**
  * Disposable balance for Current account.
  */
  disposable?: Amount;

  /**
  * Overdraft amount for Current account.
  */
  overdraft?: Amount;
}