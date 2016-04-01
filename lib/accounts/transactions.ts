/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {AddNoteAndMarkTransactionsRequest, AddNoteAndMarkTransactionsResponse, ExportTransactionsParameters} from '../common';

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
    
    /**
    * Exports transaction history into signed pdf
    */
    export = (params: ExportTransactionsParameters): Promise<{}> => {
        this._path = this.getPath().replace('/my', '/cz/my');
        return this._client.callApi(this._path + '/export', 'POST', params, null, null);
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