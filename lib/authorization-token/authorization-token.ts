import * as CSCoreSDK from 'cs-core-sdk';
import { NetbankingEmptyResponse } from '../common';

export class AuthorizationTokenResource extends CSCoreSDK.Resource
  implements CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse> {

  /**
   * Invalidate authorization token.
   */
  delete = (): Promise<NetbankingEmptyResponse> => {
    return this._client.callApi(this.getPath().replace('/my', ''), 'DELETE');
  }
}