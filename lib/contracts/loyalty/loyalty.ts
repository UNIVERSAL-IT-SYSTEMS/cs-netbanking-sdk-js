import * as CSCoreSDK from 'cs-core-sdk';

/**
 * @class LoyaltyContractsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.GetEnabled<Loyalty>}
 */
export class LoyaltyContractsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.GetEnabled<Loyalty> {

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
   * Get data about iBod account of the current client.
   * @returns {Promise<Loyalty>}
   */
  get = (): Promise<Loyalty> => {
    return CSCoreSDK.ResourceUtils.CallGet(this, null).then(response => {
      CSCoreSDK.EntityUtils.addDatesFromISO('exportDate', response);

      return response;
    });
  }
}

/**
 * @interface Loyalty
 */
export interface Loyalty {

  /**
   * State of the ibod account. Possible values are REGISTERED, UNREGISTERED, DEACTIVATED_FROM_FSCS.
   */
  state: string;

  /**
   * Date when data were actual.
   */
  exportDate: Date;

  /**
   * IBod points count.
   */
  pointsCount: number;

  /**
   * Activation ibod code.
   */
  activationCode?: string;
}