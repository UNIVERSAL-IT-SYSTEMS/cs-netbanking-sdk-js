import * as CSCoreSDK from 'cs-core-sdk';

/**
 * @class InsurancesContractStrategiesResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.ListEnabled<ContractStrategy>}
 */
export class InsurancesContractStrategiesResource extends CSCoreSDK.Resource
  implements CSCoreSDK.ListEnabled<ContractStrategy> {

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
   * Returns list of strategies with corresponsing funds allocation for the life insurance
   * @returns {Promise<ContractStrategyList>}
   */
  list = (): Promise<ContractStrategyList> => {
    return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'strategies');
  }
}

/**
 * @interface ContractStrategyList
 * @extends {CSCoreSDK.ListResponse<ContractStrategy>}
 */
export interface ContractStrategyList extends CSCoreSDK.ListResponse<ContractStrategy> { }

/**
 * @interface ContractStrategy
 */
export interface ContractStrategy {

  /**
   * Type of the chosen strategy. Possible values: CONSERVATIVE, PROGRESSIVE, BALANCED, CONTROL, ACTUAL_SETTING
   */
  type: string;

  /**
   * Possible values are STRATEGY, INVESTMENT_MANAGEMENT. That means the funds allocation is fixed given by the chosen strategy, or it is under an investment program, so it is variable depending on current market state.
   */
  group: string;

  funds: [{

    /**
     * Id of the fund
     */
    code: string;

    /**
     * Name of the fund.
     */
    name: string;

    /**
     * Share in the fund. This is percentage value. 20 means 20%.
     */
    share: number;

    changeType?: string;
  }];
}