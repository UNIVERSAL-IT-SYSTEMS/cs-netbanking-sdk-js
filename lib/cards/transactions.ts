import * as CSCoreSDK from 'cs-core-sdk';
import { AddNoteAndMarkTransactionRequest, ExportTransactionsParameters, Transaction, Signable } from '../common';

/**
 * Allows to add or change a client's personal note and mark/star the card transaction as favorite/important for one specific transaction
 * @class CardTransactionsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.HasInstanceResource<CardTransactionResource>}
 */
export class CardTransactionsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.HasInstanceResource<CardTransactionResource> {

  /**
   * Returns CardTransactionResource for a given id
   * @param {string} id
   * @returns {CardTransactionResource}
   */
  withId = (id: string): CardTransactionResource => {
    return new CardTransactionResource(id, this.getPath(), this._client);
  }

  /**
   * Export transactions to PDF
   * @param {ExportTransactionsParameters} params
   * @returns {Promise<any>}
   */
  export = (params: ExportTransactionsParameters): Promise<any> => {

    // transform "fields" parameter to comma separated list from array
    CSCoreSDK.EntityUtils.transformArrayParamsToString(params, 'fields');

    // transform Date objects to ISO strings
    CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);

    // insert 'cz' resource into the resource's path once because the api requires it in some resources
    var path = this.getPath().replace('/my', '/cz/my');

    return this._client.callApi(`${path}/export`, 'POST', params, null, null, 'arraybuffer');
  }
}

/**
 * Add or change a client's personal note and mark/star the card transaction as favorite/important
 * @class CardTransactionResource
 * @extends {CSCoreSDK.InstanceResource}
 * @implements {CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionRequest, AddNoteAndMarkCardTransactionResponse>}
 */
export class CardTransactionResource extends CSCoreSDK.InstanceResource
  implements CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionRequest, AddNoteAndMarkCardTransactionResponse> {

  /**
   * Adds, changes of marks transaction
   * @param {AddNoteAndMarkTransactionRequest} payload
   * @returns {Promise<AddNoteAndMarkCardTransactionResponse>}
   */
  update = (payload: AddNoteAndMarkTransactionRequest): Promise<AddNoteAndMarkCardTransactionResponse> => {
    return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
  }
}

/**
 * @interface AddNoteAndMarkCardTransactionResponse
 * @extends {Signable}
 */
export interface AddNoteAndMarkCardTransactionResponse extends Signable {
  cardTransaction: Transaction;
}