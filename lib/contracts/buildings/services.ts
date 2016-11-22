/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {ServiceList, Service, ServiceParameters} from '../../accounts/services';

export class BuildingsContractsServicesResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<Service> {

    constructor(basePath: string, client: CSCoreSDK.WebApiClient) {
        super(basePath, client);
        
        this._path = this.getPath().replace('/my', '/cz/my');
    }

    /**
     * Returns list of services which are connected or arranged for building saving product instance.
     */
    list = (params?: ServiceParameters): Promise<ServiceList> => {
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'services', params, response => {
            CSCoreSDK.EntityUtils.addDatesToItems(['dateFrom', 'dateTo'], response);

            return response;
        });
    }
}