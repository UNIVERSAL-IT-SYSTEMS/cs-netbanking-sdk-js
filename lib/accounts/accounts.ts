/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Signable, AccountNumber, Amount, NetbankingParameters} from '../common';
import {AccountsBalanceResource} from './balance';
import {AccountsServicesResource} from './services';
import {AccountsReservationsResource} from './reservations';
import {AccountsRepaymentsResource} from './repayments';
import {AccountsStatementsResource} from './statements';
import {AccountsSubAccountsResource} from './subAccounts';
import {AccountsTransactionsResource} from './transactions';
import {AccountsTransferResource} from './transfer';

/**
* List all accounts and get individual account instance resource 
*/
export class AccountsResource extends CSCoreSDK.Resource 
implements CSCoreSDK.HasInstanceResource<AccountResource>, CSCoreSDK.PaginatedListEnabled<MainAccount> {
    
   /**
    * List all accounts
    */
    list = (params?: AccountsParameters) : Promise<AccountsList> => {
        
        // transform "sort" and "order" parameters to comma separated list from array
        CSCoreSDK.EntityUtils.transformArrayParamsToString(params, ['sort', 'order']);
        
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'accounts', params, response => {
            response.items.forEach(item => {
                
                // add convenient methods
                resourcifyListing(<MainAccount>item, this.withId((<MainAccount>item).id), true);
                
                // transform ISO dates to native Date objects
                transformResponse(<MainAccount>item);
            });
            return response;
        });
    }
    
    /**
    * Get the detail of the account with a given id
    */
    withId = (id: string|number) : AccountResource => {
        return new AccountResource(id, this.getPath(), this._client);
    }
}

/**
* Get detail of the individual account and additional information about it 
*/
export class AccountResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.GetEnabled<MainAccount>, CSCoreSDK.UpdateEnabled<ChangeAccountsSettingsRequest, ChangeAccountsSettingsResponse> {
    
    /**
    * Get account detail
    */
    get = (): Promise<MainAccount> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null).then(response => {
            
            // add convenience methods
            resourcifyListing(<MainAccount>response, this, false);
            
            // transform ISO dates to native Date objects
            transformResponse(<MainAccount>response);
            
            return response;
        });
    }
    
    /**
    * Update account's settings. 
    */  
    update = (payload: ChangeAccountsSettingsRequest): Promise<ChangeAccountsSettingsResponse> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {
            
            // add convenience methods
            resourcifyListing(<MainAccount>response, this, false);
            
            // transform ISO dates to native Date objects
            transformResponse(<MainAccount>response);
            
            return response;
        });
    }
    
    /**
    * Get information about the account's balance
    */
    get balance() {
        return new AccountsBalanceResource(this.getPath() + '/balance', this._client);
    }
    
    /**
    * Get information about the account's services
    */
    get services() {
        return new AccountsServicesResource(this.getPath() + '/services', this._client);
    }
    
    /**
    * Get information about the account's reservations
    */
    get reservations() {
        return new AccountsReservationsResource(this.getPath() + '/reservations', this._client);
    }
    
    /**
    * Get information about the account's repayments
    */
    get repayments() {
        return new AccountsRepaymentsResource(this.getPath() + '/repayments', this._client);
    }
    
    /**
    * Get information about the account's statements
    */
    get statements() {
        return new AccountsStatementsResource(this.getPath() + '/statements', this._client);
    }
    
    /**
    * Get information about the account's subaccounts
    */
    get subAccounts() {
        return new AccountsSubAccountsResource(this.getPath() + '/subaccounts', this._client);
    }
    
    /**
    * Get information about the account's transactions
    */
    get transactions() {
        return new AccountsTransactionsResource(this.getPath() + '/transactions', this._client);
    }
    
    /**
    * Revolve a loan
    */
    get transfer() {
        return new AccountsTransferResource(this.getPath() + '/transfer', this._client);
    }
}

function resourcifyListing(accountListing: MainAccount, account: AccountResource, isFromList: boolean) : void {
    if(isFromList) {
        accountListing.get = account.get;    
    }
    accountListing.update = account.update;
    accountListing.services = account.services;
    accountListing.transactions = account.transactions;
    accountListing.reservations = account.reservations;
    accountListing.transfer = account.transfer;
    accountListing.statements = account.statements;
    accountListing.repayments = account.repayments;
}

function transformResponse(accountListing) {
    if(accountListing.saving) {
        CSCoreSDK.EntityUtils.addDatesFromISO('nextProlongation', accountListing.saving);    
    }
    if(accountListing.loan) {
        CSCoreSDK.EntityUtils.addDatesFromISO(['maturityDate', 'drawdownToDate', 'installmentDay', 'nextRateDate'], accountListing.loan);
    }
    if (accountListing.subaccounts) {
        CSCoreSDK.EntityUtils.addDatesToItems('overdraftDueDate', accountListing, 'subaccounts');
    }
    CSCoreSDK.EntityUtils.addDatesFromISO('overdraftDueDate', accountListing);
}

export interface AccountsList extends CSCoreSDK.PaginatedListResponse<MainAccount> {}

export interface MainAccount extends Account {
    
    /**
    * User defined account name. Max. 50 characters
    */
    alias?: string;
    
    /**
    * Account description. Currently account owner name is returned.
    */
    description?: string;
    
    /**
    * Disposable account balance
    */
    disposable?: Amount;
    
    /**
    * Overdraft amount for account
    */
    overdraft?: OverdraftAmount;
    
    /**
    * Due date of overdraft. Only for overdrafts where automatic prolongation is not set.
    */
    overdraftDueDate?: Date;
     
    /**
    * Array of flags
    */
    flags?: [string];
    
    /**
    * Account's subaccounts
    */
    subaccounts?: [SubAccount];
    
    /**
    * Basic debit Interest rate, used for Loan and Mortgage account. Value in percentage, e.g. 11,5 will be displayed as 11,5 %.
    */
    debitInterestRate?: number;
    
    /**
    * For loans (not mortgages) this is interest rate which apply when repayment is delayed. Value in percentage, e.g. 19,5 will be displayed as 19,5 %.
    */
    penaltyInterestRate?: number;
    
    /**
    * Loan of the account
    */
    loan?: Loan;
    
    /**
    * Savings of the account
    */
    saving?: Saving;
    
   /**
    * 
    */
    ownTransferReceivers?: TransferReceivers;
    
    /**
     * Convenience method for getting detail of the account right from the list 
     */
    get: () => Promise<MainAccount>;
    
    /**
    * Convenience method for updating account's details
    */
    update: (payload: ChangeAccountsSettingsRequest) => Promise<ChangeAccountsSettingsResponse>;
    
    /**
    * Convenience getter for getting accounts's services resource
    */
    services: AccountsServicesResource;
    
    /**
    * Convenience getter for getting accounts's transactions resource
    */
    transactions: AccountsTransactionsResource;
    
    /**
    * Convenience getter for getting accounts's reservations resource
    */
    reservations: AccountsReservationsResource;
    
    /**
    * Convenience getter for getting accounts's transfer resource
    */
    transfer: AccountsTransferResource;
    
    /**
    * Convenience getter for getting accounts's statements resource
    */
    statements: AccountsStatementsResource;
    
    /**
    * Convenience getter for getting accounts's repayments resource
    */
    repayments: AccountsRepaymentsResource;
}

export interface OverdraftAmount extends Amount {
    
    /**
    * Due date of overdraft. Only for overdrafts where automatic prolongation is not set.
    */
    dueDate?: Date;
}

export interface SubAccount extends Account {
    
    /**
    * In case of interest rate bands this is the interest rate which applies to value over limit.
    */
    "cz-interestRateOverLimit"?: string;
    
    /**
    * Limit amount for basic credit interest rate used for some saving accounts.
    */
    "cz-interestRateLimit"?: Amount;
}

export interface Account {
    
    /**
    * Unique product id
    */
    id: string;
    
    /**
    * Account number of this account
    */
    accountno: AccountNumber;
    
    /**
    * Product type. Possible values are CURRENT (for current accounts), SAVING (for saving accounts), LOAN (for loans)
    */
    type: string;
    
    /**
    * Subtype product. Possible values are mapping based on type. For CURRENT (CURRENT_ACCOUNT, INVESTMENT_CURRENT_ACCOUNT, 
    * GIRO_ACCOUNT, GIRO_ACCOUNT_OLD, FOREIGN_ACCOUNT, INVESTMENT_FOREIGN_ACCOUNT), SAVING (DEPOSIT_ACCOUNT, SAVINT_ACCOUNT, 
    * SAVING_INTERNET, CHILDREN_PASSBOOK, SAVING_CS, BENEFIT_INVEST), LOAN (LOAN_ACCOUNT, MORTGAGE, REVOLVING_LOAN).
    */
    subtype: string;
    
    /**
    * Product code.
    */
    product: string;
    
    /**
    * Product description localized
    */
    productI18N: string;
    
    /**
    * Actual account balance. For loans this field contains outstanding principal
    */
    balance: Amount;
    
    /**
    * Basic credit Interest rate, used for Current and Saving account. Value in percentage, e.g. 0,5 will be displayed as 0,5 %
    */
    creditInterestRate: number;
}

export interface Loan {
    
    /**
    * For mortgages this is the date of interest rate validity.
    */
    interestRateToDate?: number;
    
    /**
    * For loans this is contracted value of the loan.
    */
    loanAmount?: Amount;
    
    /**
    * For mortgages this is its maturity date.
    */
    maturityDate?: Date;
    
    /**
    * For loans this is remaining amount for utilization. Basically this is disposable balance for loans.
    */
    remainingLoanAmount: Amount;
    
    /**
    * For loans and morgages this is last date when you can use money.
    */
    drawdownToDate?: Date;
    
    /**
    * For mortgages this is actual drawdown amount.
    */
    drawdownAmount: Amount;
    
    /**
    * For loans and mortgages this is value of the principal. Value which should be paid back to bank.
    */
    outstandingDebt?: Amount;
    
    /**
    * Amount of money to onetime repay whole loan.
    */
    "cz-lumpsumRepayment"?: Amount;
    
    /**
    * Frequency of the repayment. Possible values are MONTHLY, QUARTERLY, HALFYEARLY, YEARLY, WEEKLY.
    */
    installmentFrequency?: string;
    
    /**
    * Day of the month when repayment should be paid (f.e. 22)
    */
    installmentDay?: Date;
    
    /**
    * Loans and mortgages repayment amount.
    */
    nextRateAmount?: Amount;
    
    /**
    * Next date of the repayment (for loans).
    */
    nextRateDate?: Date;
}

export interface Saving {
    
    /**
    * In case of interest rate bands this is the interest rate which applies to value over limit.
    */
    interestRateOverLimit?: number;
    
    /**
    * Limit amount for basic credit interest rate used for some saving accounts.
    */
    interestRateLimit?: Amount;
    
    /**
    * Bonus interest rates which can be gained if certain conditions are met.
    */
    "cz-bonusInterestRate"?: number;
    
    /**
    * Saving purpose code (for some savings accounts). Possible values are ELECTRONICS, WHITE_GOODS, HOLIDAYS, SPORT_EQUIPMENT, FURNITURE, CARS_AND_ACCESSORIES, HOBBIES_AND_GARDEN, GIFTS_AND_PARTIES, HEALTH, STUDIES, HOUSING, PERSONAL.
    */
    savingGoal?: number;
    
    /**
    * For some savings accounts this is target amount of the saving.
    */
    targetAmount?: Amount;
    
    /**
    * Minimum balance for some current and savings accounts.
    */
    minimumBalance?: Amount;
    
    /**
    * The next prolongation date, when BE system will automatically credit regular deposit amount on saving account or calculate and transfer interest on term deposit.
    */
    nextProlongation: Date;
    
    /**
    * Maximum amount of own transfer from current (master) to saving account (slave, this) used only for some saving accounts. Currently used only for Individualní spoření. Field contains maximum amount for current month (maximum for month minus already executed payments in current month).
    */
    extraSavingMaximum?: Amount;
    
    /**
    * Maximum amount of own transfer from current (master) to saving account (slave, this) used only for some saving accounts. Currently used only for Individualni sporeni. Field contains maximum possible amount for all months (regardless already created payments).
    */
    "cz-extraSavingMaximumMonthly"?: Amount;
}

export interface TransferReceivers {
    
    /**
    * Identifier of the account which is allowed as a transfer receiver. If id is specified then you can find it among other accounts in GET /netbanking/my/accounts response.
    */
    id: number;
    
    /**
    * Account number which is allowed as a transfer receiver.
    */
    accountno: AccountNumber;
}

export interface ChangeAccountsSettingsRequest {
    
    /**
    * User defined account name. Max. 50 characters 
    */
    alias?: string;
}

export interface ChangeAccountsSettingsResponse extends MainAccount, Signable {}

export interface AccountsParameters extends NetbankingParameters {
    
    /**
    * Example: CURRENT.
    */
    type?: string;
}