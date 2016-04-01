/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {AddNoteAndMarkTransactionsRequest, AddNoteAndMarkTransactionsResponse, ExportTransactionsParameters} from '../common';

/**
* Allows to add or change a client's personal note and mark/star the card transaction as favorite/important for one specific transaction
*/
export class CardTransactionsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<CardTransactionResource> {
    
    /**
     * Returns CardTransactionResource for a given id
     */
    withId = (id: string) : CardTransactionResource => {
        return new CardTransactionResource(id, this.getPath(), this._client);
    }
    
    /**
     * Export transactions to PDF
     */ 
    export = (params: ExportTransactionsParameters) : Promise<any> => {
        
        // insert 'cz' resource into the resource's path because the api requires it in some resources
        this._path = this.getPath().replace('/my', '/cz/my');
        return this._client.callApi(this._path + '/export', 'POST', params, null, null);
    }
}

/**
 * Add or change a client's personal note and mark/star the card transaction as favorite/important
 */ 
export class CardTransactionResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionsRequest, AddNoteAndMarkTransactionsResponse> {
    
    /**
    * Adds, changes of marks transaction
    */ 
    update = (payload: AddNoteAndMarkTransactionsRequest): Promise<AddNoteAndMarkTransactionsResponse> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
    }
}