/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {SecurityTransactionRequest, SecurityTransactionResponse} from '../securities/transactions';
import {ExportTransactionsParameters} from '../common';

export class ContractsTransactionsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<ContractsTransactionResource> {

    constructor(basePath: string, client: CSCoreSDK.WebApiClient) {
        super(basePath, client);
        
        this._path = this.getPath().replace('/my', '/cz/my');
    }

    withId = (id: string): ContractsTransactionResource => {
        return new ContractsTransactionResource(id, this.getPath(), this.getClient());
    }

    export = (params: ExportTransactionsParameters): Promise<any> => {
        
        // transform "fields" parameter to comma separated list from array
        CSCoreSDK.EntityUtils.transformArrayParamsToString(params, 'fields');
        
        // transform Date objects to ISO strings
        CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);   
        
        return this._client.callApi(`${this.getPath()}/export`, 'POST', params, null, null, 'arraybuffer');
    }
}

export class ContractsTransactionResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.UpdateEnabled<SecurityTransactionRequest, SecurityTransactionResponse> {

    update = (payload: SecurityTransactionRequest): Promise<SecurityTransactionResponse> => {
        (<any>payload).id = this._id;
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
    }
}