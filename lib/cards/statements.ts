/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {StatementList, Statement} from '../common';

export class CardAccountsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<CardAccountResource> {
    
    withId = (id: string): CardAccountResource => {
        return new CardAccountResource(id, this.getPath(), this._client);
    }
} 

export class CardAccountResource extends CSCoreSDK.InstanceResource {
    
    get statements() {
        return new CardStatementsResource(this.getPath() + '/statements', this._client); 
    }
}

export class CardStatementsResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<Statement> {
    
    list = (params?) : Promise<StatementList> => {
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'statements', params);
    }
    
    // zkontrolovat, zřejmě nebude fungovat
    download = (params) => {
        return CSCoreSDK.ResourceUtils.CallCreateWithSuffix(this, 'signed/download', params);
    }
}