import * as CSCoreSDK from 'cs-core-sdk';
import { Amount } from '../common';

/**
 * Recharging the credit available on prepaid cards provided by Vodafone, T-Mobile or O2.
 * @class PaymentMobileResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.CreateEnabled<MobilePaymentsRequest, MobilePaymentsResponse>}
 */
export class PaymentMobileResource extends CSCoreSDK.Resource
  implements CSCoreSDK.CreateEnabled<MobilePaymentsRequest, MobilePaymentsResponse> {

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
   * Recharge the credit on prepaid card
   * @param {MobilePaymentsRequest} payload
   * @returns {Promise<MobilePaymentsResponse>}
   */
  create = (payload: MobilePaymentsRequest): Promise<MobilePaymentsResponse> => {

    return CSCoreSDK.ResourceUtils.CallCreate(this, payload).then(response => {

      // Remove signInfo from response and add SigningObject with key signing
      CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), this.getPath());

      return response;
    })
  }
}

/**
 * @interface MobilePaymentsRequest
 */
export interface MobilePaymentsRequest {

  /**
  * Type of mobile payment depending on provider of mobile services. Possible values: TOP_UP (for all operators) and INVOICE, VODAFONE_PAYMENT, MOBILE_DEPOSIT (for Vodafone).
  */
  paymentType: string;

  /**
  * Phone number.
  */
  phoneNumber: string;

  /**
  * Sender name
  */
  sender: MobilePaymentSender;

  /**
  * Payment amount.
  */
  amount: Amount;

  /**
  * Invoice number used as identifier of mobile payment on mobile service provider side (only for paymentType: INVOICE).
  */
  invoiceNumber?: string;

  /**
  * Phone number used for sending of confirmation of mobile payment execution. Not available for paymentType: INVOICE.
  */
  confirmationPhoneNumber: string;
}

/**
 * @interface MobilePaymentsResponse
 * @extends {MobilePaymentsRequest}
 * @extends {CSCoreSDK.Signable}
 */
export interface MobilePaymentsResponse extends MobilePaymentsRequest, CSCoreSDK.Signable { }

/**
 * @interface MobilePaymentSender
 */
export interface MobilePaymentSender {

  /**
  * Account number with possible prefix. Format is "XXXXXX-NNNNNNNNNN" if prefix is not null or "000000". If prefix is not provided then format is "NNNNNNNNNN" without leading zeros.
  */
  number: string;

  /**
  * Bank Code
  */
  bankCode: string;

  /**
  * Code of the Country - 2 characters; mandatoryfor international orders.
  */
  countryCode?: string;

  /**
  * IBAN
  */
  iban: string;

  /**
  * BIC
  */
  bic: string;
}
