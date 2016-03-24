/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount, Signable, AccountNumber} from '../common';
import {Info, Symbols, Payment} from './orders';

/**
* Create domestic payment order
*/
export class PaymentsDomesticResource extends CSCoreSDK.Resource
implements CSCoreSDK.CreateEnabled<DomesticPaymentUpdateRequest, DomesticPaymentUpdateResponse> {
    
    /**
    * Creates domestic payment order and returns it in promise
    */
    create = (payload: DomesticPaymentUpdateRequest): Promise<DomesticPaymentUpdateResponse> => {
        return CSCoreSDK.ResourceUtils.CallCreate(this, payload).then(response => {
            
            CSCoreSDK.EntityUtils.addDatesFromISO(['cz-orderingDate', 'executionDate', 'modificationDate', 'transferDate'], response);
            return response;
        });
    }
    
    /**
    * Returns PaymentDomesticResource resource for updating domestic payment
    */
    withId = (id: string): PaymentDomesticResource => {
        return new PaymentDomesticResource(id, this.getPath(), this.getClient());
    }
    
}

/**
* Update domestic payment
*/
export class PaymentDomesticResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.UpdateEnabled<DomesticPaymentUpdateRequest, DomesticPaymentUpdateResponse> {
    
    /**
    * Updates domestic payment and returns it in promise
    */
    update = (payload: DomesticPaymentUpdateRequest): Promise<DomesticPaymentUpdateResponse> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {
            
            CSCoreSDK.EntityUtils.addDatesFromISO(['cz-orderingDate', 'executionDate', 'modificationDate', 'transferDate'], response);
            return response;
        });
    }
}

export interface DomesticPaymentUpdateRequest extends Signable {
    
    /**
    * Internal identifier of payment order. Note that after signing of the order the id could change.
    */
    id?: string;
    
    /**
    * Name of the sender
    */
    senderName: string;
    
    /**
    * Account number of the sender.
    */
    sender: DomesticPaymentAccount;
    
    /**
    * Name of the payee
    */
    receiverName: string;
    
    /**
    * Account number of payee
    */
    receiver: DomesticPaymentAccount;
    
    /**
    * Payment order amount.
    */
    amount: Amount;
    
    /**
    * Optional date (in the future) when this payment has to be done
    */
    transferDate?: Date;
    
    /**
    * Message for payee set during payment order creation. It is used to identify transaction on receiver side. Array of texts 4x35
    */
    additionalInfo?: Info;
    
    /**
    * Message for me set during payment order creation.
    */
    senderReference?: string;
    
    /**
    * Information about the symbols
    */
    symbols?: Symbols;
    
    /**
    * Array of optional Flag values depends on Payment order category, type.
    */
    flags?: [string];
}

export interface DomesticPaymentUpdateResponse extends Payment {}

export interface DomesticPaymentAccount {
    
    /**
    * Account number with possible prefix. Format is "XXXXXX-NNNNNNNNNN" if prefix is not null or "000000". If prefix is not provided then format is "NNNNNNNNNN" without leading zeros.
    */
    number?: string;
    
    /**
    * Bank Code
    */
    bankCode?: string;
    
    /**
    * Code of the Country - 2 characters; mandatoryfor international orders.
    */
    countryCode?: string;
    
    /**
    * IBAN
    */
    "cz-iban"?: string;
    
    /**
    * BIC
    */
    "cz-bic"?: string;
}