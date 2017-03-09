import * as CSCoreSDK from 'cs-core-sdk';
import { InsurancesContractFundsResource } from './funds';
import { InsurancesContractBeneficiariesResource } from './beneficiaries';
import { InsurancesContractInsureesResource } from './insurees';
import { InsurancesContractPaymentsResource } from './payments';
import { InsurancesContractServicesResource } from './services';
import { InsurancesContractEventsResource } from './events';
import { InsurancesContractTaxBenefitsResource } from './tax-benefits';
import { InsurancesContractStrategiesResource } from './strategies';
import { InsurancesContractTransferResource } from './transfer';
import { Amount, AccountNumber, Signable } from '../../common';

/**
 * @class InsurancesContractsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.PaginatedListEnabled<Insurance>}
 * @implements {CSCoreSDK.HasInstanceResource<InsurancesContractResource>}
 */
export class InsurancesContractsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.PaginatedListEnabled<Insurance>, CSCoreSDK.HasInstanceResource<InsurancesContractResource> {

  /**
   * Returns list of life insurances for current user.
   * @param {InsurancesParameters=} params
   * @returns {Promise<InsuranceList>}
   */
  list = (params?: InsurancesParameters): Promise<InsuranceList> => {
    return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'insurances', params, response => {

      response.items.forEach(item => {
        transformDates(item);
        resourcifyInsurance(<Insurance>item, this.withId((<Insurance>item).id));
      });

      return response;
    });
  }

  /**
   * Get the resource of insurance contracts with a given id
   * @param {string} id
   * @returns {InsurancesContractResource}
   */
  withId = (id: string): InsurancesContractResource => {
    return new InsurancesContractResource(id, this.getPath(), this.getClient());
  }
}

/**
 * @class InsurancesContractResource
 * @extends {CSCoreSDK.InstanceResource}
 * @implements {CSCoreSDK.GetEnabled<InsuranceDetail>}
 * @implements {CSCoreSDK.UpdateEnabled<UpdateInsuranceRequest, UpdateInsuranceResponse>}
 */
export class InsurancesContractResource extends CSCoreSDK.InstanceResource
  implements CSCoreSDK.GetEnabled<InsuranceDetail>, CSCoreSDK.UpdateEnabled<UpdateInsuranceRequest, UpdateInsuranceResponse> {

  /**
   * Returns detail of the life insurance
   * @returns {Promise<InsuranceDetail>}
   */
  get = (): Promise<InsuranceDetail> => {

    return this._client.callApi(`${this.getPath().replace('/my', '/cz/my')}/detail`, 'GET').then(response => {
      transformDates(response);
      resourcifyInsurance(<InsuranceDetail>response, this);

      return response;
    });
  }

  /**
   * Allows to change a limited set of insurance settings of one specific contract. Currently only the field alias can be changed. Change only to alias field must not be signed, but response is ready also for signing process.
   * @param {UpdateInsuranceRequest} payload
   * @returns {Promise<UpdateInsuranceResponse>}
   */
  update = (payload: UpdateInsuranceRequest): Promise<UpdateInsuranceResponse> => {
    (<any>payload).id = this._id;

    return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {
      transformDates(response);
      resourcifyInsurance(<InsuranceDetail>response, this);
      CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), this.getPath());

      return response;
    });
  }

  /**
   * Returns funds resource for insurance contract
   * @returns {InsurancesContractFundsResource}
   */
  get funds(): InsurancesContractFundsResource {
    return new InsurancesContractFundsResource(`${this.getPath()}/funds`, this.getClient());
  }

  /**
   * Returns beneficiaries resource for insurance contract
   * @returns {InsurancesContractBeneficiariesResource}
   */
  get beneficiaries(): InsurancesContractBeneficiariesResource {
    return new InsurancesContractBeneficiariesResource(`${this.getPath()}/beneficiaries`, this.getClient());
  }

  /**
   * Returns insurees resource for insurance contract
   * @returns {InsurancesContractInsureesResource}
   */
  get insurees(): InsurancesContractInsureesResource {
    return new InsurancesContractInsureesResource(`${this.getPath()}/insurees`, this.getClient());
  }

  /**
   * Returns payments resource for insurance contract
   * @returns {InsurancesContractPaymentsResource}
   */
  get payments(): InsurancesContractPaymentsResource {
    return new InsurancesContractPaymentsResource(`${this.getPath()}/payments`, this.getClient());
  }

  /**
   * Returns services resource for insurance contract
   * @returns {InsurancesContractServicesResource}
   */
  get services(): InsurancesContractServicesResource {
    return new InsurancesContractServicesResource(`${this.getPath()}/services`, this.getClient());
  }

  /**
   * Returns events resource for insurance contract
   * @returns {InsurancesContractEventsResource}
   */
  get events(): InsurancesContractEventsResource {
    return new InsurancesContractEventsResource(`${this.getPath()}/events`, this.getClient());
  }

  /**
   * Returns taxBenefits resource for insurance contract
   * @returns {InsurancesContractTaxBenefitsResource}
   */
  get taxBenefits(): InsurancesContractTaxBenefitsResource {
    return new InsurancesContractTaxBenefitsResource(`${this.getPath()}/taxBenefits`, this.getClient());
  }

  /**
   * Returns strategies resource for insurance contract
   * @returns {InsurancesContractStrategiesResource}
   */
  get strategies(): InsurancesContractStrategiesResource {
    return new InsurancesContractStrategiesResource(`${this.getPath()}/strategies`, this.getClient());
  }

  /**
   * Returns transfer resource for insurance contract
   * @returns {InsurancesContractTransferResource}
   */
  get transfer(): InsurancesContractTransferResource {
    return new InsurancesContractTransferResource(`${this.getPath()}/transfer`, this.getClient());
  }
}

function transformDates(item) {
  if (item.life) {
    CSCoreSDK.EntityUtils.addDatesFromISO(['contractEndDate', 'contractStartDate', 'contractTerminationDate', 'lastPremiumDate', 'premiumLastPaid'], item.life);
  }
}

function resourcifyInsurance(insurance: Insurance, insuranceReference: InsurancesContractResource) {
  insurance.get = insuranceReference.get;
  insurance.update = insuranceReference.update;
  insurance.funds = insuranceReference.funds;
  insurance.beneficiaries = insuranceReference.beneficiaries;
  insurance.insurees = insuranceReference.insurees;
  insurance.payments = insuranceReference.payments;
  insurance.services = insuranceReference.services;
  insurance.events = insuranceReference.events;
  insurance.taxBenefits = insuranceReference.taxBenefits;
  insurance.strategies = insuranceReference.strategies;
  insurance.transfer = insuranceReference.transfer;
}

/**
 * @interface InsuranceList
 * @extends {CSCoreSDK.PaginatedListResponse<Insurance>}
 */
export interface InsuranceList extends CSCoreSDK.PaginatedListResponse<Insurance> { }

/**
 * @interface Insurance
 * @extends {UpdateInsuranceRequest}
 */
export interface Insurance extends UpdateInsuranceRequest {

  /**
   * Contract number.
   */
  id: string;

  /**
   * Product Type of insurance. ENUM values: LIFE (CSAS supports only this value)
   */
  type: string;

  /**
   * Code of the sVersicherung product.
   */
  product: string;

  /**
   * Name of the sVersicherung product (localised).
   */
  productI18N: string;

  /**
   * The primary holder of the specific insurance contract.
   */
  insurancePolicyHolder: string;

  /**
   * Policy number
   */
  policyNumber: string;

  /**
   * ENUM: ACTIVE, CLOSED
   */
  status: string;

  life?: LifeDetail;

  /**
   * Convenience get method for fetching Insurance detail
   * @returns {Promise<InsuranceDetail>}
   */
  get: () => Promise<InsuranceDetail>;

  /**
   * Convenience update method for updating insurance
   * @param {UpdateInsuranceRequest} payload
   * @returns {Promise<UpdateInsuranceResponse>}
   */
  update: (payload: UpdateInsuranceRequest) => Promise<UpdateInsuranceResponse>;

  /**
   * Convenience getter for Insurance funds
   */
  funds: InsurancesContractFundsResource;

  /**
   * Convenience getter for Insurance beneficiaries
   */
  beneficiaries: InsurancesContractBeneficiariesResource;

  /**
   * Convenience getter for Insurance insurees
   */
  insurees: InsurancesContractInsureesResource;

  /**
   * Convenience getter for Insurance payments
   */
  payments: InsurancesContractPaymentsResource;

  /**
   * Convenience getter for Insurance services
   */
  services: InsurancesContractServicesResource;

  /**
   * Convenience getter for Insurance events
   */
  events: InsurancesContractEventsResource;

  /**
   * Convenience getter for Insurance tax benefits
   */
  taxBenefits: InsurancesContractTaxBenefitsResource;

  /**
   * Convenience getter for Insurance strategies
   */
  strategies: InsurancesContractStrategiesResource;

  /**
   * Convenience getter for Insurance transfer
   */
  transfer: InsurancesContractTransferResource;

}

/**
 * @interface UpdateInsuranceRequest
 */
export interface UpdateInsuranceRequest {

  /**
   * User-specific alias of the contract. Max. 50 characters.
   */
  alias?: string;
}

/**
 * @interface UpdateInsuranceResponse
 * @extends {Insurance}
 * @extends {CSCoreSDK.Signable}
 */
export interface UpdateInsuranceResponse extends Insurance, CSCoreSDK.Signable { }

/**
 * @interface InsuranceDetail
 * @extends {Insurance}
 */
export interface InsuranceDetail extends Insurance {

  /**
   * Additional description of insurance product, additional charges, index applied to insurance contract
   */
  description?: string;


  life?: LifeDetail;
}

/**
 * @interface InsurancesParameters
 * @extends {CSCoreSDK.Paginated}
 */
export interface InsurancesParameters extends CSCoreSDK.Paginated { }

/**
 * @interface Life
 */
export interface Life {


  lastPremiumDate?: Date;

  lastPremiumPaid?: Amount;
  /**
   * Payment Interval. ENUM: ONCE, MONTHLY, QUARTERLY, HALFYEARLY, YEARLY, UNKNOWN
   */
  premiumPaymentInterval: string;

  /**
   * The agreed premium for the specific insurance.
   */
  premium: Amount;

  /**
   * The agreed end dates of the insurance contract.
   */
  contractEndDate?: Date;

  /**
   * The contract start date.
   */
  contractStartDate: Date;

  /**
   * The agreed amount insured or risk covered by the insurance.
   */
  insuredAmount: Amount;

  /**
   * Capital value of the insurance. Amount of money in saving part of the insurance.
   */
  currentCapitalValue?: Amount;

  /**
   * Date of possible contract termination
   */
  contractTerminationDate?: Date;

  /**
   * Array of flags for life insurance extended detail
   */
  flags?: [string];
}

/**
 * @interface LifeDetail
 * @extends {Life}
 */
export interface LifeDetail extends Life {

  /**
   * Reason of possible contract termination
   */
  contractTerminationReason?: string;

  /**
   * In case of CLOSED contract, this means the reason of the termination. This field si localized.
   */
  "cz-contractEndReason"?: string;

  /**
   * Technique for the premium payment
   */
  premiumPaymentMethodI18N?: string;

  /**
   * Date of the last premium payment
   */
  premiumLastPaid?: Date;

  /**
   * Technical interest rate. Value in percentage, e.g. 0,5 will be displayed as 0,5 %.
   */
  technicalInterestRate?: number;

  employerBenefit?: {

    /**
     * frequency of the contribution. ENUM: ONCE, MONTHLY, QUARTERLY, HALFYEARLY, YEARLY, UNKNOWN
     */
    frequency?: string;

    /**
     * Explanatory text to employer contribution. Possible values: WHOLE_PREMIUM, PARTLY_PAID_PREMIUM, EXTRAORDINARY_PAYMENTS?
     */
    type?: string;

    /**
     * Amount of the contribution
     */
    amount?: Amount;
  }

  immobilization?: {

    /**
     * Immobilization secures the loan agreement with this contract number
     */
    contractNumber: string;

    /**
     * immobilization partner - third party name
     */
    partner: string;
  }

  paymentTemplates?: [{

    /**
     * Type of payment template. Possible values - ORDINARY, EXTRAORDINARY
     */
    type?: string;

    symbols?: {

      /**
       * Variable symbol
       */
      variableSymbol?: string;
    }

    /**
     * Receiver account number
     */
    receiver?: AccountNumber;
  }];

  /**
   * Maximum amount that can be withdrawn from capital value
   */
  "cz-capitalValueMaxWithdrawal"?: Amount;
}