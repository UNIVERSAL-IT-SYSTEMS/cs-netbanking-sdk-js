/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {AccountNumber} from '../common';

export class PaymentsBookingDateResource extends CSCoreSDK.Resource
implements CSCoreSDK.UpdateEnabled<PaymentBookingDateRequest, PaymentBookingDateResponse> {
    
}

export interface PaymentBookingDateRequest {
    
    /**
    * Receiver's account number
    */
    receiver?: AccountNumber,
    
    /**
    * Payment order priority selected by user, ENUM values: URGENT (for express payments), STANDARD.
    */
    priority?: string
}

export interface PaymentBookingDateResponse {
    
    /**
    * booking date value for provided account ID and payment order.
    */
    bookingDate: Date
}