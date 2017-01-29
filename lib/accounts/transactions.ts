
import * as CSCoreSDK from 'cs-core-sdk';
import {AddNoteAndMarkTransactionRequest, AddNoteAndMarkTransactionResponse, ExportTransactionsParameters} from '../common';

/**
* Get individual AccountsTransactionsResource
*/
export class AccountTransactionsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<AccountTransactionResource> {
    
    /**
    * Returns individual AccountsTransactionResource with a given id
    */
    withId = (id: string|number) : AccountTransactionResource => {
        return new AccountTransactionResource(id, this.getPath(), this._client);
    }
    
    /**
    * Exports transaction history into signed pdf
    */
    export = (params: ExportTransactionsParameters): Promise<{}> => {
        
        // transform "fields" parameter to comma separated list from array
        CSCoreSDK.EntityUtils.transformArrayParamsToString(params, 'fields');
        
        // transform Date objects to ISO strings
        CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);
        
        // insert 'cz' resource into the resource's path once because the api requires it in some resources
        var path = this.getPath().replace('/my', '/cz/my');   
        
        return this._client.callApi(`${path}/export`, 'POST', params, null, null, 'arraybuffer');
    }
}

/**
* Allows to add or change a client's personal transaction note and mark the transaction as favorite/important for one specific transaction on selected account.
*/
export class AccountTransactionResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionRequest, AddNoteAndMarkTransactionResponse> {
    
    /**
    * Adds, changes of marks transaction
    */  
    update = (payload: AddNoteAndMarkTransactionRequest): Promise<AddNoteAndMarkTransactionResponse> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
    }
}