/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount, Signed} from '../common';
import {Confirmation} from './delivery';

export interface LimitList extends CSCoreSDK.PaginatedListResponse<Limit> {}

export interface Limit {
    limitType: string,
    limitPeriod: string,
    limit?: Amount,
    temporaryLimit?: Amount,
    bankLimit?: Amount,
    temporaryLimitExpiration?: Date
}

// dva array v response
export interface ChangeCardLimitsResponse extends LimitList, Signed {
    confirmations?: [Confirmation],
}

// dva array v response
export interface ChangeCardLimitsRequest extends LimitList {
    confirmations?: [Confirmation],
}