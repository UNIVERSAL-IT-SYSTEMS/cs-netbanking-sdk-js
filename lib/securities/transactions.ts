import * as CSCoreSDK from 'cs-core-sdk';
import { Signable, ExportTransactionsParameters } from '../common';

/**
 * @class SecurityTransactionsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.HasInstanceResource<SecurityTransactionResource>}
 */
export class SecurityTransactionsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.HasInstanceResource<SecurityTransactionResource>, CSCoreSDK.ParametrizedExportEnabled<ExportTransactionsParameters, Uint8Array> {

  /**
   * @param {string} basePath
   * @param {CSCoreSDK.WebApiClient} client 
   */
  constructor(basePath: string, client: CSCoreSDK.WebApiClient) {
    super(basePath, client);

    this._path = this.getPath().replace('/my', '/cz/my');
  }

  /**
   * Get resource of security transaction with a given id
   * @param {string} id
   * @returns {SecurityTransactionResource}
   */
  withId = (id: string): SecurityTransactionResource => {
    return new SecurityTransactionResource(id, this.getPath(), this.getClient());
  }

  /**
   * Export transaction history into signed pdf. 
   * @param {ExportTransactionsParameters} params
   * @return {Promise<Uint8Array>}
   */
  export = (params: ExportTransactionsParameters): Promise<Uint8Array> => {

    // transform "fields" parameter to comma separated list from array
    CSCoreSDK.EntityUtils.transformArrayParamsToString(params, 'fields');

    // transform Date objects to ISO strings
    CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);

    return this._client.callApi(`${this.getPath()}/export`, 'POST', params, null, null, 'arraybuffer');
  }

}

/**
 * @class SecurityTransactionResource
 * @extends {CSCoreSDK.InstanceResource}
 * @implements {CSCoreSDK.UpdateEnabled<SecurityTransactionRequest, SecurityTransactionResponse>}
 */
export class SecurityTransactionResource extends CSCoreSDK.InstanceResource
  implements CSCoreSDK.UpdateEnabled<SecurityTransactionRequest, SecurityTransactionResponse> {

  /**
   * Allows to add or change a client's personal note and mark/star the transaction as favorite/important for one specific transaction on selected product.
   * @param {SecurityTransactionRequest} payload
   * @returns {Promise<SecurityTransactionResponse>}
   */
  update = (payload: SecurityTransactionRequest): Promise<SecurityTransactionResponse> => {
    (<any>payload).id = this._id;
    return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {

      CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), this.getPath());

      return response;
    });
  }
}

/**
 * @interface SecurityTransactionRequest
 */
export interface SecurityTransactionRequest {

  /**
   * Personal, user specific note for transaction. Max. 4 000 characters.
   */
  note?: string;

  /**
   * List of flags.
   */
  flags?: [string];
}

/**
 * @interface SecurityTransactionResponse
 * @extends {CSCoreSDK.Signable}
 */
export interface SecurityTransactionResponse extends CSCoreSDK.Signable {

  transaction: {

    /**
     * Transaction identifier.
     */
    id: string;

    /**
     * Personal, user specific note for transaction. Max. 4 000 characters.
     */
    note?: string;

    /**
     * List of flags.
     */
    flags?: [string];
  }
}