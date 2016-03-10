/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {TransactionList, AddNoteAndMarkTransactionsRequest} from '../common';

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
    export = (params) : Promise<> => {
        // zkontrolovat, pravděpodobně nebude fungovat
        return CSCoreSDK.ResourceUtils.CallCreateWithSuffix(this, 'export', params);
    }
}

/**
 * Add or change a client's personal note and mark/star the card transaction as favorite/important
 */ 
export class CardTransactionResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionsRequest, TransactionList> {
    
}