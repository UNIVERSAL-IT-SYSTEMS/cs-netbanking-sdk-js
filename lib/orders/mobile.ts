/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount, Signed, AccountNumber} from '../common';

/**
* Recharging the credit available on prepaid cards provided by Vodafone, T-Mobile or O2.
*/
export class PaymentsMobileResource extends CSCoreSDK.Resource
implements CSCoreSDK.CreateEnabled<MobilePaymentsRequest, MobilePaymentsResponse> {
    
}

export interface MobilePaymentsRequest {
    
    /**
    * Type of mobile payment depending on provider of mobile services. Possible values: TOP_UP (for all operators) and INVOICE, VODAFONE_PAYMENT, MOBILE_DEPOSIT (for Vodafone).
    */
    paymentType: string;
    
    /**
    * Phone number.
    */
    phoneNumber: string;
    
    /**
    * Sender name
    */
    sender: AccountNumber;
    
    /**
    * Payment amount.
    */
    amount: Amount;
    
    /**
    * Invoice number used as identifier of mobile payment on mobile service provider side (only for paymentType: INVOICE).
    */
    invoiceNumber?: string;
    
    /**
    * Phone number used for sending of confirmation of mobile payment execution. Not available for paymentType: INVOICE.
    */
    confirmationPhoneNumber: string;   
}

export interface MobilePaymentsResponse extends MobilePaymentsRequest, Signed {}