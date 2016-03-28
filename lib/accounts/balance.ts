/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount} from '../common';

/**
* Get information about the account's balance
*/
export class AccountsBalanceResource extends CSCoreSDK.Resource
implements CSCoreSDK.GetEnabled<AccountsBalance> {
    
    /**
    * Fetches the balance and returns them in a promise
    */
    get = (): Promise<AccountsBalance> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null);
    }
}

export interface AccountsBalance {
    
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