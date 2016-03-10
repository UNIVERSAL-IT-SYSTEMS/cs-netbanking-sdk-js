/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {AccountNumber, Amount, Signed} from '../common';

/**
 * Resource for paying up credit card debt  
 */ 
export class CardTransfersResource extends CSCoreSDK.Resource
implements CSCoreSDK.UpdateEnabled<PayUpCreditCardRequest, PayUpCreditCardResponse> {
    
}

export interface PayUpCreditCardRequest {
    
    /**
    * Type of the transfer. Currently only DEBT_REPAYMENT is supported.
    */
    type: string,
    
    /**
    * Information about the sender
    */
    sender: Sender,
    
    /**
    * Amount which should be transfered.
    */
    amount: Amount    
}

export interface Sender {
    
    /**
    * Identification of the source account for the transfer.
    */
    id?: string,
    
    /**
    * Account number of the source account for the transfer.
    */
    accountno: AccountNumber
}

export interface PayUpCreditCardResponse extends Signed {}