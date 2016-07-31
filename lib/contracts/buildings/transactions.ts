/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {SecurityTransactionRequest, SecurityTransactionResponse} from '../../securities/transactions';
import {ExportTransactionsParameters} from '../../common';

export class BuildingsContractsTransactionsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<BuildingsContractsTransactionResource> {

    constructor(basePath: string, client: CSCoreSDK.WebApiClient) {
        super(basePath, client);
        
        this._path = this.getPath().replace('/my', '/cz/my');
    }

    withId = (id: string): BuildingsContractsTransactionResource => {
        return new BuildingsContractsTransactionResource(id, this.getPath(), this.getClient());
    }

    export = (params: ExportTransactionsParameters): Promise<any> => {
        
        // transform "fields" parameter to comma separated list from array
        CSCoreSDK.EntityUtils.transformArrayParamsToString(params, 'fields');
        
        // transform Date objects to ISO strings
        CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);   
        
        return this._client.callApi(`${this.getPath()}/export`, 'POST', params, null, null, 'arraybuffer');
    }
}

export class BuildingsContractsTransactionResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.UpdateEnabled<SecurityTransactionRequest, SecurityTransactionResponse> {

    update = (payload: SecurityTransactionRequest): Promise<SecurityTransactionResponse> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
    }
}