/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount} from '../common';

export interface ReservationList extends CSCoreSDK.PaginatedListResponse<Reservation> {}

export interface Reservation {
    type: string,
    status: string,
    creationDate: Date,
    expirationDate?: Date,
    // cz-merchantAddress?: string,
    description: string,
    amount: Amount,
    amountSender?: Amount     
}