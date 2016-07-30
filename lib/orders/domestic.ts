/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount, AccountNumber, Symbols} from '../common';
import {Info, Payment} from './orders';

/**
* Create domestic payment order
*/
export class PaymentsDomesticResource extends CSCoreSDK.Resource
implements CSCoreSDK.CreateEnabled<DomesticPaymentCreateRequest, DomesticPaymentResponse> {
    
    /**
    * Creates domestic payment order and returns it in promise
    */
    create = (payload: DomesticPaymentCreateRequest): Promise<DomesticPaymentResponse> => {
        
        // transform Date object to ISO strings
        CSCoreSDK.EntityUtils.transformDatesToISO('transferDate', payload);
        
        return CSCoreSDK.ResourceUtils.CallCreate(this, payload).then(response => {
            
            // transform ISO dates to native Date objects
            CSCoreSDK.EntityUtils.addDatesFromISO(['cz-orderingDate', 'executionDate', 'modificationDate', 'transferDate'], response);
            
            // Remove signInfo from response and add SigningObject with key signing
            CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), `${this.getClient().getPath()}/orders/payments/${(<DomesticPaymentResponse>response).id}`);
            
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
implements CSCoreSDK.UpdateEnabled<DomesticPaymentUpdateRequest, DomesticPaymentResponse> {
    
    /**
    * Updates domestic payment and returns it in promise
    */
    update = (payload: DomesticPaymentUpdateRequest): Promise<DomesticPaymentResponse> => {
        
        // add ID to payload from resource id property
        (<FullDomesticPaymentUpdateRequest>payload).id = this._id;
        
        // transform Date object to ISO strings
        CSCoreSDK.EntityUtils.transformDatesToISO('transferDate', payload);
        
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {
            
            // transform ISO dates to native Date objects
            CSCoreSDK.EntityUtils.addDatesFromISO(['cz-orderingDate', 'executionDate', 'modificationDate', 'transferDate'], response);
            
            // Remove signInfo from response and add SigningObject with key signing
            CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), `${this.getClient().getPath()}/orders/payments/${(<DomesticPaymentResponse>response).id}`);
            
            return response;
        });
    }
}

export interface FullDomesticPaymentUpdateRequest extends DomesticPaymentUpdateRequest {
    
    /**
    * Internal identifier of payment order. Note that after signing of the order the id could change.
    */
    id: string;
}

export interface DomesticPaymentUpdateRequest extends DomesticPaymentCreateRequest {
    
    /**
    * Status of the payment order (details above), State of payment order presented to user on FE). Possible values: OPEN, SPOOLED, CANCELLED, CLOSED and DELETED
    */
    state?: string;
    
    /**
    * State detail of payment order provided based on BE technical states.
    */
    stateDetail?: string;
    
    /**
    * Indicator whether state (stateDetail value) of payment order is OK from user point of view. For mapping between stateDetail and stateOk indicator values see table below.
    */
    stateOk?: boolean;
}

export interface DomesticPaymentResponse extends Payment, CSCoreSDK.Signable {}

export interface DomesticPaymentCreateRequest {
    
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

export interface DomesticPaymentAccount {
    
    /**
    * Account number with possible prefix. Format is "XXXXXX-NNNNNNNNNN" if prefix is not null or "000000". If prefix is not provided then format is "NNNNNNNNNN" without leading zeros.
    */
    number: string;
    
    /**
    * Bank Code
    */
    bankCode: string;
    
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