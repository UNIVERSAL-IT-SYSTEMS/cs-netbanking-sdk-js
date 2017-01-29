
import * as CSCoreSDK from 'cs-core-sdk';
import {AccountNumber, Amount} from '../common';

/**
 * Resource for paying up credit card debt  
 */ 
export class CardTransferResource extends CSCoreSDK.Resource
implements CSCoreSDK.UpdateEnabled<PayUpCreditCardRequest, PayUpCreditCardResponse> {
    
    /**
     * Pays up the credit card debt and returns sign info  
     */ 
    update = (payload: PayUpCreditCardRequest): Promise<PayUpCreditCardResponse> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {
            
            // Remove signInfo from response and add SigningObject with key signing
            CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), this.getPath());
            
            return response;
        })
    }
}

export interface PayUpCreditCardRequest {
    
    /**
    * Type of the transfer. Currently only DEBT_REPAYMENT is supported.
    */
    type: string;
    
    /**
    * Information about the sender
    */
    sender: Sender;
    
    /**
    * Amount which should be transfered.
    */
    amount: Amount;   
}

export interface Sender {
    
    /**
    * Identification of the source account for the transfer.
    */
    id?: string;
    
    /**
    * Account number of the source account for the transfer.
    */
    accountno: AccountNumber;
}

export interface PayUpCreditCardResponse extends CSCoreSDK.Signable {}