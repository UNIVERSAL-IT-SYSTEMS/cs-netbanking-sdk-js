/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {AccountNumber} from '../common';

/**
* Get currently available booking date
*/
export class PaymentsBookingDateResource extends CSCoreSDK.Resource
implements CSCoreSDK.UpdateEnabled<PaymentBookingDateRequest, PaymentBookingDateResponse> {
    
    /**
    * Returns current available booking date based on the provided account and optional payment order category parameters
    */  
    update = (payload: PaymentBookingDateRequest): Promise<PaymentBookingDateResponse> => {
        
        // get account's ID from passed object
        var accountId = payload.accountId;
        delete payload.accountId;
        
        // add accountId to query
        this._path = `${this.getPath()}?accountId=${accountId}`;
        
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(bookingDate => {
            
            CSCoreSDK.EntityUtils.addDatesFromISO('bookingDate', bookingDate);
            return bookingDate;
        })
    }
}

export interface PaymentBookingDateRequest {
    
    accountId: string;
    /**
    * Receiver's account number
    */
    receiver?: AccountNumber;
    
    /**
    * Payment order priority selected by user, ENUM values: URGENT (for express payments), STANDARD.
    */
    priority?: string;
}

export interface PaymentBookingDateResponse {
    
    /**
    * booking date value for provided account ID and payment order.
    */
    bookingDate: Date;
}