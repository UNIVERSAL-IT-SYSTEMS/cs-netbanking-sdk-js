/// <reference types="es6-promise" />

import * as CSCoreSDK from 'cs-core-sdk';
import { AccountsResource } from './accounts/accounts';
import { ProfileResource } from './profile/profile';
import { CardsResource } from './cards/cards';
import { OrdersResource } from './orders/orders';
import { SecuritiesResource } from './securities/securities';
import { SettingsResource } from './settings/settings';
import { ContactsResource } from './contacts/contacts';
import { PluginsResource } from './plugins/plugins';
import { ContractsResource } from './contracts/contracts';
import { ServicesResource } from './services/services';
import { MessagesResource } from './messages/messages';
import { TemplatesResource } from './templates/templates';
import { PhoneNumbersResource } from './phone-numbers/phone-numbers';
import { BudgetsResource } from './budgets/budgets';
import { GoalsResource } from './goals/goals';
import { PromotionsResource } from './promotions/promotions';
import { AuthorizationLimitsResource } from './authorization-limits/authorization-limits';
import { AuthorizationTokenResource } from './authorization-token/authorization-token';
import { BundlesResource } from './bundles/bundles';

var sharedClient: NetbankingClient = null;

/**
 * Returns the singleton NetbankingClient
 * @returns {NetbankingClient}
 */
export function getClient(): NetbankingClient {
  if (sharedClient === null) {
    return new NetbankingClient(CSCoreSDK.config.copy(), CSCoreSDK.sharedContext);
  }

  return sharedClient;
}

/**
 * Netbanking client 
 * @extends {CSCoreSDK.WebApiClient}
 */
export class NetbankingClient extends CSCoreSDK.WebApiClient {

  /**
   * Creates new instance of NetbankingClient
   * 
   * @param {WebApiConfiguration} config object that configures this client
   * @param {WebApiContext} context object that allows for data sharing between clients
   */
  constructor(config: CSCoreSDK.WebApiConfiguration, context: CSCoreSDK.WebApiContext) {
    super(config, '/api/v3/netbanking/my');
    this.sharedContext = context;
  }

  /**
   * List all accounts and get other information like balance, services, statements etc.
   * @returns {AccountsResource}
   */
  get accounts(): AccountsResource {
    return new AccountsResource(this.getPath() + '/accounts', this);
  }

  /**
   * Get information about the current user's profile and past logins.
   * @returns {ProfileResource}
   */
  get profile(): ProfileResource {
    return new ProfileResource(this.getPath() + '/profile', this);
  }

  /**
   * List all cards and other information like delivery, transactions, limits etc. 
   * @returns {CardsResource}
   */
  get cards(): CardsResource {
    return new CardsResource(this.getPath() + '/cards', this);
  }

  /**
   * List, update and get payments, booking date or create and update domestic payments. 
   * @returns {OrdersResource}
   */
  get orders(): OrdersResource {
    return new OrdersResource(this.getPath() + '/orders', this);
  }

  /**
   * @returns {SecuritiesResource}
   */
  get securities(): SecuritiesResource {
    return new SecuritiesResource(this.getPath() + '/securities', this);
  }

  /**
   * @returns {SettingsResource}
   */
  get settings(): SettingsResource {
    return new SettingsResource(`${this.getPath()}/settings`, this);
  }

  /**
   * @returns {ContactsResource}
   */
  get contacts(): ContactsResource {
    return new ContactsResource(`${this.getPath()}/contacts`, this);
  }

  /**
   * @returns {PluginsResource}
   */
  get plugins(): PluginsResource {
    return new PluginsResource(`${this.getPath()}/plugins`, this);
  }

  /**
   * @returns {ContractsResource}
   */
  get contracts(): ContractsResource {
    return new ContractsResource(`${this.getPath()}/contracts`, this);
  }

  /**
   * @returns {ServicesResource}
   */
  get services(): ServicesResource {
    return new ServicesResource(`${this.getPath()}/services`, this);
  }

  /**
   * @returns {MessagesResource}
   */
  get messages(): MessagesResource {
    return new MessagesResource(`${this.getPath()}/messages`, this);
  }

  /**
   * @returns {TemplatesResource}
   */
  get templates(): TemplatesResource {
    return new TemplatesResource(`${this.getPath()}/templates`, this);
  }

  /**
   * @returns {PhoneNumbersResource}
   */
  get phoneNumbers(): PhoneNumbersResource {
    return new PhoneNumbersResource(`${this.getPath()}/phone-numbers`, this);
  }

  /**
   * @returns {BudgetsResource}
   */
  get budgets(): BudgetsResource {
    return new BudgetsResource(`${this.getPath()}/budgets`, this);
  }

  /**
   * @returns {GoalsResource}
   */
  get goals(): GoalsResource {
    return new GoalsResource(`${this.getPath()}/goals`, this);
  }

  /**
   * @returns {PromotionsResource}
   */
  get promotions(): PromotionsResource {
    return new PromotionsResource(`${this.getPath()}/promotions`, this);
  }

  /**
   * @returns {AuthorizationLimitsResource}
   */
  get authorizationLimits(): AuthorizationLimitsResource {
    return new AuthorizationLimitsResource(`${this.getPath()}/authorizationLimits`, this);
  }

  /**
   * @returns {AuthorizationTokenResource}
   */
  get authorizationToken(): AuthorizationTokenResource {
    return new AuthorizationTokenResource(`${this.getPath()}/auth/token/invalidate`, this);
  }

  /**
   * @returns {BundlesResource}
   */
  get bundles(): BundlesResource {
    return new BundlesResource(`${this.getPath()}/bundles`, this);
  }
}