import * as CSCoreSDK from 'cs-core-sdk';
import { ServiceList, Service, ServiceParameters } from '../../accounts/services';

/**
 * @class BuildingsContractsServicesResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.PaginatedListEnabled<Service>}
 */
export class BuildingsContractsServicesResource extends CSCoreSDK.Resource
  implements CSCoreSDK.PaginatedListEnabled<Service> {

  /**
   * @param {string} basePath
   * @param {CSCoreSDK.WebApiClient} client 
   */
  constructor(basePath: string, client: CSCoreSDK.WebApiClient) {
    super(basePath, client);

    this._path = this.getPath().replace('/my', '/cz/my');
  }

  /**
   * Returns list of services which are connected or arranged for building saving product instance.
   * @param {ServiceParameters=} params
   * @returns {Promise<ServiceList>}
   */
  list = (params?: ServiceParameters): Promise<ServiceList> => {
    return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'services', params, response => {
      CSCoreSDK.EntityUtils.addDatesToItems(['dateFrom', 'dateTo'], response);

      return response;
    });
  }
}