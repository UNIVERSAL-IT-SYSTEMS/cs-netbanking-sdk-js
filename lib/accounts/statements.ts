import * as CSCoreSDK from 'cs-core-sdk';
import { StatementList, Statement, NetbankingParameters, DownloadStatementParameters } from '../common';

/**
 * Get information about the account's statements
 * @class AccountStatementsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.PaginatedListEnabled<Statement>}
 */
export class AccountStatementsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.PaginatedListEnabled<Statement> {

  /**
   * Fetches the statements and returns them in a promise
   * @param {NetbankingParameters=} params
   * @returns {Promise<StatementList>}
   */
  list = (params?: NetbankingParameters): Promise<StatementList> => {

    // transform "sort" and "order" parameters to comma separated list from array
    CSCoreSDK.EntityUtils.transformArrayParamsToString(params, ['sort', 'order']);

    return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'statements', params, response => {

      // transform ISO dates to native Date objects
      CSCoreSDK.EntityUtils.addDatesToItems('statementDate', response);

      return response;
    });
  }

  /**
   * Downloads statements file
   * @param {DownloadStatementParameters} params
   * @returns {Promise<any>}
   */
  download = (params: DownloadStatementParameters): Promise<any> => {
    return CSCoreSDK.ResourceUtils.CallDownload(this, 'signed/download', 'POST', params);
  }
}