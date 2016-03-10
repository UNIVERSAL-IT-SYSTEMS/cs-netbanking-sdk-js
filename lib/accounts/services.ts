/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

/**
* Get information about the account's services
*/
export class AccountsServicesResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<Service> {
    
    /**
    * Fetches the services and returns them in a promise
    */
    list = (params?: ServicesParameters): Promise<ServiceList> => {
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'services', params, response => {
            
            // transform ISO dates to native Date objects
            response.items.forEach(item => {
                CSCoreSDK.EntityUtils.addDatesFromISO(['dateFrom', 'dateTo'], item);
            });
            return response;
        });
    }
}

export interface ServiceList extends CSCoreSDK.PaginatedListResponse<Service> {}

export interface Service {
    
    /**
    * Service identifier.
    */
    id: string,
    
    /**
    * Localized name of the service.
    */
    nameI18N: string,
    
    /**
    * Information about service group. There is an icon defined for every group.
    */
    iconGroup: string,
    
    /**
    * Service is active from date.
    */
    dateFrom?: Date,
    
    /**
    * Service will be active till date.
    */
    dateTo?: Date   
}

export interface ServicesParameters extends CSCoreSDK.Paginated {}