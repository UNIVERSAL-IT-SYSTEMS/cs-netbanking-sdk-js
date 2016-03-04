/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount} from '../common';

export interface OrdersLimitList extends CSCoreSDK.PaginatedListResponse<Limit> {}

export interface Limit {
    authorizationType: string,
    channelId: string,
    applicationId: string,
    remainingAmount: Amount   
}