import * as CSCoreSDK from 'cs-core-sdk';
import { AccountNumber } from '../common';

/**
 * Get currently available booking date
 * @class PaymentBookingDateResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.UpdateEnabled<PaymentBookingDateRequest, PaymentBookingDateResponse>}
 */
export class PaymentBookingDateResource extends CSCoreSDK.Resource
  implements CSCoreSDK.UpdateEnabled<PaymentBookingDateRequest, PaymentBookingDateResponse> {

  /**
   * Returns current available booking date based on the provided account and optional payment order category parameters
   * @param {PaymentBookingDateRequest} payload
   * @returns {Promise<PaymentBookingDateResponse>}
   */
  update = (payload: PaymentBookingDateRequest): Promise<PaymentBookingDateResponse> => {

    // make copy of payload
    payload = JSON.parse(JSON.stringify(payload));

    // get account's ID from passed object
    var params = {
      accountId: payload.accountId
    };

    delete payload.accountId;

    return CSCoreSDK.ResourceUtils.CallApiWithSuffix(this, null, "PUT", params, payload).then(bookingDate => {

      // transform ISO dates to native Date objects
      CSCoreSDK.EntityUtils.addDatesFromISO('bookingDate', bookingDate);

      return bookingDate;
    });
  }
}

/**
 * @interface PaymentBookingDateRequest
 */
export interface PaymentBookingDateRequest {

  /**
  * Account's ID
  */
  accountId: string;

  /**
  * Receiver's account number
  */
  receiver?: AccountNumber;

  /**
  * Payment order priority selected by user, ENUM values: URGENT (for express payments), STANDARD.
  */
  priority?: string;
}

/**
 * @interface PaymentBookingDateResponse
 */
export interface PaymentBookingDateResponse {

  /**
  * booking date value for provided account ID and payment order.
  */
  bookingDate: Date;
}