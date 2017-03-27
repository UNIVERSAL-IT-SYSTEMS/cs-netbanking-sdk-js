import * as CSCoreSDK from 'cs-core-sdk';
import { StatementList, Statement, NetbankingParameters, DownloadStatementParameters } from '../common';

/**
 * Account resource for listing statements
 * @class CardAccountsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.HasInstanceResource<CardAccountResource>}
 */
export class CardAccountsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.HasInstanceResource<CardAccountResource> {

  /**
   * Returns CardAccountResource for an account with a given id
   * @param {string} id
   * @returns {CardAccountResource}
   */
  withId = (id: string): CardAccountResource => {
    return new CardAccountResource(id, this.getPath(), this._client);
  }
}

/**
 * Indidiual account resource with a given id
 * @class CardAccountResource
 * @extends {CSCoreSDK.InstanceResource}
 */
export class CardAccountResource extends CSCoreSDK.InstanceResource {

  /**
   * Get statements of the account
   * @returns {CardStatementsResource}
   */
  get statements(): CardStatementsResource {
    return new CardStatementsResource(this.getPath() + '/statements', this._client);
  }
}

/**
 * Get statements for an account
 * @class CardStatementsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.PaginatedListEnabled<Statement>}
 */
export class CardStatementsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.PaginatedListEnabled<Statement>, CSCoreSDK.ParametrizedDownloadEnabled<DownloadStatementParameters, Uint8Array> {

  /**
   * List all statements
   * @param {NetbankingParameters=} params
   * @returns {Promise<StatementList>}
   */
  list = (params?: NetbankingParameters): Promise<StatementList> => {

    // transform "sort" and "order" parameters to comma separated list from array
    CSCoreSDK.EntityUtils.transformArrayParamsToString(params, ['sort', 'order']);

    return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'statements', params, response => {

      // transform ISO dates to native Date objects
      CSCoreSDK.EntityUtils.addDatesToItems('statementDate', response)

      return response;
    });
  }

  /**
   * Download PDF with statements
   * @param {DownloadStatementParameters} params
   * @returns {Promise<Uint8Array>}
   */
  download = (params: DownloadStatementParameters): Promise<Uint8Array> => {
    return CSCoreSDK.ResourceUtils.CallDownload(this, 'signed/download', 'POST', params);
  }
}