/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {TransactionList, AddNoteAndMarkTransactionsRequest} from '../common';

export class CardTransactionsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<CardTransactionResource> {
    
    withId = (id: string) : CardTransactionResource => {
        return new CardTransactionResource(id, this.getPath(), this._client);
    }
    
    // zkontrolovat, pravděpodobně nebude fungovat
    export = (params) : Promise<> => {
        return CSCoreSDK.ResourceUtils.CallCreateWithSuffix(this, 'export', params);
    }
}

export class CardTransactionResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionsRequest, TransactionList> {
    
}