import * as CSCoreSDK from 'cs-core-sdk';
import { Amount } from '../common';

/**
 * Get remaining amounts for payment orders
 * @class PaymentLimitsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.ListEnabled<PaymentLimit>}
 */
export class PaymentLimitsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.ListEnabled<PaymentLimit> {

  /**
   * List all limits for payment orders
   * @returns {Promise<PaymentLimitsList>}
   */
  list = (): Promise<PaymentLimitsList> => {
    return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'remainingLimits', null);
  }
}

/**
 * @interface PaymentLimitsList
 * @extends {CSCoreSDK.ListResponse<PaymentLimit>}
 */
export interface PaymentLimitsList extends CSCoreSDK.ListResponse<PaymentLimit> { }

/**
 * @interface PaymentLimit
 */
export interface PaymentLimit {

  /**
  * Authorization method type for which is limit defined. ENUM: tac, tan, sms, gridCard, eok, displayCard, mToken. Other local authorization type has to be defined.
  */
  authorizationType: string;

  /**
  * ID of the channel for which is limit defined. ENUM: netBanking, mobileBanking, homeBanking, thirdParty, and unknown - remaining limit amount valid for all channels, not particulary defined.
  */
  channelId: string;

  /**
  * ID of the application for which is limit defined. ENUM: George, InternetBanking and unknown - remaining limit amount valid for all applications, not particulary defined.
  */
  applicationId: string;

  /**
  * Remaining Daily amount which can be transferred using particular authorization method and channel (_embedded AMOUNT type).
  */
  remainingAmount: Amount;
}