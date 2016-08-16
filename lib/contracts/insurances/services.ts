/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

export class InsurancesContractServicesResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<any> {

    constructor(basePath: string, client: CSCoreSDK.WebApiClient) {    
        super(basePath, client);
        
        // insert 'cz' resource into the resource's path because the api requires it in some resources
        this._path = this.getPath().replace('/my', '/cz/my');
    }

    list = (): Promise<any> => {
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'services');
    }
}