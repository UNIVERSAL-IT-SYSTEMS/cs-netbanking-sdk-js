import * as CSCoreSDK from 'cs-core-sdk';
import { Amount, AccountNumber } from '../../common';

/**
 * @class InsurancesContractTaxBenefitsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.GetEnabled<TaxBenefit>}
 */
export class InsurancesContractTaxBenefitsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.GetEnabled<TaxBenefit> {

  /**
   * @param {string} basePath
   * @param {CSCoreSDK.WebApiClient} client 
   */
  constructor(basePath: string, client: CSCoreSDK.WebApiClient) {
    super(basePath, client);

    // insert 'cz' resource into the resource's path because the api requires it in some resources
    this._path = this.getPath().replace('/my', '/cz/my');
  }

  /**
   * Returns tax benefits for the life insurance
   * @returns {Promise<TaxBenefit>}
   */
  get = (): Promise<TaxBenefit> => {
    return CSCoreSDK.ResourceUtils.CallGet(this, null);
  }
}

/**
 * @interface TaxBenefit
 */
export interface TaxBenefit {

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