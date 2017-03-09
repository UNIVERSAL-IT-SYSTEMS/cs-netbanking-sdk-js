import * as CSCoreSDK from 'cs-core-sdk';
import { NetbankingEmptyResponse } from '../common';

/**
 * @class AuthorizationTokenResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse>}
 */
export class AuthorizationTokenResource extends CSCoreSDK.Resource
  implements CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse> {

  /**
   * Invalidate authorization token.
   * @returns {Promise<NetbankingEmptyResponse>}
   */
  delete = (): Promise<NetbankingEmptyResponse> => {
    return this._client.callApi(this.getPath().replace('/my', ''), 'DELETE');
  }
}