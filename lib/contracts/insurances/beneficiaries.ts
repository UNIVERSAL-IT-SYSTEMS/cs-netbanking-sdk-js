import * as CSCoreSDK from 'cs-core-sdk';

/**
 * @class InsurancesContractBeneficiariesResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.ListEnabled<InsuranceBeneficiary>}
 * @implements {CSCoreSDK.UpdateEnabled<UpdateInsuranceBeneficiaries, UpdateInsuranceBeneficiaries>}
 */
export class InsurancesContractBeneficiariesResource extends CSCoreSDK.Resource
  implements CSCoreSDK.ListEnabled<InsuranceBeneficiary>, CSCoreSDK.UpdateEnabled<UpdateInsuranceBeneficiaries, UpdateInsuranceBeneficiaries> {

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
   * Returns list of beneficiaries related to the insurance contract.
   * @returns {Promise<InsuranceBeneficiaryList>}
   */
  list = (): Promise<InsuranceBeneficiaryList> => {
    return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'beneficiaries', null).then(response => {
      CSCoreSDK.EntityUtils.addDatesToItems(['birthdate'], response);

      return response;
    });
  }

  /**
   * Change beneficiaries and distribution of insurance among beneficiaries.
   * @param {UpdateInsuranceBeneficiaries} payload
   * @returns {Promise<UpdateInsuranceBeneficiaries>}
   */
  update = (payload: UpdateInsuranceBeneficiaries): Promise<UpdateInsuranceBeneficiaries> => {

    if (payload && Array.isArray(payload.beneficiaries)) {
      payload.beneficiaries.forEach(x => {
        CSCoreSDK.EntityUtils.transformDatesToSimpleISO(['birthdate'], x);
      });
    }

    return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {
      CSCoreSDK.EntityUtils.addDatesToItems(['birthdate'], response, 'beneficiaries');

      return response;
    });
  }
}

/**
 * @interface InsuranceBeneficiaryList
 * @extends {CSCoreSDK.ListResponse<InsuranceBeneficiary>}
 */
export interface InsuranceBeneficiaryList extends CSCoreSDK.ListResponse<InsuranceBeneficiary> { }

/**
 * @interface InsuranceBeneficiary
 */
export interface InsuranceBeneficiary {

  /**
   * Type of beneficiary
   */
  type: string;

  /**
   * Name of the beneficiary.
   */
  name?: string;

  /**
   * Birthdate of the beneficiary.
   */
  birthdate?: Date;

  /**
   * Percentage of the insurance contract determined to beneficiary or distributed by law. Value in percentage, e.g. 63 will be displayed as 63 %.
   */
  percentage?: number;

  /**
   * Attribute returns unstructured information about distribution among beneficiaries in a single string in 2 cases: 1) Distribution have never been changed (after modifying the distribution - information will be returned ina structured form); 2) BE did not cut up unstructured format.
   */
  unstructuredInfo?: string;

  /**
   * List of flags.
   */
  flags?: [string];
}

/**
 * @interface UpdateInsuranceBeneficiaries
 */
export interface UpdateInsuranceBeneficiaries {

  beneficiaries: [InsuranceBeneficiary];
}