import * as CSCoreSDK from 'cs-core-sdk';
import { SecurityTransactionRequest, SecurityTransactionResponse } from '../securities/transactions';
import { ExportTransactionsParameters } from '../common';

export class ContractsTransactionsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.HasInstanceResource<ContractsTransactionResource> {

  /**
   * Get contract transaction resource with a given id
   */
  withId = (id: string): ContractsTransactionResource => {
    return new ContractsTransactionResource(id, this.getPath(), this.getClient());
  }

  /**
   * Export transaction history into signed pdf. 
   */
  export = (params: ExportTransactionsParameters): Promise<any> => {

    // transform "fields" parameter to comma separated list from array
    CSCoreSDK.EntityUtils.transformArrayParamsToString(params, 'fields');

    // transform Date objects to ISO strings
    CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);

    return this._client.callApi(`${this.getPath()}/export`, 'POST', params, null, null, 'arraybuffer');
  }
}

export class ContractsTransactionResource extends CSCoreSDK.InstanceResource
  implements CSCoreSDK.UpdateEnabled<SecurityTransactionRequest, SecurityTransactionResponse> {

  /**
   * Allows to add or change a client's personal note and mark/star the transaction as favorite/important for one specific transaction on selected product.
   */
  update = (payload: SecurityTransactionRequest): Promise<SecurityTransactionResponse> => {
    (<any>payload).id = this._id;
    return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {

      CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), this.getPath());

      return response;
    });
  }
}