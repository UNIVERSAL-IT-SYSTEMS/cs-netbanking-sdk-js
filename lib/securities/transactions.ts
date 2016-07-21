/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

export class SecurityTransactionsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<SecurityTransactionResource> {


    constructor(basePath: string, client: CSCoreSDK.WebApiClient) {
        super(basePath, client);
        
        this._path = this.getPath().replace('/my', '/cz/my');
    }

    withId = (id: string): SecurityTransactionResource => {
        return new SecurityTransactionResource(id, this.getPath(), this.getClient());
    }

    export = (params: any): Promise<any> => {

        // transform "fields" parameter to comma separated list from array
        CSCoreSDK.EntityUtils.transformArrayParamsToString(params, 'fields');
        
        // transform Date objects to ISO strings
        CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);

        return this._client.callApi(`${this.getPath()}/export`, 'POST', params, null, null, 'arraybuffer');
    }
    
}

export class SecurityTransactionResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.UpdateEnabled<any, any> {

    update = (payload: any): Promise<any> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
    }

}