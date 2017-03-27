import * as CSCoreSDK from 'cs-core-sdk';
import { Amount } from '../common';

/**
 * Get information about the account's reservations
 * @class AccountReservationsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.PaginatedListEnabled<Reservation>}
 */
export class AccountReservationsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.PaginatedListEnabled<Reservation> {

  /**
   * Fetches the reservations and returns them in a promise
   * @param {ReservationParameters=} params
   * @returns {Promise<ReservationList>}
   */
  list = (params?: ReservationParameters): Promise<ReservationList> => {
    return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'reservations', params, response => {

      // transform ISO dates to native Date objects
      CSCoreSDK.EntityUtils.addDatesToItems(['creationDate', 'expirationDate'], response);

      return response;
    });
  }
}

/**
 * @interface ReservationList
 * @extends {CSCoreSDK.PaginatedListResponse<Reservation>}
 */
export interface ReservationList extends CSCoreSDK.PaginatedListResponse<Reservation> { }

/**
 * @interface Reservation
 */
export interface Reservation {

  /**
  * Type of reservation. Possible values are CASH_WITHDRAWAL, PAYMENT, CARD_PAYMENT, OTHER
  */
  type: string;

  /**
  * Reservation status. Possible values are RESERVED, CANCELLED, EXPIRED. Currently only reservations with status RESERVED are supported.
  */
  status: string;

  /**
  * Transaction date and time.
  */
  creationDate: Date;

  /**
  * Reservation expiration date.
  */
  expirationDate?: Date;

  /**
  * Merchant Name / ATM.
  */
  merchantName?: string;

  /**
  * Merchant address.
  */
  "cz-merchantAddress"?: string;

  /**
  * Reservation description, additional info.
  */
  description: string;

  /**
  * The amount of reservation in account's currency
  */
  amount: Amount;

  /**
  * The amount of the reservation in transaction currency
  */
  amountSender?: Amount;
}

/**
 * @interface ReservationParameters
 * @extends {CSCoreSDK.Paginated}
 */
export interface ReservationParameters extends CSCoreSDK.Paginated { }