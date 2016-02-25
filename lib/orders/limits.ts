import {Amount} from '../accounts/accounts';

export interface OrdersLimitsListing {
    remainingLimits: [Limit]
}

export interface Limit {
    authorizationType: string,
    channelId: string,
    applicationId: string,
    remainingAmount: Amount   
}