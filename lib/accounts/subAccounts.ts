import * as CSCoreSDK from 'cs-core-sdk';
import { StatementList, Statement, NetbankingParameters, DownloadStatementParameters } from '../common';

/**
 * Get individual SubAccount resource
 * @class SubAccountsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.HasInstanceResource<SubAccountResource>}
 */
export class SubAccountsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.HasInstanceResource<SubAccountResource> {

  /**
   * Returns individual SubAccount resource with a given id
   * @param {string|number} id
   * @returns {SubAccountResource}
   */
  withId = (id: string | number): SubAccountResource => {
    return new SubAccountResource(id, this.getPath(), this._client);
  }
}

/**
 * Get information about the subaccount
 * @class SubAccountResource
 * @extends {CSCoreSDK.InstanceResource}
 */
export class SubAccountResource extends CSCoreSDK.InstanceResource {

  /**
   * Get information about the subaccount's statements
   * @returns {SubAccountStatementsResource}
   */
  get statements(): SubAccountStatementsResource {
    return new SubAccountStatementsResource(this.getPath() + '/statements', this._client);
  }
}

/**
 * List all subaccount's statements
 * @class SubAccountStatementsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.PaginatedListEnabled<Statement>}
 */
export class SubAccountStatementsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.PaginatedListEnabled<Statement> {

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
   * Returns all subaccount's statements in a promise
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
    return CSCoreSDK.ResourceUtils.CallDownload(this, 'download', 'POST', params);
  }
}
