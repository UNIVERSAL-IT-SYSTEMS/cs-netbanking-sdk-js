/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {AccountNumber} from '../common';

export interface PaymentOrderBookingDateRequest {
    
    /**
    * Receiver's account number
    */
    receiver?: AccountNumber,
    
    /**
    * Payment order priority selected by user, ENUM values: URGENT (for express payments), STANDARD.
    */
    priority?: string
}

export interface PaymentOrderBookingDateResponse {
    
    /**
    * booking date value for provided account ID and payment order.
    */
    bookingDate: Date
}