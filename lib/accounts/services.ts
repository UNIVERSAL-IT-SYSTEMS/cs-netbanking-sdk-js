/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

export interface ServiceList extends CSCoreSDK.PaginatedListResponse<Service> {}

export interface Service {
    id: string,
    nameI18N: string,
    iconGroup: string,
    dateFrom?: Date,
    dateTo?: Date   
}