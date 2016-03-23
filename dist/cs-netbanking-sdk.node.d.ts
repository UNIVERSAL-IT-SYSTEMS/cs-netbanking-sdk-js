declare module 'cs-netbanking-sdk/common' {
	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	export interface Signed {
	    /**
	    * Infomation about the signing
	    */
	    signInfo?: SignInfo;
	}
	export interface SignInfo {
	    /**
	    * State of signing process.
	    */
	    state: string;
	    /**
	    * Hash value.
	    */
	    signId?: number;
	}
	export interface AccountNumber {
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
	    "cz-iban"?: string;
	    /**
	    * BIC
	    */
	    "cz-bic"?: string;
	}
	export interface Amount {
	    /**
	    * Value of an amount. Number without decimal part.
	    */
	    value: number;
	    /**
	    * Precision of the amount. How many digits from value fields should be considered to be decimal.
	    */
	    precision: number;
	    /**
	    * Currency of the amount.
	    */
	    currency: string;
	}
	export interface StatementList extends CSCoreSDK.PaginatedListResponse<Statement> {
	}
	export interface Statement {
	    /**
	    * Identifier of statement in BE system.
	    */
	    id: string;
	    /**
	    * Statement sequence number.
	    */
	    number: number;
	    /**
	    * Timestamp of statement creation.
	    */
	    statementDate: Date;
	    /**
	    * Periodicity of account statement creation. Possible values are: DAILY, WEEKLY, BI_WEEKLY, MONTHLY, QUARTERLY, HALFYEARLY, YEARLY, 10_YAERLY, OTHER
	    */
	    periodicity: string;
	    /**
	    * Statement format. Possible value is PDF_A4
	    */
	    format?: string;
	    /**
	    * Language version of created statement. ISO 639-1 ENUM values: en, de, cs, sk, hr, sr, ro, hu, fr (fr is local specific)
	    */
	    language: string;
	}
	export interface AddNoteAndMarkTransactionsRequest {
	    /**
	    * Personal, user specific note for transaction. Max. 4 000 characters.
	    */
	    note?: string;
	    /**
	    * List of flags.
	    */
	    flags?: [string];
	}
	export interface AddNoteAndMarkTransactionsResponse extends Signed {
	    /**
	    * Transactions information
	    */
	    transaction: Transaction;
	}
	export interface TransactionList extends CSCoreSDK.PaginatedListResponse<Transaction>, Signed {
	}
	export interface Transaction {
	    /**
	    * Transaction identifier.
	    */
	    id: string;
	    /**
	    * Personal, user specific note for transaction. Max. 4 000 characters.
	    */
	    note?: string;
	    /**
	    * List of flags.
	    */
	    flags?: [string];
	}
	export interface Parameters extends CSCoreSDK.Paginated {
	    /**
	    * Comma separated list of fields which should be used for sorting. Sort priorities are left to right. Example: statementDate.
	    */
	    sort?: string;
	    /**
	    * The optional sorting order can be either asc or desc (case insensitive), with asc as default. If sort field contains multiple fields then desc field should contain comma separated list of orders for these fields. Example: desc.
	    */
	    order?: string;
	}

}
declare module 'cs-netbanking-sdk/accounts/balance' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { Amount } from 'cs-netbanking-sdk/common';
	/**
	* Get information about the account's balance
	*/
	export class AccountsBalanceResource extends CSCoreSDK.Resource implements CSCoreSDK.GetEnabled<BalanceListing> {
	    /**
	    * Fetches the balance and returns them in a promise
	    */
	    get: () => Promise<BalanceListing>;
	}
	export interface BalanceListing {
	    /**
	    * Account balance for Current, Saved amount for Saving, Principal Outstanding for Loan/Mortgage.
	    */
	    balance: Amount;
	    /**
	    * Disposable balance for Current account.
	    */
	    disposable?: Amount;
	    /**
	    * Overdraft amount for Current account.
	    */
	    overdraft?: Amount;
	}

}
declare module 'cs-netbanking-sdk/accounts/services' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	/**
	* Get information about the account's services
	*/
	export class AccountsServicesResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Service> {
	    /**
	    * Fetches the services and returns them in a promise
	    */
	    list: (params?: ServicesParameters) => Promise<ServiceList>;
	}
	export interface ServiceList extends CSCoreSDK.PaginatedListResponse<Service> {
	}
	export interface Service {
	    /**
	    * Service identifier.
	    */
	    id: string;
	    /**
	    * Localized name of the service.
	    */
	    nameI18N: string;
	    /**
	    * Information about service group. There is an icon defined for every group.
	    */
	    iconGroup: string;
	    /**
	    * Service is active from date.
	    */
	    dateFrom?: Date;
	    /**
	    * Service will be active till date.
	    */
	    dateTo?: Date;
	}
	export interface ServicesParameters extends CSCoreSDK.Paginated {
	}

}
declare module 'cs-netbanking-sdk/accounts/reservations' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { Amount } from 'cs-netbanking-sdk/common';
	/**
	* Get information about the account's reservations
	*/
	export class AccountsReservationsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Reservation> {
	    /**
	    * Fetches the reservations and returns them in a promise
	    */
	    list: (params?: ReservationsParameters) => Promise<ReservationList>;
	}
	export interface ReservationList extends CSCoreSDK.PaginatedListResponse<Reservation> {
	}
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
	export interface ReservationsParameters extends CSCoreSDK.Paginated {
	}

}
declare module 'cs-netbanking-sdk/accounts/repayments' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { Amount } from 'cs-netbanking-sdk/common';
	/**
	* Get information about the account's repayments
	*/
	export class AccountsRepaymentsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<Repayment> {
	    /**
	    * Fetches the repayments and returns them in a promise
	    */
	    list: () => Promise<RepaymentList>;
	}
	export interface RepaymentList extends CSCoreSDK.PaginatedListResponse<Repayment> {
	}
	export interface Repayment {
	    /**
	     * Date of the repayment.
	     */
	    repaymentDate: Date;
	    /**
	     * Repayment amount. What should be paid.
	     */
	    amount: Amount;
	    /**
	     * Actual paid amount.
	     */
	    paidAmount?: Amount;
	}

}
declare module 'cs-netbanking-sdk/accounts/statements' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { StatementList, Statement, Parameters } from 'cs-netbanking-sdk/common';
	/**
	* Get information about the account's statements
	*/
	export class AccountsStatementsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Statement> {
	    /**
	    * Fetches the statements and returns them in a promise
	    */
	    list: (params?: Parameters) => Promise<StatementList>;
	}

}
declare module 'cs-netbanking-sdk/accounts/subAccounts' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { StatementList, Statement, Parameters } from 'cs-netbanking-sdk/common';
	/**
	* Get individual SubAccount resource
	*/
	export class AccountsSubAccountsResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<SubAccountResource> {
	    /**
	    * Returns individual SubAccount resource with a given id
	    */
	    withId: (id: string | number) => SubAccountResource;
	}
	/**
	* Get information about the subaccount
	*/
	export class SubAccountResource extends CSCoreSDK.InstanceResource {
	    /**
	    * Get information about the subaccount's statements
	    */
	    statements: SubAccountStatementsResource;
	}
	/**
	* List all subaccount's statements
	*/
	export class SubAccountStatementsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Statement> {
	    /**
	    * Returns all subaccount's statements in a promise
	    */
	    list: (params?: Parameters) => Promise<StatementList>;
	}

}
declare module 'cs-netbanking-sdk/accounts/transactions' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { TransactionList, Transaction, Parameters, AddNoteAndMarkTransactionsRequest, AddNoteAndMarkTransactionsResponse } from 'cs-netbanking-sdk/common';
	/**
	* Get individual AccountsTransactionsResource
	*/
	export class AccountsTransactionsResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<AccountsTransactionResource>, CSCoreSDK.ListEnabled<Transaction> {
	    /**
	    * Returns list of transactions
	    */
	    list: (params?: Parameters) => Promise<TransactionList>;
	    /**
	    * Returns individual AccountsTransactionResource with a given id
	    */
	    withId: (id: string | number) => AccountsTransactionResource;
	    export: (params: any) => Promise<{}>;
	}
	/**
	* Allows to add or change a client's personal transaction note and mark the transaction as favorite/important for one specific transaction on selected account.
	*/
	export class AccountsTransactionResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionsRequest, AddNoteAndMarkTransactionsResponse> {
	    /**
	    * Adds, changes of marks transaction
	    */
	    update: (payload: AddNoteAndMarkTransactionsRequest) => Promise<AddNoteAndMarkTransactionsResponse>;
	}

}
declare module 'cs-netbanking-sdk/accounts/transfers' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { Signed, Amount } from 'cs-netbanking-sdk/common';
	/**
	* Revolve a loan
	*/
	export class AccountsTransfersResource extends CSCoreSDK.Resource implements CSCoreSDK.UpdateEnabled<TransferRequest, TransferResponse> {
	    /**
	    * Revolves the loan. Currently only REVOLVING_LOAN subtype is supported.
	    */
	    update: (payload: TransferRequest) => Promise<TransferResponse>;
	}
	export interface TransferResponse extends Signed {
	}
	export interface TransferRequest {
	    /**
	     * Type of the transfer. Currently only REVOLVING_LOAN_DISBURSEMENT is supported.
	     */
	    type: string;
	    /**
	    * Amount which should be transfered.
	    */
	    amount: Amount;
	    /**
	    * Payment transfer date.
	    */
	    transferDate: Date;
	    /**
	    * Note for the recipient.
	    */
	    recipientNote?: string;
	}

}
declare module 'cs-netbanking-sdk/accounts/accounts' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { Signed, AccountNumber, Amount, Parameters } from 'cs-netbanking-sdk/common';
	import { AccountsBalanceResource } from 'cs-netbanking-sdk/accounts/balance';
	import { AccountsServicesResource } from 'cs-netbanking-sdk/accounts/services';
	import { AccountsReservationsResource } from 'cs-netbanking-sdk/accounts/reservations';
	import { AccountsRepaymentsResource } from 'cs-netbanking-sdk/accounts/repayments';
	import { AccountsStatementsResource } from 'cs-netbanking-sdk/accounts/statements';
	import { AccountsSubAccountsResource } from 'cs-netbanking-sdk/accounts/subAccounts';
	import { AccountsTransactionsResource } from 'cs-netbanking-sdk/accounts/transactions';
	import { AccountsTransfersResource } from 'cs-netbanking-sdk/accounts/transfers';
	/**
	* List all accounts and get individual account instance resource
	*/
	export class AccountsResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<AccountResource>, CSCoreSDK.PaginatedListEnabled<MainAccount> {
	    /**
	     * List all accounts
	     */
	    list: (params?: AccountsParameters) => Promise<AccountList>;
	    /**
	    * Get the detail of the account with a given id
	    */
	    withId: (id: string | number) => AccountResource;
	}
	/**
	* Get detail of the individual account and additional information about it
	*/
	export class AccountResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<MainAccount>, CSCoreSDK.UpdateEnabled<ChangeAccountSettingsRequest, ChangeAccountSettingsResponse> {
	    /**
	    * Get account detail
	    */
	    get: () => Promise<MainAccount>;
	    /**
	    * Update account's alias
	    */
	    update: (payload: ChangeAccountSettingsRequest) => Promise<ChangeAccountSettingsResponse>;
	    /**
	    * Get information about the account's balance
	    */
	    balance: AccountsBalanceResource;
	    /**
	    * Get information about the account's services
	    */
	    services: AccountsServicesResource;
	    /**
	    * Get information about the account's reservations
	    */
	    reservations: AccountsReservationsResource;
	    /**
	    * Get information about the account's repayments
	    */
	    repayments: AccountsRepaymentsResource;
	    /**
	    * Get information about the account's statements
	    */
	    statements: AccountsStatementsResource;
	    /**
	    * Get information about the account's subaccounts
	    */
	    subAccounts: AccountsSubAccountsResource;
	    /**
	    * Get information about the account's transactions
	    */
	    transactions: AccountsTransactionsResource;
	    /**
	    * Revolve a loan
	    */
	    transfers: AccountsTransfersResource;
	}
	export interface AccountList extends CSCoreSDK.PaginatedListResponse<MainAccount> {
	}
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
	    update: (payload: ChangeAccountSettingsRequest) => Promise<ChangeAccountSettingsResponse>;
	    services: AccountsServicesResource;
	    transactions: AccountsTransactionsResource;
	    reservations: AccountsReservationsResource;
	    transfers: AccountsTransfersResource;
	    statements: AccountsStatementsResource;
	    repayments: AccountsRepaymentsResource;
	}
	export interface ChangeAccountSettingsResponse extends MainAccount, Signed {
	}
	export interface OverdraftAmount extends Amount {
	    /**
	    * Due date of overdraft. Only for overdrafts where automatic prolongation is not set.
	    */
	    dueDate?: Date;
	}
	export interface SubAccount extends Account {
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
	export interface ChangeAccountSettingsRequest {
	    /**
	    * Account indentifier
	    */
	    id?: string;
	    /**
	    * User defined account name. Max. 50 characters
	    */
	    alias?: string;
	}
	export interface AccountsParameters extends Parameters {
	    /**
	    * Example: CURRENT.
	    */
	    type?: string;
	}

}
declare module 'cs-netbanking-sdk/profile/lastLogin' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	/**
	 * List all past logins
	 */
	export class LastLoginResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<LastLoginInfo> {
	    /**
	     * Returns promise with a list of past logins
	     */
	    list: () => Promise<LastLoginList>;
	}
	export interface LastLoginList extends CSCoreSDK.ListResponse<LastLoginInfo> {
	}
	export interface LastLoginInfo {
	    /**
	    * Channel of the last login.
	    */
	    channel: string;
	    /**
	    * Date of the last login.
	    */
	    lastlogin: Date;
	}

}
declare module 'cs-netbanking-sdk/profile/profile' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { LastLoginResource } from 'cs-netbanking-sdk/profile/lastLogin';
	/**
	* Get information about the profile and past logins.
	*/
	export class ProfileResource extends CSCoreSDK.Resource implements CSCoreSDK.GetEnabled<Profile> {
	    /**
	     * Returns information about the profile
	     */
	    get: () => Promise<Profile>;
	    /**
	     * Returns LastLoginResource for listing past logins
	     */
	    lastLogin: LastLoginResource;
	}
	export interface Profile {
	    /**
	    * user's first name
	    */
	    firstName: string;
	    /**
	    * user's last name
	    */
	    lastName: string;
	    /**
	    * user's name used for salutation
	    */
	    salutation?: string;
	    /**
	    * customer's id
	    */
	    customerId: string;
	    /**
	    * number of institute
	    */
	    institudeId: number;
	    /**
	    * Has the customer approved §107 telecommunication act. Possible values: ACCEPTED, NOT_ACCEPTED, UNKNOWN.
	    */
	    marketingInfoAcceptance: string;
	    /**
	    * user's gender. Possible values: MALE, FEMALE, UNKNOWN.
	    */
	    gender: string;
	    /**
	    * Date and time of the last login of customer. Common last login for all client applications - George, QC, etc.
	    */
	    lastlogin?: Date;
	}

}
declare module 'cs-netbanking-sdk/cards/delivery' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { Signed } from 'cs-netbanking-sdk/common';
	/**
	 * Get current delivery settings
	 */
	export class CardDeliveryResource extends CSCoreSDK.Resource implements CSCoreSDK.GetEnabled<DeliveryListing>, CSCoreSDK.UpdateEnabled<ChangeDeliverySettingsRequest, ChangeDeliverySettingsResponse> {
	    /**
	     * Returns current delivery settings
	     */
	    get: () => Promise<DeliveryListing>;
	    /**
	     * Change current delivery settings
	     */
	    update: (payload: ChangeDeliverySettingsRequest) => Promise<ChangeDeliverySettingsResponse>;
	}
	export interface DeliveryListing {
	    /**
	    * Type of the delivery which should be set for this card. Possible values are BRANCH, OTHER_BRANCH, HOME, ADDRESS_ABROAD.
	    */
	    cardDeliveryMode: string;
	    /**
	    * Identification of the branch where card will be ready to takeover.
	    */
	    branchId: string;
	    /**
	    * Address where card should be sent.
	    */
	    address: Address;
	}
	export interface Address {
	    /**
	    * Street of the address.
	    */
	    street: string;
	    /**
	    * Number which is unique in street. Not all localities have streets.
	    */
	    streetNumber?: number;
	    /**
	    * Number which is unique in locality/town/village.
	    */
	    buildingApartment?: string;
	    /**
	    * Zip code of the address.
	    */
	    zipCode?: string;
	    /**
	    * City
	    */
	    city: string;
	    /**
	    * Address country.
	    */
	    country: string;
	    /**
	    * Information about the confirmation
	    */
	    confirmations?: [Confirmation];
	}
	export interface Confirmation {
	    /**
	    * Email
	    */
	    email: string;
	    /**
	    * Language
	    */
	    language: string;
	}
	export interface ChangeDeliverySettingsResponse extends DeliveryListing, Signed {
	}
	export interface ChangeDeliverySettingsRequest extends CSCoreSDK.PaginatedListResponse<Confirmation> {
	    /**
	    * Indicates how a client receives their card and pin. Possible values: BRANCH, HOME, OTHER_BRANCH, ADDRESS_ABROAD.
	    */
	    cardDeliveryMode: string;
	}

}
declare module 'cs-netbanking-sdk/cards/transactions' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { AddNoteAndMarkTransactionsRequest, AddNoteAndMarkTransactionsResponse } from 'cs-netbanking-sdk/common';
	/**
	* Allows to add or change a client's personal note and mark/star the card transaction as favorite/important for one specific transaction
	*/
	export class CardTransactionsResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<CardTransactionResource> {
	    /**
	     * Returns CardTransactionResource for a given id
	     */
	    withId: (id: string) => CardTransactionResource;
	    /**
	     * Export transactions to PDF
	     */
	    export: (params: CardTransactionsParameters) => any;
	}
	/**
	 * Add or change a client's personal note and mark/star the card transaction as favorite/important
	 */
	export class CardTransactionResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionsRequest, AddNoteAndMarkTransactionsResponse> {
	    /**
	    * Adds, changes of marks transaction
	    */
	    update: (payload: AddNoteAndMarkTransactionsRequest) => Promise<AddNoteAndMarkTransactionsResponse>;
	}
	export interface CardTransactionsParameters {
	    /**
	     * Date from which transactions should be exported. Example: 1999-09-27T00%3A00%3A00%2B02%3A00.
	     */
	    dateFrom: string;
	    /**
	     * Date to which transactions should be exported Example: 2000-09-27T00%3A00%3A00%2B02%3A00.
	     */
	    dateTo: string;
	    /**
	     * Array of fields which should appear in export. Possible fields are: bookingDate, partner, amount, currency, variableSymbol, constantSymbol, specificSymbol, transactionType, note, paymentReference, senderReference, cardNumber, investmentInstrumentName, marked, valuationDate, referenceId,
	     * location Example: bookingDate,partner,amount,currency.
	     */
	    fields: string;
	    /**
	     * Indication whether account name should be visible in export. Default is false. Example: true.
	     */
	    showAccountName?: boolean;
	    /**
	     * Indication whether account number should be visible in export. Default is false. Example: true.
	     */
	    showAccountNumber?: boolean;
	    /**
	     * Indication whether timespan of the export should be visible. Default is false. Example: true.
	     */
	    showTimestamp?: boolean;
	    /**
	     * Indication whether balance of the account should be visible in export. Default is false. Example: true.
	     */
	    showBalance?: boolean;
	}

}
declare module 'cs-netbanking-sdk/cards/actions' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { Signed } from 'cs-netbanking-sdk/common';
	import { Confirmation } from 'cs-netbanking-sdk/cards/delivery';
	/**
	 * Issue various actions on a single card.
	 */
	export class CardActionsResource extends CSCoreSDK.Resource implements CSCoreSDK.UpdateEnabled<CardsActionsRequest, CardsActionsResponse> {
	    /**
	     * Issues various actions on a single card
	     */
	    update: (payload: CardsActionsRequest) => Promise<CardsActionsResponse>;
	}
	export interface CardsActionsResponse extends Signed {
	}
	export interface CardsActionsRequest {
	    /**
	     * Action which should be issued. Possible values are "REISSUE_PIN", "LOCK_CARD", "UNLOCK_CARD", "REPLACE_CARD", "ACTIVATE_CARD", "SET_AUTOMATIC_REPLACEMENT_ON", "SET_AUTOMATIC_REPLACEMENT_OFF".
	     */
	    action: string;
	    /**
	    * Reason why card should be locked. Possible values are "THEFT" and "LOSS". Relevant only for action "LOCK_CARD".
	    */
	    lockReason?: string;
	    /**
	    * Information about the confirmation
	    */
	    confirmations?: [Confirmation];
	}

}
declare module 'cs-netbanking-sdk/cards/limits' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { Amount, Signed } from 'cs-netbanking-sdk/common';
	import { Confirmation } from 'cs-netbanking-sdk/cards/delivery';
	/**
	* Get information about different limits
	*/
	export class CardLimitsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<CardsLimit>, CSCoreSDK.UpdateEnabled<ChangeCardLimitsRequest, ChangeCardLimitsResponse> {
	    /**
	     * List all limits
	     */
	    list: () => Promise<CardsLimitList>;
	    /**
	     * Update individual limits
	     */
	    update: (payload: ChangeCardLimitsRequest) => Promise<ChangeCardLimitsResponse>;
	}
	export interface CardsLimitList extends CSCoreSDK.PaginatedListResponse<CardsLimit> {
	}
	export interface CardsLimit {
	    /**
	    * Limit type defines ATM, POS, internet/eCommerce, total limits. Possible Values: ATM, POS, INTERNET
	    */
	    limitType: string;
	    /**
	    * Bank limit's period in days defined for limit type (default daily - 1D). Possible Values: 1D, 2D, 3D, 5D, 7D, 10D, 15D, 30D
	    */
	    limitPeriod: string;
	    /**
	    * Current limit amount valid for limit's type and period
	    */
	    limit?: Amount;
	    /**
	    * Temporary limit amount valid for limit's type and period
	    */
	    temporaryLimit?: Amount;
	    /**
	    * Temporary limit expiration date for limit's type and period. Field is mandatory if temporatyLimits are changed by PUT call. It is possible to set temporaryLimitExpiration up to 120 hours to the future.
	    */
	    temporaryLimitExpiration?: Date;
	    /**
	    * Maximum limit amount for card defined by bank valid for limit's type and period.
	    */
	    bankLimit?: Amount;
	}
	export interface ChangeCardLimitsResponse extends Signed {
	    limits?: [CardsLimit];
	    /**
	    * Information about the confirmation
	    */
	    confirmations?: [Confirmation];
	}
	export interface ChangeCardLimitsRequest {
	    limits?: [CardsLimit];
	    /**
	    * Information about the confirmation
	    */
	    confirmations?: [Confirmation];
	}

}
declare module 'cs-netbanking-sdk/cards/secure3D' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	/**
	 * Get the 3D secure online shopping status
	 */
	export class CardSecure3DResource extends CSCoreSDK.Resource implements CSCoreSDK.GetEnabled<SecureSettings> {
	    /**
	     * Returns 3D secure online shopping status
	     */
	    get: () => Promise<SecureSettings>;
	}
	export interface SecureSettings {
	    /**
	    * 3D secure functionality status. Possible Values: OK, NOT_ACTIVATED
	    */
	    status?: string;
	    /**
	    * Personal Assurance Message (PAM) that user chose when activate 3D secure
	    */
	    pam?: string;
	    /**
	    * Phone (used for OTP authentification) number Id coming from Contacts
	    */
	    phoneNumber?: string;
	    /**
	    * 3D Secure language
	    */
	    language?: string;
	}

}
declare module 'cs-netbanking-sdk/cards/transfers' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { AccountNumber, Amount, Signed } from 'cs-netbanking-sdk/common';
	/**
	 * Resource for paying up credit card debt
	 */
	export class CardTransfersResource extends CSCoreSDK.Resource implements CSCoreSDK.UpdateEnabled<PayUpCreditCardRequest, PayUpCreditCardResponse> {
	    /**
	     * Pays up the credit card debt and returns sign info
	     */
	    update: (payload: PayUpCreditCardRequest) => Promise<PayUpCreditCardResponse>;
	}
	export interface PayUpCreditCardRequest {
	    /**
	    * Type of the transfer. Currently only DEBT_REPAYMENT is supported.
	    */
	    type: string;
	    /**
	    * Information about the sender
	    */
	    sender: Sender;
	    /**
	    * Amount which should be transfered.
	    */
	    amount: Amount;
	}
	export interface Sender {
	    /**
	    * Identification of the source account for the transfer.
	    */
	    id?: string;
	    /**
	    * Account number of the source account for the transfer.
	    */
	    accountno: AccountNumber;
	}
	export interface PayUpCreditCardResponse extends Signed {
	}

}
declare module 'cs-netbanking-sdk/cards/statements' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { StatementList, Statement, Parameters } from 'cs-netbanking-sdk/common';
	/**
	 * Account resource for listing statements
	 */
	export class CardAccountsResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<CardAccountResource> {
	    /**
	     * Returns CardAccountResource for an account with a given id
	     */
	    withId: (id: string) => CardAccountResource;
	}
	/**
	 * Indidiual account resource with a given id
	 */
	export class CardAccountResource extends CSCoreSDK.InstanceResource {
	    /**
	     * Get statements of the account
	     */
	    statements: CardStatementsResource;
	}
	/**
	 * Get statements for an account
	 */
	export class CardStatementsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Statement> {
	    /**
	     * List all statements
	     */
	    list: (params?: Parameters) => Promise<StatementList>;
	    /**
	     * Download PDF with statements
	     */
	    download: (params: DownloadStatementsParameters) => Promise<{}>;
	}
	export interface DownloadStatementsParameters {
	    /**
	     * Format of statements file. Example: PDF_A4.
	     */
	    format: string;
	    /**
	     * Statement identifier. Example: 201302520130621161819.
	     */
	    statementId: string;
	}

}
declare module 'cs-netbanking-sdk/cards/cards' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { Amount, AccountNumber, Signed, Parameters } from 'cs-netbanking-sdk/common';
	import { CardDeliveryResource } from 'cs-netbanking-sdk/cards/delivery';
	import { CardTransactionsResource } from 'cs-netbanking-sdk/cards/transactions';
	import { CardActionsResource } from 'cs-netbanking-sdk/cards/actions';
	import { CardLimitsResource } from 'cs-netbanking-sdk/cards/limits';
	import { CardSecure3DResource } from 'cs-netbanking-sdk/cards/secure3D';
	import { CardTransfersResource } from 'cs-netbanking-sdk/cards/transfers';
	import { CardAccountsResource } from 'cs-netbanking-sdk/cards/statements';
	/**
	* Represents list of payment cards (either debet or credit) for current user. Every card was issued for current user or belongs to one of his accounts.
	*/
	export class CardsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<Card>, CSCoreSDK.HasInstanceResource<CardResource> {
	    /**
	    * List all cards
	    */
	    list: (params?: Parameters) => Promise<CardListing>;
	    /**
	    * Get a resource for card with a given id
	    */
	    withId: (id: string) => CardResource;
	}
	export class CardResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<Card>, CSCoreSDK.UpdateEnabled<ChangeCardSettingsRequest, ChangeCardSettingsResponse> {
	    /**
	    * Get detail of the card
	    */
	    get: () => Promise<Card>;
	    /**
	    * Update card's alias
	    */
	    update: (payload: ChangeCardSettingsRequest) => Promise<ChangeCardSettingsResponse>;
	    /**
	    * Get current delivery settings
	    */
	    delivery: CardDeliveryResource;
	    /**
	    * Allows to add or change a client's personal note and mark/star the card transaction as favorite/important for one specific transaction
	    */
	    transactions: CardTransactionsResource;
	    /**
	    * Issue various actions on a single card. Currently supported actions are:
	    * reissue pin, lock card, unlock card, activate card, set automatic card replacement on, set automatic card replacement off, replacement card request
	    */
	    actions: CardActionsResource;
	    /**
	    * Get information about different limits
	    */
	    limits: CardLimitsResource;
	    /**
	    * Get the 3D secure online shopping status
	    */
	    secure3d: CardSecure3DResource;
	    /**
	    * Resource for paying up credit card debt
	    */
	    transfers: CardTransfersResource;
	    /**
	    * Account resource for listing statements
	    */
	    accounts: CardAccountsResource;
	}
	export interface CardListing extends CSCoreSDK.PaginatedListResponse<Card> {
	}
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
	    mainAccount?: MainAccount;
	    /**
	    * Information about the main account's limits.
	    */
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
	    update: (payload: ChangeCardSettingsRequest) => Promise<ChangeCardSettingsResponse>;
	    /**
	    * Convenience getter for getting card's delivery resource
	    */
	    delivery: CardDeliveryResource;
	    /**
	    * Convenience getter for getting card's transactions resource
	    */
	    transactions: CardTransactionsResource;
	    /**
	    * Convenience getter for getting card's actions resource
	    */
	    actions: CardActionsResource;
	    /**
	    * Convenience getter for getting card's limits resource
	    */
	    limits: CardLimitsResource;
	    /**
	    * Convenience getter for getting card's 3D Secure resource
	    */
	    secure3d: CardSecure3DResource;
	    /**
	    * Convenience getter for getting card's transfers resource
	    */
	    transfers: CardTransfersResource;
	    /**
	    * Convenience getter for getting card's accounts resource
	    */
	    accounts: CardAccountsResource;
	}
	export interface CardAccountLimits {
	    /**
	    * Daily ATM limit on credit line. Daily ATM limit for all credit cards issued to mainAccount.
	    */
	    limitATM?: Amount;
	    /**
	    * Daily POS limit on credit line. Daily POS limit for all credit cards issued to mainAccount.
	    */
	    limitPOS?: Amount;
	}
	export interface MainAccount {
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
	export interface ChangeCardSettingsResponse extends Card, Signed {
	    /**
	    * Minimal installment repayment amount for credit card (at previous cycle end date).
	    */
	    minimalMonthlyAmount?: Amount;
	    /**
	    * ID of the branch
	    */
	    branchId?: string;
	}
	export interface ChangeCardSettingsRequest {
	    /**
	    * ID of the card
	    */
	    id?: string;
	    /**
	    * Alias of the card
	    */
	    alias?: string;
	}

}
declare module 'cs-netbanking-sdk/orders/bookingDate' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { AccountNumber } from 'cs-netbanking-sdk/common';
	/**
	* Get currently available booking date
	*/
	export class PaymentsBookingDateResource extends CSCoreSDK.Resource implements CSCoreSDK.UpdateEnabled<PaymentBookingDateRequest, PaymentBookingDateResponse> {
	    /**
	    * Returns current available booking date based on the provided account and optional payment order category parameters
	    */
	    update: (payload: PaymentBookingDateRequest) => Promise<PaymentBookingDateResponse>;
	}
	export interface PaymentBookingDateRequest {
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
	export interface PaymentBookingDateResponse {
	    /**
	    * booking date value for provided account ID and payment order.
	    */
	    bookingDate: Date;
	}

}
declare module 'cs-netbanking-sdk/orders/domestic' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { Amount, Signed } from 'cs-netbanking-sdk/common';
	import { Info, Symbols, Payment } from 'cs-netbanking-sdk/orders/orders';
	/**
	* Create domestic payment order
	*/
	export class PaymentsDomesticResource extends CSCoreSDK.Resource implements CSCoreSDK.CreateEnabled<DomesticPaymentUpdateRequest, DomesticPaymentUpdateResponse> {
	    /**
	    * Creates domestic payment order and returns it in promise
	    */
	    create: (payload: DomesticPaymentUpdateRequest) => Promise<DomesticPaymentUpdateResponse>;
	    /**
	    * Returns PaymentDomesticResource resource for updating domestic payment
	    */
	    withId: (id: string) => PaymentDomesticResource;
	}
	/**
	* Update domestic payment
	*/
	export class PaymentDomesticResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.UpdateEnabled<DomesticPaymentUpdateRequest, DomesticPaymentUpdateResponse> {
	    /**
	    * Updates domestic payment and returns it in promise
	    */
	    update: (payload: DomesticPaymentUpdateRequest) => Promise<DomesticPaymentUpdateResponse>;
	}
	export interface DomesticPaymentUpdateRequest extends Signed {
	    /**
	    * Internal identifier of payment order. Note that after signing of the order the id could change.
	    */
	    id?: string;
	    /**
	    * Name of the sender
	    */
	    senderName: string;
	    /**
	    * Account number of the sender.
	    */
	    sender: DomesticPaymentAccount;
	    /**
	    * Name of the payee
	    */
	    receiverName: string;
	    /**
	    * Account number of payee
	    */
	    receiver: DomesticPaymentAccount;
	    /**
	    * Payment order amount.
	    */
	    amount: Amount;
	    /**
	    * Optional date (in the future) when this payment has to be done
	    */
	    transferDate?: Date;
	    /**
	    * Message for payee set during payment order creation. It is used to identify transaction on receiver side. Array of texts 4x35
	    */
	    additionalInfo?: Info;
	    /**
	    * Message for me set during payment order creation.
	    */
	    senderReference?: string;
	    /**
	    * Information about the symbols
	    */
	    symbols?: Symbols;
	    /**
	    * Array of optional Flag values depends on Payment order category, type.
	    */
	    flags?: [string];
	}
	export interface DomesticPaymentUpdateResponse extends Payment {
	}
	export interface DomesticPaymentAccount {
	    /**
	    * Account number with possible prefix. Format is "XXXXXX-NNNNNNNNNN" if prefix is not null or "000000". If prefix is not provided then format is "NNNNNNNNNN" without leading zeros.
	    */
	    number?: string;
	    /**
	    * Bank Code
	    */
	    bankCode?: string;
	    /**
	    * Code of the Country - 2 characters; mandatoryfor international orders.
	    */
	    countryCode?: string;
	    /**
	    * IBAN
	    */
	    "cz-iban"?: string;
	    /**
	    * BIC
	    */
	    "cz-bic"?: string;
	}

}
declare module 'cs-netbanking-sdk/orders/limits' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { Amount } from 'cs-netbanking-sdk/common';
	/**
	* Get remaining amounts for payment orders
	*/
	export class PaymentsLimitsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<PaymentsLimit> {
	    /**
	    * List all limits for payment orders
	    */
	    list: () => Promise<PaymentsLimitList>;
	}
	export interface PaymentsLimitList extends CSCoreSDK.PaginatedListResponse<PaymentsLimit> {
	}
	export interface PaymentsLimit {
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

}
declare module 'cs-netbanking-sdk/orders/mobile' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { Amount, Signed } from 'cs-netbanking-sdk/common';
	/**
	* Recharging the credit available on prepaid cards provided by Vodafone, T-Mobile or O2.
	*/
	export class PaymentsMobileResource extends CSCoreSDK.Resource implements CSCoreSDK.CreateEnabled<MobilePaymentsRequest, MobilePaymentsResponse> {
	    create: (payload: MobilePaymentsRequest) => Promise<MobilePaymentsResponse>;
	}
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
	export interface MobilePaymentsResponse extends MobilePaymentsRequest, Signed {
	}
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

}
declare module 'cs-netbanking-sdk/orders/orders' {
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { Amount, Signed, AccountNumber, Parameters } from 'cs-netbanking-sdk/common';
	import { PaymentsBookingDateResource } from 'cs-netbanking-sdk/orders/bookingDate';
	import { PaymentsDomesticResource } from 'cs-netbanking-sdk/orders/domestic';
	import { PaymentsLimitsResource } from 'cs-netbanking-sdk/orders/limits';
	import { PaymentsMobileResource } from 'cs-netbanking-sdk/orders/mobile';
	/**
	* Get information about payments orders
	*/
	export class OrdersResource extends CSCoreSDK.Resource {
	    /**
	    * Returns PaymentsResource for listing, deleting and accessing other information about payments
	    */
	    payments: PaymentsResource;
	}
	/**
	* List payments, get individual payment and other resources
	*/
	export class PaymentsResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<PaymentResource>, CSCoreSDK.PaginatedListEnabled<Payment> {
	    /**
	    * List all payments
	    */
	    list: (params?: Parameters) => Promise<PaymentList>;
	    /**
	    * Get individual payment with a given id
	    */
	    withId: (id: string | number) => PaymentResource;
	    /**
	    * Get currently available booking date
	    */
	    bookingDate: PaymentsBookingDateResource;
	    /**
	    * Create domestic payment order
	    */
	    domestic: PaymentsDomesticResource;
	    /**
	    * Get remaining amounts for payment orders
	    */
	    limits: PaymentsLimitsResource;
	    /**
	    * Recharging the credit available on prepaid cards provided by Vodafone, T-Mobile or O2.
	    */
	    mobile: PaymentsMobileResource;
	}
	/**
	* Individual Payment order resource
	*/
	export class PaymentResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<Payment>, CSCoreSDK.DeleteEnabled<void> {
	    /**
	    * Get detail of the payment
	    */
	    get: () => Promise<Payment>;
	    /**
	    * Remove payment
	    */
	    delete: () => void;
	}
	export interface PaymentList extends CSCoreSDK.PaginatedListResponse<Payment> {
	}
	export interface Payment extends Signed {
	    /**
	    * Internal identifier of payment order. Note that after signing of the order the id could change.
	    */
	    id: string;
	    /**
	    * Transaction reference ID provided by BE when payment order was executed.
	    */
	    referenceId?: string;
	    /**
	    * Payment order category determines whether payment is domestic, SEPA, international or inside the bank (domestic, but could be different processing) or between accounts of the same user (domestic, but with better fee policy). Possible values: DOMESTIC, OWN_TRANSFER, SEPA, INTERNATIONAL.
	    */
	    orderCategory: string;
	    /**
	    * Payment order type (outgoing payment, outgoing direct debit, incoming direct debit) determines further transaction processing in BE. Values: PAYMENT_OUT, DIRECT_DEBIT_IN
	    */
	    orderType: string;
	    /**
	    * sender name
	    */
	    senderName?: string;
	    /**
	    * sender account number
	    */
	    sender: AccountNumber;
	    /**
	    * receiver name
	    */
	    receiverName?: string;
	    /**
	    * Receiver IBAN in case of international payments.
	    */
	    receiver: AccountNumber;
	    /**
	    * payment amount
	    */
	    amount: Amount;
	    /**
	    * Information about the symbols
	    */
	    symbols?: Symbols;
	    /**
	    * Message for payee set during payment order creation. It is used to identify transaction on receiver side. Array of texts 4x35.
	    */
	    additionalInfo?: Info;
	    /**
	    * Message for me set during payment order creation.
	    */
	    senderReference?: string;
	    /**
	    * Datetime when payment order was created/updated (the last time) by user (read-only field is automatically setup/changed by BE system based on POST/PUT request).
	    */
	    executionDate?: Date;
	    /**
	    * Modification date indicates the last update of payment order done by user or BE system (read-only field provided by BE).
	    */
	    modificationDate?: Date;
	    /**
	    * payment transfer date
	    */
	    transferDate?: Date;
	    /**
	    * Datetime till when payment order will be repeated on BE in the case of insufficient funds on account.
	    */
	    expirationDate?: Date;
	    /**
	    * Date and time which should be used for default ordering of the payment orders for display.
	    */
	    /**
	    * Status of the payment order (details above), State of payment order presented to user on FE). Possible values: OPEN, SPOOLED, CANCELLED, CLOSED and DELETED
	    */
	    state: string;
	    /**
	    * State detail of payment order provided based on BE technical states.
	    */
	    stateDetail: string;
	    /**
	    * Indicator whether state (stateDetail value) of payment order is OK from user point of view. For mapping between stateDetail and stateOk indicator values see table below.
	    */
	    stateOk: string;
	    /**
	    * description of payment order, transaction type
	    */
	    /**
	    * ID of the application via which this payment order was entered/modified the last time. Possible values: GEORGE, ATM_PAYMENT, ATM_OTHER, GSM, BRANCH_FE, POST_OFFICE, INTERNET_BANKING, TELEPHONE_BANKER, COLLECTION_BOX, VIDEO_BANKER and UNKNOWN.
	    */
	    applicationId?: string;
	    /**
	    * ID of the channel via which this payment order was entered/modified the last time. Possible values: NET_BANKING, ATM, MOBILE_BANKING, ATM, BRANCH, POST_OFFICE, CALL_CENTRE, VIDEO_BANKING and UNKNOWN
	    */
	    channelId?: string;
	    /**
	    * Receiver's address
	    */
	    receiverAddress?: string;
	    /**
	    * Array of optional Flag values depends on Payment order category, type.
	    */
	    flags?: [string];
	    /**
	    * Convenience method for retrieving payment's detail
	    */
	    get: () => Promise<Payment>;
	    /**
	    * Convenience method for removing payment
	    */
	    delete: () => void;
	}
	export interface Symbols {
	    /**
	    * variable symbol
	    */
	    variableSymbol?: string;
	    /**
	    * constant symbol
	    */
	    constantSymbol?: string;
	    /**
	    * specific symbol
	    */
	    specificSymbol?: string;
	}
	export interface Info {
	    /**
	    * Message for payee set during payment order creation. It is used to identify transaction on receiver side. Array of texts 4x35.
	    */
	    text4x35?: [string];
	}
	export interface RemovePaymentOrderResponse extends Signed {
	}

}
declare module 'cs-netbanking-sdk/netbanking' {
	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	import CSCoreSDK = require('cs-core-sdk');
	import { AccountsResource } from 'cs-netbanking-sdk/accounts/accounts';
	import { ProfileResource } from 'cs-netbanking-sdk/profile/profile';
	import { CardsResource } from 'cs-netbanking-sdk/cards/cards';
	import { OrdersResource } from 'cs-netbanking-sdk/orders/orders';
	export function getClient(): NetbankingClient;
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
	    constructor(config: CSCoreSDK.WebApiConfiguration, context: CSCoreSDK.WebApiContext);
	    /**
	     * List all accounts and get information about them.
	     */
	    accounts: AccountsResource;
	    /**
	    * Get information about the profile and past logins.
	    */
	    profile: ProfileResource;
	    /**
	    * Represents list of payment cards (either debet or credit) for current user. Every card was issued for current user or belongs to one of his accounts.
	    */
	    cards: CardsResource;
	    /**
	    * Get information about payments orders
	    */
	    orders: OrdersResource;
	}

}
declare module 'cs-netbanking-sdk'{ export * from 'cs-netbanking-sdk/netbanking'}