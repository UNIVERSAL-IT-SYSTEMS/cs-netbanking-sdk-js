/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Signed, TransactionList, Transaction} from '../common';

/**
* Get individual AccountsTransactionsResource
*/
export class AccountsTransactionsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<AccountsTransactionResource> {
    
    /**
    * Returns individual AccountsTransactionResource with a given id
    */
    withId = (id: string|number) : AccountsTransactionResource => {
        return new AccountsTransactionResource(id, this.getPath(), this._client);
    }
}

export class AccountsTransactionResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.UpdateEnabled<> {
    
}