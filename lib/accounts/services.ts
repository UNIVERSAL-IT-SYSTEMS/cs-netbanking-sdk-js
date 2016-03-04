/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

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