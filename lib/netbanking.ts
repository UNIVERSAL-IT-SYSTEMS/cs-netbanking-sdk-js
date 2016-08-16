/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {AccountsResource} from './accounts/accounts';
import {ProfileResource} from './profile/profile';
import {CardsResource} from './cards/cards';
import {OrdersResource} from './orders/orders';
import {SecuritiesResource} from './securities/securities';
import {SettingsResource} from './settings/settings';
import {ContactsResource} from './contacts/contacts';
import {PluginsResource} from './plugins/plugins';
import {ContractsResource} from './contracts/contracts';
import {ServicesResource} from './services/services';
import {MessagesResource} from './messages/messages';
import {TemplatesResource} from './templates/templates';
import {PhoneNumbersResource} from './phone-numbers/phone-numbers';

var sharedClient : NetbankingClient = null;

/*+
 * Returns the singleton NetbankingClient
 */
export function getClient() {
    if (sharedClient === null) {
        return new NetbankingClient(CSCoreSDK.config.copy(), CSCoreSDK.sharedContext);
    }
    return sharedClient;
}

/**
 * Netbanking client 
 */
export class NetbankingClient extends CSCoreSDK.WebApiClient {
    
    /**
     * Creates new instance of NetbankingClient
     * 
     * @param config WebApiConfiguration object that configures this client
     * @param context WebApiContext object that allows for data sharing between clients
     */
    constructor(config: CSCoreSDK.WebApiConfiguration, context: CSCoreSDK.WebApiContext) {
        super(config, '/api/v3/netbanking/my');
        this.sharedContext = context;
    }
    
   /**
    * List all accounts and get other information like balance, services, statements etc.
    */
    get accounts() {
        return new AccountsResource(this.getPath() + '/accounts', this);
    }
    
    /**
    * Get information about the current user's profile and past logins.
    */
    get profile() {
        return new ProfileResource(this.getPath() + '/profile', this);
    }
    
    /**
    * List all cards and other information like delivery, transactions, limits etc. 
    */
    get cards() {
        return new CardsResource(this.getPath() + '/cards', this);
    }
    
    /**
    * List, update and get payments, booking date or create and update domestic payments. 
    */
    get orders() {
        return new OrdersResource(this.getPath() + '/orders', this);
    }
    
    get securities() {
        return new SecuritiesResource(this.getPath() + '/securities', this);
    }

    get settings() {
        return new SettingsResource(`${this.getPath()}/settings`, this);
    }

    get contacts() {
        return new ContactsResource(`${this.getPath()}/contacts`, this);
    }

    get plugins() {
        return new PluginsResource(`${this.getPath()}/plugins`, this);
    }

    get contracts() {
        return new ContractsResource(`${this.getPath()}/contracts`, this);
    }

    get services() {
        return new ServicesResource(`${this.getPath()}/services`, this);
    }

    get messages() {
        return new MessagesResource(`${this.getPath()}/messages`, this); 
    }

    get templates() {
        return new TemplatesResource(`${this.getPath()}/templates`, this);
    }

    get phoneNumbers() {
        return new PhoneNumbersResource(`${this.getPath()}/phone-numbers`, this);
    }
}