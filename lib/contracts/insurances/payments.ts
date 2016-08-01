/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import{Amount} from '../../common';

export class InsurancesContractPaymentsResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<ContractPayment> {

    list = (): Promise<ContractPaymentList> => {
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'payments').then(response => {
            CSCoreSDK.EntityUtils.addDatesToItems(['transactionDate', 'instructionFrom', 'instructionTo'], response);

            return response;
        });
    }
}

export interface ContractPaymentList extends CSCoreSDK.ListResponse<ContractPayment> {}

export interface ContractPayment {

    /**
     * Payment identifier. Unique for current insurance.
     */
    id: string;

    /**
     * Type of the payment. Possible values are ORDINARY, ONETIME, EXTRAORDINARY, FUTURE, OVERDUE, WITHDRAWAL, PARTIALLY_PAID, UNKNOWN.
     */
    type: string;

    /**
     * Payment date.
     */
    transactionDate?: Date;

    /**
     * Payment amount. Amount which was received by insurance company.
     */
    amount: Amount;

    /**
     * Rest which should be paid if payment instruction wasn't fully paid by this payment.
     */
    restToPay?: Amount;

    /**
     * Payment instruction amount. Amount which should be paid for particular period.
     */
    instruction?: Amount;

    /**
     * Amount paid by employer (as benefit). It is included in the payment amount.
     */
    employerContribution?: Amount;

    /**
     * Start date of the period for which payment instruction was created.
     */
    instructionFrom?: Date;

    /**
     * End date of the period for which payment instruction was created.
     */
    instructionTo?: Date;

    /**
     * Array of flags for funds.
     */
    flags?: [string];
}