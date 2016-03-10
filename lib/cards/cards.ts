/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount, AccountNumber, Signed} from '../common';
import {CardDeliveryResource} from './delivery';
import {CardTransactionsResource} from './transactions';
import {CardActionsResource} from './actions';
import {CardLimitsResource} from './limits';
import {CardSecure3DResource} from './secure3D';

export class CardsResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<Card>, CSCoreSDK.HasInstanceResource<CardResource> {
    
    list = (params?) : Promise<CardListing> => {
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'cards', params, response => {
            response.items.forEach(item => {
                resourcifyListing(item, this.withId((<Card>item).id));
            })
            return response;
        });
    }
    
    withId = (id: string) : CardResource => {
        return new CardResource(id, this.getPath(), this.getClient());
    }
}

export class CardResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.GetEnabled<Card>, CSCoreSDK.UpdateEnabled<ChangeCardSettingsRequest, ChangeCardSettingsResponse> {
    
    get = () : Promise<Card> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null);
    }
    
    get delivery() {
        return new CardDeliveryResource(this.getPath() + '/delivery', this._client);
    }
    
    get transactions() {
        return new CardTransactionsResource(this.getPath() + '/transactions', this._client);
    }
    
    get actions() {
        return new CardActionsResource(this.getPath() + '/states', this._client);
    }
    
    get limits() {
        return new CardLimitsResource(this.getPath() + '/card-limits', this._client);
    }
    
    get secure3d() {
        return new CardSecure3DResource(this.getPath() + '/secure-online-shopping', this._client);
    }
}

function resourcifyListing(itemListing: Card, itemResource: CardResource) {
    itemListing.get = itemResource.get;
}

export interface CardListing extends CSCoreSDK.PaginatedListResponse<Card> {}

export interface Card {
    
    /**
    * unique product id
    */
    id: string,
    
    /**
    * Users product name. Max. 50 characters.
    */
    alias?: string,
    
    /**
    * product owner
    */
    owner: string,
    
    /**
    * card number
    */
    number: string,
    
    /**
    * Card sequence number. The number distinguishing between separate cards (different plastic cards) with the same Primary Account Number (PAN)
    */
    sequenceNumber: string,
    
    /**
    * Localized product name.
    */
    productI18N: string,
    
    /**
    * Internal product code.
    */
    productCode?: string,
    
    /**
    * Expiration date of particular plastic card
    */
    expiryDate?: Date,
    
    /**
    * Date from which this particular plastic card is valid
    */
    validFromDate?: Date,
    
    /**
    * Current state of card. Possible values: ACTIVE, INACTIVE (issued card not activated yet), TEMPORARY_BLOCKED.
    */
    state: string,
    
    /**
    * Type of card: credit, debit/bankcard. Possible Values: BANK_CARD (used for debit card too), CREDIT
    */
    type: string,
    
    /**
    * Credit card provider/issuer: Erste Bank or external bank. Possible Values: ERSTE_BANK, EXTERNAL
    */
    provider: string,
    
    /**
    * Indicates reason for locking the card. Possible Values: THEFT, LOSS, FRAUD, OTHER
    */
    lockReason?: string,
    
    /**
    * Card characteristics. Possible values: MAIN, AUTHORIZED
    */
    characteristics?: string,
    
    /**
    * For credit card: Loan limit for card (shadow) account.
    */
    limit?: Amount,
    
    /**
    * Disposable balance of current account linked to debit/bank card or Available balance of credit card (disposable balance of shadow account). Not available for all cards or states (locked, closed, unknown).
    */
    balance?: Amount,
    
    /**
    * Total outstanding/owed amount for credit card (the last known value).
    */
    outstandingAmount?: Amount,
    
    /**
    * Minimal installment repayment amount for credit card (at previous cycle end date).
    */
    minimalMonthlyAmount?: Amount,
    
    /**
    * Installment repayment due date.
    */
    installmentDueDate?: Date,
    
    /**
    * Information about the main account.
    */
    mainAccount?: MainAccount,
    
    /**
    * Information about the main account's limits.
    */
    // cz-overallCardAccountLimits?: CardAccountLimits,
    
    /**
    * Indicates how a client receives their card and pin. Possible values: BRANCH, HOME, OTHER_BRANCH, ADDRESS_ABROAD.
    */
    cardDeliveryMode?: string,
    
    /**
    * Array of optional features valid for given card.
    */
    features?: [string],
    
    /**
    * Array of optional Flag values depends on Card type.
    */
    flags?: [string],
    
    /**
     * Convenience method for getting detail of the card right from the list 
     */
    get: () => Promise<Card>
}

export interface CardAccountLimits {
    
    /**
    * Daily ATM limit on credit line. Daily ATM limit for all credit cards issued to mainAccount.
    */
    limitATM?: Amount,
    
    /**
    * Daily POS limit on credit line. Daily POS limit for all credit cards issued to mainAccount.
    */
    limitPOS?: Amount
}

export interface MainAccount {
    
    /**
    * Internal ID as reference for account provided by BE
    */
    id?: string,
    
    /**
    * Full name of the main account's holder.
    */
    holderName: string,
    
    /**
    * Main account is credit card shadow account for credit card or linked main current account for bank/debit card.
    */
    accountno: AccountNumber
}

export interface ChangeCardSettingsResponse extends Card, Signed {
    
    /**
    * Minimal installment repayment amount for credit card (at previous cycle end date).
    */
    minimalMonthlyAmount?: Amount,
    
    /**
    * ID of the branch
    */
    branchId?: string,
} 

export interface ChangeCardSettingsRequest {
    
    /**
    * ID of the card
    */
    id?: string,
    
    /**
    * Alias of the card
    */
    alias?: string
}