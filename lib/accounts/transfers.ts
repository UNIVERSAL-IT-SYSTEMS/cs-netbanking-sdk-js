/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Signable, Amount} from '../common';

/**
* Revolve a loan
*/
export class AccountsTransfersResource extends CSCoreSDK.Resource
implements CSCoreSDK.UpdateEnabled<TransferRequest, TransferResponse> {
    
    /**
    * Revolves the loan. Currently only REVOLVING_LOAN subtype is supported.
    */  
    update = (payload: TransferRequest): Promise<TransferResponse> => {
        return CSCoreSDK.ResourceUtils.CallCreate(this, payload);
    }
}

export interface TransferResponse extends Signable {}

export interface TransferRequest {
    
   /**
    * Type of the transfer. Currently only REVOLVING_LOAN_DISBURSEMENT is supported.
    */
    type: string;
    
    /**
    * Amount which should be transfered.
    */
    amount: Amount;
    
    /**
    * Payment transfer date.
    */
    transferDate: Date;
    
    /**
    * Note for the recipient.
    */
    recipientNote?: string;
}