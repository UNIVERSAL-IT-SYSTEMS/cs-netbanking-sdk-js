import * as CSCoreSDK from 'cs-core-sdk';
import { Signable, Address } from '../common';

/**
 * Get current delivery settings
 * @class CardDeliveryResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.GetEnabled<DeliveryListing>}
 * @implements {CSCoreSDK.UpdateEnabled<ChangeDeliverySettingsRequest, ChangeDeliverySettingsResponse>}
 */
export class CardDeliveryResource extends CSCoreSDK.Resource
  implements CSCoreSDK.GetEnabled<DeliveryListing>, CSCoreSDK.UpdateEnabled<ChangeDeliverySettingsRequest, ChangeDeliverySettingsResponse> {

  /**
   * Returns current delivery settings
   * @returns {Promise<DeliveryListing>}
   */
  get = (): Promise<DeliveryListing> => {
    return CSCoreSDK.ResourceUtils.CallGet(this, null);
  }

  /**
   * Change current delivery settings 
   * @param {ChangeDeliverySettingsRequest} payload
   * @returns {Promise<ChangeDeliverySettingsResponse>}
   */
  update = (payload: ChangeDeliverySettingsRequest): Promise<ChangeDeliverySettingsResponse> => {
    return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
  }
}

/**
 * @interface DeliveryListing
 */
export interface DeliveryListing {

  /**
  * Type of the delivery which should be set for this card. Possible values are BRANCH, OTHER_BRANCH, HOME, ADDRESS_ABROAD.
  */
  cardDeliveryMode: string;

  /**
  * Identification of the branch where card will be ready to takeover.
  */
  branchId: string;

  /**
  * Address where card should be sent.
  */
  address: Address;

  /**
  * Information about the confirmation
  */
  confirmations?: [Confirmation];
}

/**
 * @interface Confirmation
 */
export interface Confirmation {

  /**
  * Email
  */
  email: string;

  /**
  * Language
  */
  language: string;
}

/**
 * @interface ChangeDeliverySettingsResponse
 * @extends {DeliveryListing}
 * @extends {Signable}
 */
export interface ChangeDeliverySettingsResponse extends DeliveryListing, Signable { }

/**
 * @interface ChangeDeliverySettingsRequest
 */
export interface ChangeDeliverySettingsRequest {

  /**
  * Indicates how a client receives their card and pin. Possible values: BRANCH, HOME, OTHER_BRANCH, ADDRESS_ABROAD.
  */
  cardDeliveryMode: string;

  /**
  * ID of a branch where card should be sent.
  */
  branchId?: string;

  /**
  * Address where card should be sent.
  */
  address?: Address;

  /**
  * Phone number of the client.
  */
  deliveryPhone?: string;

  /**
  * Information about the confirmation
  */
  confirmations: [Confirmation];
}