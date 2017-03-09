import * as CSCoreSDK from 'cs-core-sdk';
import { Signable } from '../common';
import { Confirmation } from './delivery';

/**
 * Issue various actions on a single card. 
 * @class CardActionsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.UpdateEnabled<CardActionRequest, CardActionResponse>}
 */
export class CardActionsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.UpdateEnabled<CardActionRequest, CardActionResponse> {

  /**
   * Issues various actions on a single card
   * @param {CardActionRequest} payload
   * @returns {Promise<CardActionResponse>}
   */
  update = (payload: CardActionRequest): Promise<CardActionResponse> => {
    return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {

      // Remove signInfo from response and add SigningObject with key signing
      CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), this.getPath());

      return response;
    });
  }
}

/**
 * @interface CardActionResponse
 * @extends {CSCoreSDK.Signable}
 */
export interface CardActionResponse extends CSCoreSDK.Signable { }

/**
 * @interface CardActionRequest
 */
export interface CardActionRequest {

  /**
   * Action which should be issued. Possible values are "REISSUE_PIN", "LOCK_CARD", "UNLOCK_CARD", "REPLACE_CARD", "ACTIVATE_CARD", "SET_AUTOMATIC_REPLACEMENT_ON", "SET_AUTOMATIC_REPLACEMENT_OFF".
   */
  action: string;

  /**
  * Reason why card should be locked. Possible values are "THEFT" and "LOSS". Relevant only for action "LOCK_CARD".
  */
  lockReason?: string;

  /**
  * Information about the confirmation
  */
  confirmations?: [Confirmation];
}