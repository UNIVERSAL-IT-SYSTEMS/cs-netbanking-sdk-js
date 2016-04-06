/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount, AccountNumber, Signable, NetbankingParameters} from '../common';
import {CardsDeliveryResource} from './delivery';
import {CardsTransactionsResource} from './transactions';
import {CardsActionsResource} from './actions';
import {CardsLimitsResource} from './limits';
import {CardsSecure3DResource} from './secure3D';
import {CardsTransferResource} from './transfer';
import {CardsAccountsResource} from './statements';

    
/**
* Represents list of payment cards (either debet or credit) for current user. Every card was issued for current user or belongs to one of his accounts.
*/
export class CardsResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<Card>, CSCoreSDK.HasInstanceResource<CardResource> {
    
    /**
    * List all cards 
    */  
    list = (params?: NetbankingParameters) : Promise<CardsList> => {
        
        // transform "sort" and "order" parameters to comma separated list from array
        CSCoreSDK.EntityUtils.transformArrayParamsToString(params, ['sort', 'order']);
        
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'cards', params, response => {
            
            response.items.forEach(item => {
                
                // add convenient methods to items in the list
                resourcifyListing(<Card>item, this.withId((<Card>item).id), true);
                
                // transform ISO dates to native Date objects
                transformResponse(item);
            });
            
            return response;
        });
    }
    
    /**
    * Get a resource for card with a given id 
    */  
    withId = (id: string) : CardResource => {
        return new CardResource(id, this.getPath(), this.getClient());
    }
}

export class CardResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.GetEnabled<Card>, CSCoreSDK.UpdateEnabled<ChangeCardsSettingsRequest, ChangeCardsSettingsResponse> {
    
    /**
    * Get detail of the card 
    */  
    get = () : Promise<Card> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null).then(card => {
            
            // add convenient methods to items in the list
            resourcifyListing(<Card>card, this, false);
            
            // transform ISO dates to native Date objects
            transformResponse(card);
            
            return card;
        });
    }
    
    /**
    * Update card's alias 
    */  
    update = (payload: ChangeCardsSettingsRequest): Promise<ChangeCardsSettingsResponse> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(card => {
            
            // add convenient methods to items in the list
            resourcifyListing(<Card>card, this, false);
            
            // transform ISO dates to native Date objects
            transformResponse(card);
            
            return card;
        })
    }
    
    /**
    * Get current delivery settings
    */  
    get delivery() {
        return new CardsDeliveryResource(this.getPath() + '/delivery', this._client);
    }
    
    /**
    * Allows to add or change a client's personal note and mark/star the card transaction as favorite/important for one specific transaction
    */
    get transactions() {
        return new CardsTransactionsResource(this.getPath() + '/transactions', this._client);
    }
    
    /**
    * Issue various actions on a single card. Currently supported actions are: 
    * reissue pin, lock card, unlock card, activate card, set automatic card replacement on, set automatic card replacement off, replacement card request
    */
    get actions() {
        return new CardsActionsResource(this.getPath() + '/states', this._client);
    }
    
    /**
    * Get information about different limits
    */
    get limits() {
        return new CardsLimitsResource(this.getPath() + '/card-limits', this._client);
    }
    
    /**
    * Get the 3D secure online shopping status
    */
    get secure3d() {
        return new CardsSecure3DResource(this.getPath() + '/secure-online-shopping', this._client);
    }
    
    /**
    * Resource for paying up credit card debt
    */
    get transfer() {
        return new CardsTransferResource(this.getPath() + '/transfer', this._client);
    }
    
    /**
    * Account resource for listing statements
    */
    get accounts() {
        return new CardsAccountsResource(this.getPath() + '/mainaccount', this._client);
    }
}

function resourcifyListing(itemListing: Card, itemResource: CardResource, isFromList: boolean) {
    if(isFromList) {
        itemListing.get = itemResource.get;    
    }
    itemListing.update = itemResource.update;
    itemListing.delivery = itemResource.delivery;
    itemListing.transactions = itemResource.transactions;
    itemListing.actions = itemResource.actions;
    itemListing.limits = itemResource.limits;
    itemListing.secure3d = itemResource.secure3d;
    itemListing.transfer = itemResource.transfer;
    itemListing.accounts = itemResource.accounts;
}

function transformResponse(item) {
    CSCoreSDK.EntityUtils.addDatesFromISO(['expiryDate', 'validFromDate'], item);
}

export interface CardsList extends CSCoreSDK.PaginatedListResponse<Card> {}

export interface Card {
    
    /**
    * unique product id
    */
    id: string;
    
    /**
    * Users product name. Max. 50 characters.
    */
    alias?: string;
    
    /**
    * product owner
    */
    owner: string;
    
    /**
    * card number
    */
    number: string;
    
    /**
    * Card sequence number. The number distinguishing between separate cards (different plastic cards) with the same Primary Account Number (PAN)
    */
    sequenceNumber: string;
    
    /**
    * Localized product name.
    */
    productI18N: string;
    
    /**
    * Internal product code.
    */
    productCode?: string;
    
    /**
    * Expiration date of particular plastic card
    */
    expiryDate?: Date;
    
    /**
    * Date from which this particular plastic card is valid
    */
    validFromDate?: Date;
    
    /**
    * Current state of card. Possible values: ACTIVE, INACTIVE (issued card not activated yet), TEMPORARY_BLOCKED.
    */
    state: string;
    
    /**
    * Type of card: credit, debit/bankcard. Possible Values: BANK_CARD (used for debit card too), CREDIT
    */
    type: string;
    
    /**
    * Credit card provider/issuer: Erste Bank or external bank. Possible Values: ERSTE_BANK, EXTERNAL
    */
    provider: string;
    
    /**
    * Indicates reason for locking the card. Possible Values: THEFT, LOSS, FRAUD, OTHER
    */
    lockReason?: string;
    
    /**
    * Card characteristics. Possible values: MAIN, AUTHORIZED
    */
    characteristics?: string;
    
    /**
    * For credit card: Loan limit for card (shadow) account.
    */
    limit?: Amount;
    
    /**
    * Disposable balance of current account linked to debit/bank card or Available balance of credit card (disposable balance of shadow account). Not available for all cards or states (locked, closed, unknown).
    */
    balance?: Amount;
    
    /**
    * Total outstanding/owed amount for credit card (the last known value).
    */
    outstandingAmount?: Amount;
    
    /**
    * Minimal installment repayment amount for credit card (at previous cycle end date).
    */
    minimalMonthlyAmount?: Amount;
    
    /**
    * Installment repayment due date.
    */
    installmentDueDate?: Date;
    
    /**
    * Information about the main account.
    */
    mainAccount?: CardsMainAccount;
    
    /**
    * Information about the main account's limits.
    */
    "cz-overallCardAccountLimits"?: CardsAccountLimits;
    
    /**
    * Indicates how a client receives their card and pin. Possible values: BRANCH, HOME, OTHER_BRANCH, ADDRESS_ABROAD.
    */
    cardDeliveryMode?: string;
    
    /**
    * Array of optional features valid for given card.
    */
    features?: [string];
    
    /**
    * Array of optional Flag values depends on Card type.
    */
    flags?: [string];
    
    /**
     * Convenience method for getting detail of the card right from the list 
     */
    get: () => Promise<Card>;
    
    /**
    * Convenience method for updating card's settings
    */
    update: (payload: ChangeCardsSettingsRequest) => Promise<ChangeCardsSettingsResponse>;
    
    /**
    * Convenience getter for getting card's delivery resource
    */
    delivery: CardsDeliveryResource;
    
    /**
    * Convenience getter for getting card's transactions resource
    */
    transactions: CardsTransactionsResource;
    
    /**
    * Convenience getter for getting card's actions resource
    */
    actions: CardsActionsResource;
    
    /**
    * Convenience getter for getting card's limits resource
    */
    limits: CardsLimitsResource;
    
    /**
    * Convenience getter for getting card's 3D Secure resource
    */
    secure3d: CardsSecure3DResource;
    
    /**
    * Convenience getter for getting card's transfer resource
    */
    transfer: CardsTransferResource;
    
    /**
    * Convenience getter for getting card's accounts resource
    */
    accounts: CardsAccountsResource;
}

export interface CardsAccountLimits {
    
    /**
    * Daily ATM limit on credit line. Daily ATM limit for all credit cards issued to mainAccount.
    */
    limitATM?: Amount;
    
    /**
    * Daily POS limit on credit line. Daily POS limit for all credit cards issued to mainAccount.
    */
    limitPOS?: Amount;
}

export interface CardsMainAccount {
    
    /**
    * Internal ID as reference for account provided by BE
    */
    id?: string;
    
    /**
    * Full name of the main account's holder.
    */
    holderName: string;
    
    /**
    * Main account is credit card shadow account for credit card or linked main current account for bank/debit card.
    */
    accountno: AccountNumber;
}

export interface ChangeCardsSettingsResponse extends Card, Signable {
    
    /**
    * ID of the branch
    */
    branchId?: string;
} 

export interface ChangeCardsSettingsRequest {
    
    /**
    * Alias of the card
    */
    alias?: string;
}