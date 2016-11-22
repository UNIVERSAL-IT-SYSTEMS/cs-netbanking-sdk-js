/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount, AccountNumber} from '../../common';

export class InsurancesContractTransferResource extends CSCoreSDK.Resource
implements CSCoreSDK.UpdateEnabled<UpdateContractTrasferRequest, UpdateContractTrasferResponse> {

    constructor(basePath: string, client: CSCoreSDK.WebApiClient) {    
        super(basePath, client);
        
        // insert 'cz' resource into the resource's path because the api requires it in some resources
        this._path = this.getPath().replace('/my', '/cz/my');
    }

    /**
     * Creates insurance transfer - premium payment, extra deposit or recommended deposit.
     */
    update = (payload: UpdateContractTrasferRequest): Promise<UpdateContractTrasferResponse> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {

            CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), this.getPath());

            return response;
        });
    }
}

export interface UpdateContractTrasferRequest {

    /**
     * Type of the transfer. Possible values are PAY_PREMIUM, EXTRA_DEPOSIT, RECOMMENDED_DEPOSIT.
     */
    type: string;

    /**
     * Amount which should be transfered.
     */
    amount: Amount;

    /**
     * Sender account.
     */
    sender: AccountNumber;
}

export interface UpdateContractTrasferResponse extends CSCoreSDK.Signable {}