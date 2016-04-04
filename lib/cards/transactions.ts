/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {AddNoteAndMarkTransactionsRequest, ExportTransactionsParameters, Transaction} from '../common';

/**
* Allows to add or change a client's personal note and mark/star the card transaction as favorite/important for one specific transaction
*/
export class CardsTransactionsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<CardsTransactionResource> {
    
    /**
     * Returns CardTransactionResource for a given id
     */
    withId = (id: string) : CardsTransactionResource => {
        return new CardsTransactionResource(id, this.getPath(), this._client);
    }
    
    /**
     * Export transactions to PDF
     */ 
    export = (params: ExportTransactionsParameters) : Promise<any> => {
        
        // transform Date objects to ISO strings
        CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);
        
        // insert 'cz' resource into the resource's path because the api requires it in some resources
        this._path = this.getPath().replace('/my', '/cz/my');
        
        return this._client.callApi(this._path + '/export', 'POST', params, null, null);
    }
}

/**
 * Add or change a client's personal note and mark/star the card transaction as favorite/important
 */ 
export class CardsTransactionResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionsRequest, AddNoteAndMarkCardsTransactionsResponse> {
    
    /**
    * Adds, changes of marks transaction
    */ 
    update = (payload: AddNoteAndMarkTransactionsRequest): Promise<AddNoteAndMarkCardsTransactionsResponse> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
    }
}

export interface AddNoteAndMarkCardsTransactionsResponse {
    cardTransaction: Transaction;
}