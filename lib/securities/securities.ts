import * as CSCoreSDK from 'cs-core-sdk';
import { SecurityTransactionsResource } from './transactions';
import { Amount, Signable } from '../common';

/**
 * @class SecuritiesResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.PaginatedListEnabled<Security>}
 * @implements {CSCoreSDK.HasInstanceResource<SecurityResource>}
 */
export class SecuritiesResource extends CSCoreSDK.Resource
  implements CSCoreSDK.PaginatedListEnabled<Security>, CSCoreSDK.HasInstanceResource<SecurityResource> {

  /**
   * Returns list of securities accounts for current user. Securities account represents virtual account which holds securities titles and its shares (funds, bonds, etc.).
   * @param {SecuritiesParams=} params
   * @returns {Promise<SecurityList>}
   */
  list = (params?: SecuritiesParams): Promise<SecurityList> => {
    return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'securitiesAccounts', params, response => {

      transformDatesInSubSecAccounts(response);
      response.items.forEach(sec => {
        resourcifySecurity(<Security>sec, this.withId((<Security>sec).id));
      });

      return response;
    });
  }

  /**
   * Get resource of security with a given id 
   * @param {string} id
   * @returns {SecuritiesResource}
   */
  withId = (id: string): SecurityResource => {
    return new SecurityResource(id, this.getPath(), this.getClient());
  }
}

/**
 * @class SecurityResource
 * @extends {CSCoreSDK.InstanceResource}
 * @implements {CSCoreSDK.GetEnabled<Security>}
 * @implements {CSCoreSDK.UpdateEnabled<SecurityRequest, SecurityResponse>}
 */
export class SecurityResource extends CSCoreSDK.InstanceResource
  implements CSCoreSDK.GetEnabled<Security>, CSCoreSDK.UpdateEnabled<SecurityRequest, SecurityResponse> {

  /**
   * Get a single securities account with all its details. Securities account represents virtual account which holds securities titles and its shares (funds, bonds, etc.).
   * @returns {Promise<Security>}
   */
  get = (): Promise<Security> => {
    return CSCoreSDK.ResourceUtils.CallGet(this, null).then(response => {
      transformDatesInSubSecAccounts(response);
      resourcifySecurity(<Security>response, this);

      return response;
    });
  }

  /**
   * Allows to change a limited set of securities account-settings of one specific contract. Currently only the field alias can be changed. Change only to alias field must not be signed, but response is ready also for signing process.
   * @param {SecurityRequest} payload
   * @returns {Promise<SecurityResponse>}
   */
  update = (payload: SecurityRequest): Promise<SecurityResponse> => {
    return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {
      transformDatesInSubSecAccounts(response);
      resourcifySecurity(<Security>response, this);
      CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), this.getPath());

      return response;
    });
  }

  /**
   * Returns security transactions resource
   * @returns {SecurityTransactionsResource}
   */
  get transactions(): SecurityTransactionsResource {
    return new SecurityTransactionsResource(`${this.getPath()}/transactions`, this.getClient());
  }
}

function transformDatesInSubSecAccounts(response) {
  if (response.subSecAccounts && Array.isArray(response.subSecAccounts)) {
    response.subSecAccounts.forEach(acc => {
      CSCoreSDK.EntityUtils.addDatesFromISO('lastPriceDate', acc);
    });
  }
}

function resourcifySecurity(security: Security, securityReference: SecurityResource) {
  security.transactions = securityReference.transactions;
  security.get = securityReference.get;
  security.update = securityReference.update;
}

/**
 * @interface SecurityList
 * @extends {CSCoreSDK.PaginatedListResponse<Security>}
 */
export interface SecurityList extends CSCoreSDK.PaginatedListResponse<Security> { }

/**
 * @interface Security
 */
export interface Security {

  /**
   * Product id
   */
  id: string;

  /**
   * Account identification number of security portfolio (MUIN)
   */
  accountno: string;

  /**
   * Alias for security portfolio. Max. 50 characters.
   */
  alias?: string;

  /**
   * Description - Securities portfolio Account name, Name of principal account holder
   */
  description: string;

  /**
   * Account balance value
   */
  balance: Amount;

  /**
   * Array of securities sub accounts
   */
  subSecAccounts?: [SubSecAccount];

  /**
  * Convenience getter for getting security's transactions resource
  */
  transactions: SecurityTransactionsResource;

  /**
   * Convenience method for getting security detail right from the list 
   * @returns {Promise<Security>}
   */
  get: () => Promise<Security>;

  /**
   * Convenience method for updating security's details
   * @param {SecurityRequest} payload
   * @returns {Promise<SecurityResponse>}
   */
  update: (payload: SecurityRequest) => Promise<SecurityResponse>;
}

/**
 * @interface SubSecAccount
 */
export interface SubSecAccount {

  /**
   * Sub Securities Account ID
   */
  id: string;

  /**
   * Array of the titles within sub account.
   */
  titles?: [{

    /**
     * Name of the security title.
     */
    title: string;

    /**
     * ISIN - identifier of the security title.
     */
    isin: string;

    /**
     * Number of securities/shares
     */
    numberOfShares: number;

    /**
     * Last Price of Securities title
     */
    lastPrice: Amount;

    /**
     * Date of securities last price evaluation
     */
    lastPriceDate: Date;

    /**
     * Market value of the securities title.
     */
    marketValue: Amount;

    /**
     * Security Product Type. Possible values: BOND, SHARE, FUND, IPO, OPTION, OTHER, INDEX, CERTIFICATE, INVESTMENT,KNOCKOUT, UNKNOWN.
     */
    securityType: string;

    /**
     * Security Product Group. Possible values: BONDS_AND_MORE, GUARANTEE_OF_PRINCIPAL, NO_GUARANTEE_OF_PRINCIPAL, REAL_ESTATE, SHARES, STOCK_AND_MIXED, INVESTMENT, KNOCK_OUT, UNKNOWN.
     */
    productGroup: string;

    /**
     * Localized security indication depending on security type and product group
     */
    securityIndication: string;
  }];

  /**
   * Array of flags.
   */
  flags: [string]
}

/**
 * @interface SecuritiesParams
 * @extends {CSCoreSDK.Paginated}
 */
export interface SecuritiesParams extends CSCoreSDK.Paginated { }

/**
 * @interface SecurityRequest
 */
export interface SecurityRequest {

  /**
   * Alias for security portfolio. Max. 50 characters.
   */
  alias?: string;
}

/**
 * @interface SecurityResponse
 * @extends {Security}
 * @extends {CSCoreSDK.Signable}
 */
export interface SecurityResponse extends Security, CSCoreSDK.Signable { }