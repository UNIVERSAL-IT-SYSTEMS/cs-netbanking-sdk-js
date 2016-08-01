/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount, AccountNumber} from '../../common';

export class InsurancesContractTaxBenefitsResource extends CSCoreSDK.Resource
implements CSCoreSDK.GetEnabled<TaxBenefits> {

    get = (): Promise<TaxBenefits> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null);
    }
}

export interface TaxBenefits {

    /**
     * Tax deductable premium.
     */
    taxDeductiblePremium?: Amount;

    /**
     * Recommended extraordinary deposit for maximum tax deduction.
     */
    recommendedDeposit?: Amount;

    /**
     * Explanatory text for recommended extraordinary deposit. Available only in CZ language.
     */
    recommendedDepositText?: string;

    /**
     * Contains data that should be prefilled to domestic payment form.
     */
    paymentTemplate?: {

        /**
         * The date when thi event has been reported
         */
        symbols?: {

            /**
             * Variable symbol for the payment template.
             */
            variableSymbol?: string;
        }

        /**
         * Receiver's account number of the payment.
         */
        receiver?: AccountNumber;
    }
}