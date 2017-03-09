import * as CSCoreSDK from 'cs-core-sdk';
import { ServiceList, Service, ServiceParameters } from '../accounts/services';

/**
 * @class ServicesResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.PaginatedListEnabled<Service>}
 */
export class ServicesResource extends CSCoreSDK.Resource
  implements CSCoreSDK.PaginatedListEnabled<Service> {

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
   * Returns possibly empty list of services for current user. This resource represents only services which are not bound to any product.
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