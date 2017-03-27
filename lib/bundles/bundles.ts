import * as CSCoreSDK from 'cs-core-sdk';
import { SignInfo } from '../common';

/**
 * @class BundlesResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.CreateEnabled<BundleCreateRequest, BundleResponse>}
 */
export class BundlesResource extends CSCoreSDK.Resource
  implements CSCoreSDK.CreateEnabled<BundleCreateRequest, BundleResponse> {

  /**
   * @param {BundleCreateRequest} payload
   * @returns {Promise<BundleResponse>}
   */
  create = (payload: BundleCreateRequest): Promise<BundleResponse> => {
    return CSCoreSDK.ResourceUtils.CallCreate(this, payload).then(response => {

      CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), `${this.getPath()}/${(<BundleResponse>response).id}`);

      return response;
    });
  }
}

/**
 * @interface BundleCreateRequest
 */
export interface BundleCreateRequest {

  /**
   * Name of the bundle.
   */
  name: string;

  /**
   * Array of items in bundle. Every item represents payment order for batch sign.
   */
  items: [{
    id: string;
    signInfo: {
      state: string;
      signId: string;
    }
  }];
}

/**
 * @interface BundleResponse
 * @extends {CSCoreSDK.Signable}
 */
export interface BundleResponse extends CSCoreSDK.Signable {

  /**
   * Bundle identifier.
   */
  id: string;

  /**
   * Name of the bundle.
   */
  name?: string;

  /**
   * Array of items in bundle. Every item represents payment order for batch sign.
   */
  items: [{
    id: string;
    signInfo: SignInfo;
  }];
}