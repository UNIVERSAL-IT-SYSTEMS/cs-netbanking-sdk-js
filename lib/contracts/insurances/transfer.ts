/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount, AccountNumber} from '../../common';

export class InsurancesContractTransferResource extends CSCoreSDK.Resource
implements CSCoreSDK.UpdateEnabled<UpdateContractTrasferRequest, UpdateContractTrasferResponse> {

    update = (payload: UpdateContractTrasferRequest): Promise<UpdateContractTrasferResponse> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
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