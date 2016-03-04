/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Person} from './orders';

export interface PaymentOrderBookingDateRequest {
    receiver?: Person,
    priority?: string
}

export interface PaymentOrderBookingDateResponse {
    bookingDate: Date
}