/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Signed, TransactionList, Transaction, Parameters, AddNoteAndMarkTransactionsRequest, AddNoteAndMarkTransactionsResponse} from '../common';

/**
* Get individual AccountsTransactionsResource
*/
export class AccountsTransactionsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<AccountsTransactionResource>,
CSCoreSDK.ListEnabled<Transaction> {
    
    /**
    * Returns list of transactions
    */
    list = (params?: Parameters): Promise<TransactionList> => {
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'transactions', params, response => {
            
            CSCoreSDK.EntityUtils.addDatesToItems(['bookingDate', 'valuationDate', 'transactionDate'], response);
            
            return response;
        });
    }
    
    /**
    * Returns individual AccountsTransactionResource with a given id
    */
    withId = (id: string|number) : AccountsTransactionResource => {
        return new AccountsTransactionResource(id, this.getPath(), this._client);
    }
    
    // nebude fungovat
    export = (params): Promise<{}> => {
        return CSCoreSDK.ResourceUtils.CallCreateWithSuffix(this, 'export', params);
    }
}

/**
* Allows to add or change a client's personal transaction note and mark the transaction as favorite/important for one specific transaction on selected account.
*/
export class AccountsTransactionResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionsRequest, AddNoteAndMarkTransactionsResponse> {
    
    /**
    * Adds, changes of marks transaction
    */  
    update = (payload: AddNoteAndMarkTransactionsRequest): Promise<AddNoteAndMarkTransactionsResponse> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
    }
}