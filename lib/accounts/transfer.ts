/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount} from '../common';

/**
* Revolve a loan
*/
export class AccountTransferResource extends CSCoreSDK.Resource
implements CSCoreSDK.UpdateEnabled<TransferRequest, TransferResponse> {
    
    constructor(basePath: string, client: CSCoreSDK.WebApiClient) {    
        super(basePath, client);
        
        // insert 'cz' resource into the resource's path because the api requires it in some resources
        this._path = this.getPath().replace('/my', '/cz/my');
    }
    
    /**
    * Revolves the loan. Currently only REVOLVING_LOAN subtype is supported.
    */  
    update = (payload: TransferRequest): Promise<TransferResponse> => {
        
        // transform Date objects to ISO strings
        CSCoreSDK.EntityUtils.transformDatesToSimpleISO('transferDate', payload);
        
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {
            
            CSCoreSDK.SigningUtils.createSingingObject(<CSCoreSDK.HasSignInfo>response, this.getClient(), this.getPath());
            return response;
        })
    }
}

export interface TransferResponse extends CSCoreSDK.Signable {}

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