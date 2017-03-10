/// <reference types="es6-promise" />
declare module CSNetbankingSDK {
	
	/**
	 * @interface Signable
	 */
	export interface Signable {
	    /**
	    * Infomation about the signing
	    */
	    signInfo?: SignInfo;
	}
	/**
	 * @interface SignInfo
	 */
	export interface SignInfo {
	    /**
	    * State of signing process.
	    */
	    state: string;
	    /**
	    * Hash value.
	    */
	    signId?: string;
	}
	/**
	 * @interface AccountNumber
	 */
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
	    * Local IBAN
	    */
	    "cz-iban"?: string;
	    /**
	    * Local BIC
	    */
	    "cz-bic"?: string;
	    /**
	    * IBAN
	    */
	    iban?: string;
	    /**
	    * BIC
	    */
	    bic?: string;
	}
	/**
	 * @interface Amount
	 */
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
	/**
	 * @interface StatementList
	 * @extends {CSCoreSDK.PaginatedListResponse<Statement>}
	 */
	export interface StatementList extends CSCoreSDK.PaginatedListResponse<Statement> {
	}
	/**
	 * @interface Statement
	 */
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
	    /**
	    * Number of files for of the whole statement.
	    */
	    "cz-fileTotalNumber": string;
	    /**
	    * File number - to recognize order of the file if the statement is separated into several files.
	    */
	    "cz-fileOrderNumber": string;
	}
	/**
	 * @interface AddNoteAndMarkTransactionRequest
	 */
	export interface AddNoteAndMarkTransactionRequest {
	    /**
	    * Personal, user specific note for transaction. Max. 4 000 characters.
	    */
	    note?: string;
	    /**
	    * List of flags.
	    */
	    flags?: [string];
	}
	/**
	 * @interface AddNoteAndMarkTransactionResponse
	 * @extends {Signable}
	 */
	export interface AddNoteAndMarkTransactionResponse extends Signable {
	    /**
	    * Transactions information
	    */
	    transaction: Transaction;
	}
	/**
	 * @interface TransactionList
	 * @extends {CSCoreSDK.PaginatedListResponse<Transaction>}
	 * @extends {Signable}
	 */
	export interface TransactionList extends CSCoreSDK.PaginatedListResponse<Transaction>, Signable {
	}
	/**
	 * @interface Transaction
	 */
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
	/**
	 * @interface NetbankingParameters
	 * @extends {CSCoreSDK.Paginated}
	 * @extends {CSCoreSDK.Sortable}
	 */
	export interface NetbankingParameters extends CSCoreSDK.Paginated, CSCoreSDK.Sortable {
	}
	/**
	 * @interface DownloadStatementParameters
	 */
	export interface DownloadStatementParameters {
	    /**
	    * Format of statements file. Example: PDF_A4. Default: PDF_A4.
	    */
	    format?: string;
	    /**
	    * Statement identifier.
	    */
	    statementId: string;
	}
	/**
	 * @interface ExportTransactionsParameters
	 */
	export interface ExportTransactionsParameters {
	    /**
	    * Date from which transactions should be exported.
	    */
	    dateFrom: Date;
	    /**
	    * Date to which transactions should be exported.
	    */
	    dateTo: Date;
	    /**
	    * Array of fields which should appear in export. Possible fields are: bookingDate, partner, amount, currency, variableSymbol,
	    * constantSymbol, specificSymbol, transactionType, note, paymentReference, senderReference, cardNumber, investmentInstrumentName, marked, valuationDate, referenceId location
	    */
	    fields: Array<string>;
	    /**
	    * Indication whether account name should be visible in export. Default is false.
	    */
	    showAccountName?: boolean;
	    /**
	    * Indication whether account number should be visible in export. Default is false.
	    */
	    showAccountNumber?: boolean;
	    /**
	    * Indication whether timespan of the export should be visible. Default is false.
	    */
	    showTimespan?: boolean;
	    /**
	    * Indication whether balance of the account should be visible in export. Default is false.
	    */
	    showBalance?: boolean;
	}
	/**
	 * @interface NetbankingEmptyResponse
	 * @extends {CSCoreSDK.EmptyResponse}
	 */
	export interface NetbankingEmptyResponse extends CSCoreSDK.EmptyResponse {
	}
	/**
	 * @interface Symbols
	 */
	export interface Symbols {
	    /**
	     * Standing order variable symbol.
	     */
	    variableSymbol?: string;
	    /**
	     * Standing order constant symbol.
	     */
	    constantSymbol?: string;
	    /**
	     * Standing order specific symbol.
	     */
	    specificSymbol?: string;
	}
	/**
	 * @interface Address
	 */
	export interface Address {
	    /**
	     * Street of the address.
	     */
	    street?: string;
	    /**
	     * Number which is unique in street. Not all localities have streets.
	     */
	    streetNumber?: string;
	    /**
	     * Number which is unique in locality/town/village.
	     */
	    buildingApartment?: string;
	    /**
	     * City.
	     */
	    city: string;
	    /**
	     * Zip code of the address.
	     */
	    zipCode?: string;
	    /**
	     * Address country.
	     */
	    country: string;
	    /**
	     * More detailed description of address, company name or department.
	     */
	    description?: string;
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * Get information about the account's balance
	 * @class AccountBalanceResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.GetEnabled<AccountBalance>}
	 */
	export class AccountBalanceResource extends CSCoreSDK.Resource implements CSCoreSDK.GetEnabled<AccountBalance> {
	    /**
	     * Fetches the balance and returns them in a promise
	     * @returns {Promise<AccountBalance>}
	     */
	    get: () => Promise<AccountBalance>;
	}
	/**
	 * @interface AccountBalance
	 */
	export interface AccountBalance {
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
declare module CSNetbankingSDK {
	
	/**
	 * Get information about the account's services
	 * @class AccountServicesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Service>}
	 */
	export class AccountServicesResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Service> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Fetches the services and returns them in a promise
	     * @param {ServiceParameters=} params
	     */
	    list: (params?: ServiceParameters) => Promise<ServiceList>;
	}
	/**
	 * @interface ServiceList
	 * @extends {CSCoreSDK.PaginatedListResponse<Service>}
	 */
	export interface ServiceList extends CSCoreSDK.PaginatedListResponse<Service> {
	}
	/**
	 * @interface Service
	 */
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
	/**
	 * @interface ServiceParameters
	 * @extends {CSCoreSDK.Paginated}
	 */
	export interface ServiceParameters extends CSCoreSDK.Paginated {
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * Get information about the account's reservations
	 * @class AccountReservationsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Reservation>}
	 */
	export class AccountReservationsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Reservation> {
	    /**
	     * Fetches the reservations and returns them in a promise
	     * @param {ReservationParameters=} params
	     * @returns {Promise<ReservationList>}
	     */
	    list: (params?: ReservationParameters) => Promise<ReservationList>;
	}
	/**
	 * @interface ReservationList
	 * @extends {CSCoreSDK.PaginatedListResponse<Reservation>}
	 */
	export interface ReservationList extends CSCoreSDK.PaginatedListResponse<Reservation> {
	}
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
	export interface ReservationParameters extends CSCoreSDK.Paginated {
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * Get information about the account's repayments
	 * @class AccountRepaymentsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Repayment>}
	 */
	export class AccountRepaymentsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<Repayment> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Fetches the repayments and returns them in a promise
	     * @returns {Promise<RepaymentList>}
	     */
	    list: () => Promise<RepaymentList>;
	}
	/**
	 * @interface RepaymentList
	 * @extends {CSCoreSDK.PaginatedListResponse<Repayment>}
	 */
	export interface RepaymentList extends CSCoreSDK.PaginatedListResponse<Repayment> {
	}
	/**
	 * @interface Repayment
	 */
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
declare module CSNetbankingSDK {
	
	
	/**
	 * Get information about the account's statements
	 * @class AccountStatementsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Statement>}
	 */
	export class AccountStatementsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Statement>, CSCoreSDK.ParametrizedDownloadEnabled<DownloadStatementParameters, Uint8Array> {
	    /**
	     * Fetches the statements and returns them in a promise
	     * @param {NetbankingParameters=} params
	     * @returns {Promise<StatementList>}
	     */
	    list: (params?: NetbankingParameters) => Promise<StatementList>;
	    /**
	     * Downloads statements file
	     * @param {DownloadStatementParameters} params
	     * @returns {Promise<Uint8Array>}
	     */
	    download: (params: DownloadStatementParameters) => Promise<Uint8Array>;
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * Get individual SubAccount resource
	 * @class SubAccountsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<SubAccountResource>}
	 */
	export class SubAccountsResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<SubAccountResource> {
	    /**
	     * Returns individual SubAccount resource with a given id
	     * @param {string|number} id
	     * @returns {SubAccountResource}
	     */
	    withId: (id: string | number) => SubAccountResource;
	}
	/**
	 * Get information about the subaccount
	 * @class SubAccountResource
	 * @extends {CSCoreSDK.InstanceResource}
	 */
	export class SubAccountResource extends CSCoreSDK.InstanceResource {
	    /**
	     * Get information about the subaccount's statements
	     * @returns {SubAccountStatementsResource}
	     */
	    readonly statements: SubAccountStatementsResource;
	}
	/**
	 * List all subaccount's statements
	 * @class SubAccountStatementsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Statement>}
	 */
	export class SubAccountStatementsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Statement>, CSCoreSDK.ParametrizedDownloadEnabled<DownloadStatementParameters, Uint8Array> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Returns all subaccount's statements in a promise
	     * @param {NetbankingParameters=} params
	     * @returns {Promise<StatementList>}
	     */
	    list: (params?: NetbankingParameters) => Promise<StatementList>;
	    /**
	     * Downloads statements file
	     * @param {DownloadStatementParameters} params
	     * @returns {Promise<Uint8Array>}
	     */
	    download: (params: DownloadStatementParameters) => Promise<Uint8Array>;
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * Get individual AccountsTransactionsResource
	 * @class AccountTransactionsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<AccountTransactionResource>}
	 */
	export class AccountTransactionsResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<AccountTransactionResource>, CSCoreSDK.ParametrizedExportEnabled<ExportTransactionsParameters, Uint8Array> {
	    /**
	     * Returns individual AccountsTransactionResource with a given id
	     * @param {AccountTransactionResource} id
	     * @returns {AccountTransactionResource}
	     */
	    withId: (id: string | number) => AccountTransactionResource;
	    /**
	     * Exports transaction history into signed pdf
	     * @param {ExportTransactionsParameters} params
	     * @returns {Promise<Uint8Array>}
	     */
	    export: (params: ExportTransactionsParameters) => Promise<Uint8Array>;
	}
	/**
	 * Allows to add or change a client's personal transaction note and mark the transaction as favorite/important for one specific transaction on selected account.
	 * @class AccountTransactionResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionRequest, AddNoteAndMarkTransactionResponse>}
	 */
	export class AccountTransactionResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionRequest, AddNoteAndMarkTransactionResponse> {
	    /**
	     * Adds, changes of marks transaction
	     * @param {AddNoteAndMarkTransactionRequest} payload
	     * @returns {Promise<AddNoteAndMarkTransactionResponse>}
	     */
	    update: (payload: AddNoteAndMarkTransactionRequest) => Promise<AddNoteAndMarkTransactionResponse>;
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * Revolve a loan
	 * @class AccountTransferResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.UpdateEnabled<TransferRequest, TransferResponse>}
	 */
	export class AccountTransferResource extends CSCoreSDK.Resource implements CSCoreSDK.UpdateEnabled<TransferRequest, TransferResponse> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Revolves the loan. Currently only REVOLVING_LOAN subtype is supported.
	     * @param {TransferRequest} payload
	     * @returns {Promise<TransferResponse>}
	     */
	    update: (payload: TransferRequest) => Promise<TransferResponse>;
	}
	/**
	 * @interface TransferResponse
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface TransferResponse extends CSCoreSDK.Signable {
	}
	/**
	 * @interface TransferRequest
	 */
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
declare module CSNetbankingSDK {
	
	
	/**
	 * @class AccountStandingOrdersResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<StandingOrder>}
	 * @implements {CSCoreSDK.HasInstanceResource<AccountStandingOrderResource>}
	 * @implements {CSCoreSDK.CreateEnabled<CreateStandingOrderRequest, StandingOrderResponse>}
	 */
	export class AccountStandingOrdersResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<StandingOrder>, CSCoreSDK.HasInstanceResource<AccountStandingOrderResource>, CSCoreSDK.CreateEnabled<CreateStandingOrderRequest, StandingOrderResponse> {
	    /**
	     * Returns list of actual standing/sweep orders for accounts of the current user.
	     * @param {NetbankingParameters} params
	     * @returns {Promise<StandingOrderList>}
	     */
	    list: (params: NetbankingParameters) => Promise<StandingOrderList>;
	    /**
	     * Get the resource of standing order with a given id
	     * @param {string} id
	     * @returns {AccountStandingOrderResource}
	     */
	    withId: (id: string) => AccountStandingOrderResource;
	    /**
	     * Resource for creating standing/sweep order. Once order has been signed new payments are generated and executed according its settings.
	     * @param {CreateStandingOrderRequest} payload
	     * @returns {Promise<StandingOrderResponse>}
	     */
	    create: (payload: CreateStandingOrderRequest) => Promise<StandingOrderResponse>;
	}
	/**
	 * @class AccountStandingOrderResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<StandingOrder>}
	 * @implements {CSCoreSDK.DeleteEnabled<StandingOrderResponse>}
	 */
	export class AccountStandingOrderResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<StandingOrder>, CSCoreSDK.DeleteEnabled<StandingOrderResponse> {
	    /**
	     * Returns detail of actual standing/sweep orders identified by its number.
	     * @returns {Promise<StandingOrder>}
	     */
	    get: () => Promise<StandingOrder>;
	    /**
	     * This call removes existing standing/sweep order. No more payments for the order are executed after the change has been signed.
	     * @returns {Promise<StandingOrderResponse>}
	     */
	    delete: () => Promise<StandingOrderResponse>;
	}
	/**
	 * @interface StandingOrderList
	 * @extends {CSCoreSDK.PaginatedListResponse<StandingOrder>}
	 */
	export interface StandingOrderList extends CSCoreSDK.PaginatedListResponse<StandingOrder> {
	}
	/**
	 * @interface StandingOrder
	 * @extends {CreateStandingOrderRequest}
	 */
	export interface StandingOrder extends CreateStandingOrderRequest {
	    /**
	     * Standing order respectively sweep order identifier.
	     */
	    number: string;
	    /**
	     * Represents the status of the order. Only possible value so far is OK.
	     */
	    status: string;
	    /**
	     * Maximum number of iterations - processing of the standing order. Only applicable in combination with executionMode.
	     */
	    maxIterations: number;
	    /**
	     * Maximum amount to be transferred using the standing order. Only applicable in combination with executionMode.
	     */
	    maxAmount: Amount;
	    /**
	     * Date and time since the order is valid from.
	     */
	    startDate: Date | string;
	    /**
	     * Array of execution dates (DATEs) when payments will be executed from this standing order since today until today + 30 days.
	     */
	    scheduledExecutionDates?: [Date];
	    /**
	     * Date when the next order will be really executed taking into account weekends and holidays.
	     */
	    realExecutionDate?: Date;
	    break?: {
	        /**
	         * Start date of break period. Standing order will not be processed from this date.
	         */
	        validFromDate: Date;
	        /**
	         * End date of break period. Standing order will not be processed to this date.
	         */
	        validToDate: Date;
	    };
	    /**
	     * List of months where there is no payment (only applicable with interval IRREGULAR). Possible values: JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER
	     */
	    stoppages?: [string];
	    /**
	     * Array of optional Flag values to Standing Order. Possible flags: deletable.
	     */
	    flags?: [string];
	    /**
	     * Convience method for getting standing order detail
	     * @returns {Promise<StandingOrder>}
	     */
	    get: () => Promise<StandingOrder>;
	    /**
	     * Conveinience method for deleting standing order
	     * @returns {Promise<StandingOrderResponse>}
	     */
	    delete: () => Promise<StandingOrderResponse>;
	}
	/**
	 * @interface StandingOrderResponse
	 */
	export interface StandingOrderResponse extends StandingOrder, CSCoreSDK.Signable {
	}
	/**
	 * @interface CreateStandingOrderRequest
	 */
	export interface CreateStandingOrderRequest {
	    /**
	     * Either STANDING_ORDER (there is fixed amount specified which is transferred in defined times) or SWEEP_ORDER (there is specified limit, amount over limit/to limit is transferred in defined times).
	     */
	    type: string;
	    /**
	     * Relevant only for sweep orders. Either SWEEP_OVER_LIMIT (amount over limit is transferred from account) or SWEEP_UNDER_LIMIT (amount to limit is transferred to account).
	     */
	    subtype?: string;
	    /**
	     * Alias name of standing order entered by user for his better orientation in standing order list.
	     */
	    alias?: string;
	    /**
	     * Name of the standing order receiver.
	     */
	    receiverName?: string;
	    /**
	     * Receiver account number. In case of SWEEP_UNDER_LIMIT this is actually sender.
	     */
	    receiver: AccountNumber;
	    /**
	     * Message for payee set during payment order creation. It is used to identify transaction on receiver side.
	     */
	    senderReference?: string;
	    /**
	     * The amount of the order in case of standing order. The limit amount in case of sweep order.
	     */
	    amount: Amount;
	    /**
	     * Date when the next order is set to be executed. This includes weekends and banking holidays.
	     */
	    nextExecutionDate?: Date | string;
	    /**
	     * Date when the last order will be processed. Only applicable in combination with executionMode .
	     */
	    lastExecutionDate?: Date | string;
	    /**
	     * The execution mode defines when or how standing/sweep order will be cancelled, processed the last time. Possible values: UNTIL_DATE (standing order is valid until specific date - field lastExecutionDate), UNTIL_CANCELLATION (standing order is valid forever and must be cancelled by client), AFTER_MAX_ITERATION_EXCEEDED (certain count of executions is specified - field maxIterations) or MAX_AMOUNT_EXCEEDED (maximum amount which can be transferred for this order is specified, if next iteration would exceed this amount it is not executed - field maxAmount).
	     */
	    executionMode: string;
	    /**
	     * The execution due mode defines how the date when order should be executed is specified. Possible values: DUE_DAY_OF_MONTH (specific number of day in the month is defined) or DUE_LAST_DAY_OF_MONTH (order is executed on last day of particular month).
	     */
	    executionDueMode: string;
	    /**
	     * Execution interval defines how often order is executed. Possible values: DAILY, WEEKLY, MONTHLY, BI_MONTHLY, QUARTERLY, HALFYEARLY, YEARLY, IRREGULAR.
	     */
	    executionInterval: string;
	    /**
	     * Value represents order number of the day within particular period when the standing order will be reqularly executed. Possible values: 1-7 (for WEEKLY interval), 1-28 for STANDING_ORDER, 1-27 for type SWEEP_ORDER (for MONTHLY, QUARTERLY, HALFYEARLY and YEARLY - for intervals longer then month also intervalDueMonth is applicable). Field is not relevant for other execution intervals.
	     */
	    intervalDueDay?: number;
	    /**
	     * Due date month in execution interval of standing order processing. Represents order number of the month in particular period. Possible values: 1-2 for BI_MONTHLY, 1-3 for QUARTERLY, 1-6 for HALFYEARLY, 1-12 for YEARLY. Field is not relevant for other execution intervals.
	     */
	    intervalDueMonth?: number;
	    symbols?: Symbols;
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class AccountDirectDebitsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<DirectDebit>}
	 * @implements {CSCoreSDK.HasInstanceResource<AccountDirectDebitResource>}
	 * @implements {CSCoreSDK.CreateEnabled<DirectDebit, SignableDirectDebit>}
	 */
	export class AccountDirectDebitsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<DirectDebit>, CSCoreSDK.HasInstanceResource<AccountDirectDebitResource>, CSCoreSDK.CreateEnabled<DirectDebit, SignableDirectDebit> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Resource Direct Debit List represents collection of all direct debit approvals entered by user for the specified user
	     * @param {NetbankingParameters} params
	     * @returns {Promise<DirectDebitList>}
	     */
	    list: (params: NetbankingParameters) => Promise<DirectDebitList>;
	    /**
	     * Get the resource of direct debit with a given id
	     * @param {string} id
	     * @returns {AccountDirectDebitResource}
	     */
	    withId: (id: string) => AccountDirectDebitResource;
	    /**
	     * Resource for creating (or allowing) direct debit on certain account. Once signed it can be used by receiver party.
	     * @param {DirectDebit} payload
	     * @returns {Promise<SignableDirectDebit>}
	     */
	    create: (payload: DirectDebit) => Promise<SignableDirectDebit>;
	}
	/**
	 * @class AccountDirectDebitResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<DirectDebit>}
	 * @implements {CSCoreSDK.DeleteEnabled<SignableDirectDebit>}
	 */
	export class AccountDirectDebitResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<DirectDebit>, CSCoreSDK.DeleteEnabled<SignableDirectDebit> {
	    /**
	     * Get the single direct debits detail.
	     * @returns {Promise<DirectDebit>}
	     */
	    get: () => Promise<DirectDebit>;
	    /**
	     * Resource for deleting direct debit (permission) on certain account. Once signed no more transfers can be made by receiver party.
	     * @returns {Promise<SignableDirectDebit>}
	     */
	    delete: () => Promise<SignableDirectDebit>;
	}
	/**
	 * @interface DirectDebitList
	 * @extends {CSCoreSDK.PaginatedListResponse<DirectDebit>}
	 */
	export interface DirectDebitList extends CSCoreSDK.PaginatedListResponse<DirectDebit> {
	}
	/**
	 * @interface DirectDebit
	 */
	export interface DirectDebit {
	    /**
	     * Order number of the direct debit approval. It is unique per approval. Several versions of an approval have the same order number.
	     */
	    number?: string;
	    /**
	     * Type of the approval. Possible values are DIRECT_DEBIT or SIPO.
	     */
	    type: string;
	    /**
	     * Name of the direct debit receiver.
	     */
	    receiverName?: string;
	    /**
	     * Account number of the receiver.
	     */
	    receiver: AccountNumber;
	    /**
	     * Approval name chosen by the user.
	     */
	    alias?: string;
	    /**
	     * Limit for the single direct debit.
	     */
	    limit?: Amount;
	    /**
	     * Limit for the whole period.
	     */
	    limitSum?: Amount;
	    /**
	     * Limit for the number of direct debits for the period.
	     */
	    numberLimit?: number;
	    /**
	     * Beginning date for the approval.
	     */
	    startDate: Date | string;
	    /**
	     * End date for the approval.
	     */
	    endDate?: Date | string;
	    /**
	     * Symbols structure for Variable symbol, Specific symbol, Constant symbol.
	     */
	    symbols?: Symbols;
	    /**
	     * The order of the month in the period when direct debits are acceptable. This must he null for period at least one month.
	     */
	    dueMonth?: number;
	    /**
	     * The number of the day in month. From this day direct debits are acceptable. This can be not null only for period longer then one month.
	     */
	    dayFrom?: number;
	    /**
	     * The number of the day in month. To this day direct debits are acceptable.
	     */
	    dayTo?: number;
	    /**
	     * Unique identifier for version of the direct debit approval.
	     */
	    versionId?: number;
	    /**
	     * Date when the version comes into use.
	     */
	    versionValidityDate?: Date;
	    /**
	     * Number of period cycles in one period.
	     */
	    periodicity: number;
	    /**
	     * Unit of the period cycle. Possible values are HALFYEARLY, MONTHLY, QUARTERLY, YEARLY, DAILY, WEEKLY, OTHER.
	     */
	    periodCycle: string;
	}
	/**
	 * @interface SignableDirectDebit
	 * @extends {DirectDebit}
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface SignableDirectDebit extends DirectDebit, CSCoreSDK.Signable {
	}

}
declare module CSNetbankingSDK {
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * @class AccountsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<AccountResource>}
	 * @implements {CSCoreSDK.PaginatedListEnabled<MainAccount>}
	 */
	export class AccountsResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<AccountResource>, CSCoreSDK.PaginatedListEnabled<MainAccount> {
	    /**
	     * List all accounts
	     * @param {AccountParameters=} params
	     * @returns {Promise<AccountList>}
	     */
	    list: (params?: AccountParameters) => Promise<AccountList>;
	    /**
	     * Get the detail of the account with a given id
	     * @param {string|number} id
	     * @returns {AccountResource}
	     */
	    withId: (id: string | number) => AccountResource;
	}
	/**
	 * Get detail of the individual account and additional information about it
	 * @class AccountResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<MainAccount>}
	 * @implements {CSCoreSDK.UpdateEnabled<ChangeAccountSettingsRequest, ChangeAccountSettingsResponse>}
	 */
	export class AccountResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<MainAccount>, CSCoreSDK.UpdateEnabled<ChangeAccountSettingsRequest, ChangeAccountSettingsResponse> {
	    /**
	     * Get account detail
	     * @returns {Promise<MainAccount>}
	     */
	    get: () => Promise<MainAccount>;
	    /**
	     * Update account's settings.
	     * @param {ChangeAccountSettingsRequest} payload
	     * @returns {Promise<ChangeAccountSettingsResponse>}
	     */
	    update: (payload: ChangeAccountSettingsRequest) => Promise<ChangeAccountSettingsResponse>;
	    /**
	     * Get information about the account's balance
	     * @returns {AccountBalanceResource}
	     */
	    readonly balance: AccountBalanceResource;
	    /**
	     * Get information about the account's services
	     * @returns {AccountServicesResource}
	     */
	    readonly services: AccountServicesResource;
	    /**
	     * Get information about the account's reservations
	     * @returns {AccountReservationsResource}
	     */
	    readonly reservations: AccountReservationsResource;
	    /**
	     * Get information about the account's repayments
	     * @returns {AccountRepaymentsResource}
	     */
	    readonly repayments: AccountRepaymentsResource;
	    /**
	     * Get information about the account's statements
	     * @returns {AccountStatementsResource}
	     */
	    readonly statements: AccountStatementsResource;
	    /**
	     * Get information about the account's subaccounts
	     * @returns {SubAccountsResource}
	     */
	    readonly subAccounts: SubAccountsResource;
	    /**
	     * Get information about the account's transactions
	     * @returns {AccountTransactionsResource}
	     */
	    readonly transactions: AccountTransactionsResource;
	    /**
	     * Revolve a loan
	     * @returns {AccountTransferResource}
	     */
	    readonly transfer: AccountTransferResource;
	    /**
	     * @returns {AccountStandingOrdersResource}
	     */
	    readonly standingOrders: AccountStandingOrdersResource;
	    /**
	     * @returns {AccountDirectDebitsResource}
	     */
	    readonly directDebits: AccountDirectDebitsResource;
	}
	/**
	 * @interface AccountList
	 * @extends {CSCoreSDK.PaginatedListResponse<MainAccount>}
	 */
	export interface AccountList extends CSCoreSDK.PaginatedListResponse<MainAccount> {
	}
	/**
	 * @interface MainAccount
	 * @extends {Account}
	 */
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
	     * @returns {Promise<MainAccount>}
	     */
	    get: () => Promise<MainAccount>;
	    /**
	     * Convenience method for updating account's details
	     * @param {ChangeAccountSettingsRequest} payload
	     * @returns {Promise<ChangeAccountSettingsResponse>}
	     */
	    update: (payload: ChangeAccountSettingsRequest) => Promise<ChangeAccountSettingsResponse>;
	    /**
	    * Convenience getter for getting accounts's services resource
	    */
	    services: AccountServicesResource;
	    /**
	    * Convenience getter for getting accounts's transactions resource
	    */
	    transactions: AccountTransactionsResource;
	    /**
	    * Convenience getter for getting accounts's reservations resource
	    */
	    reservations: AccountReservationsResource;
	    /**
	    * Convenience getter for getting accounts's transfer resource
	    */
	    transfer: AccountTransferResource;
	    /**
	    * Convenience getter for getting accounts's statements resource
	    */
	    statements: AccountStatementsResource;
	    /**
	    * Convenience getter for getting accounts's repayments resource
	    */
	    repayments: AccountRepaymentsResource;
	    /**
	    * Convenience getter for getting accounts's standing orders resource
	    */
	    standingOrders: AccountStandingOrdersResource;
	    /**
	    * Convenience getter for getting accounts's direct debits resource
	    */
	    directDebits: AccountDirectDebitsResource;
	}
	/**
	 * @interface OverdraftAmount
	 * @extends {Amount}
	 */
	export interface OverdraftAmount extends Amount {
	    /**
	    * Due date of overdraft. Only for overdrafts where automatic prolongation is not set.
	    */
	    dueDate?: Date;
	}
	/**
	 * @interface SubAccount
	 * @extends {Account}
	 */
	export interface SubAccount extends Account {
	    /**
	    * In case of interest rate bands this is the interest rate which applies to value over limit.
	    */
	    "cz-interestRateOverLimit"?: number;
	    /**
	    * Limit amount for basic credit interest rate used for some saving accounts.
	    */
	    "cz-interestRateLimit"?: Amount;
	}
	/**
	 * @interface Account
	 */
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
	/**
	 * @interface Loan
	 */
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
	/**
	 * @interface Saving
	 */
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
	/**
	 * @interface TransferReceivers
	 */
	export interface TransferReceivers {
	    /**
	    * Identifier of the account which is allowed as a transfer receiver. If id is specified then you can find it among other accounts in GET /netbanking/my/accounts response.
	    */
	    id: string;
	    /**
	    * Account number which is allowed as a transfer receiver.
	    */
	    accountno: AccountNumber;
	}
	/**
	 * @interface ChangeAccountSettingsRequest
	 */
	export interface ChangeAccountSettingsRequest {
	    /**
	    * User defined account name. Max. 50 characters
	    */
	    alias?: string;
	}
	/**
	 * @interface ChangeAccountSettingsResponse
	 * @extends {MainAccount}
	 * @extends {Signable}
	 */
	export interface ChangeAccountSettingsResponse extends MainAccount, Signable {
	}
	/**
	 * @interface AccountParameters
	 * @extends {NetbankingParameters}
	 */
	export interface AccountParameters extends NetbankingParameters {
	    /**
	    * Example: CURRENT.
	    */
	    type?: string;
	}

}
declare module CSNetbankingSDK {
	
	/**
	 * List all past logins
	 * @class LastLoginsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<LastLoginInfo>}
	 */
	export class LastLoginsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<LastLoginInfo> {
	    /**
	     * Returns promise with a list of past logins
	     * @returns {Promise<LastLoginList>}
	     */
	    list: () => Promise<LastLoginList>;
	}
	/**
	 * @interface LastLoginList
	 * @extends {CSCoreSDK.ListResponse<LastLoginInfo>}
	 */
	export interface LastLoginList extends CSCoreSDK.ListResponse<LastLoginInfo> {
	}
	/**
	 * @interface LastLoginInfo
	 */
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
declare module CSNetbankingSDK {
	
	
	/**
	 * Get information about the profile and past logins.
	 * @class ProfileResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.GetEnabled<Profile>}
	 */
	export class ProfileResource extends CSCoreSDK.Resource implements CSCoreSDK.GetEnabled<Profile> {
	    /**
	     * Returns information about the profile
	     * @returns {Promise<Profile>}
	     */
	    get: () => Promise<Profile>;
	    /**
	     * Returns LastLoginsResource for listing past logins
	     * @returns {LastLoginsResource}
	     */
	    readonly lastLogins: LastLoginsResource;
	}
	/**
	 * @interface Profile
	 */
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
	    * customer's id a.k.a cluid
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
declare module CSNetbankingSDK {
	
	
	/**
	 * Get current delivery settings
	 * @class CardDeliveryResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.GetEnabled<DeliveryListing>}
	 * @implements {CSCoreSDK.UpdateEnabled<ChangeDeliverySettingsRequest, ChangeDeliverySettingsResponse>}
	 */
	export class CardDeliveryResource extends CSCoreSDK.Resource implements CSCoreSDK.GetEnabled<DeliveryListing>, CSCoreSDK.UpdateEnabled<ChangeDeliverySettingsRequest, ChangeDeliverySettingsResponse> {
	    /**
	     * Returns current delivery settings
	     * @returns {Promise<DeliveryListing>}
	     */
	    get: () => Promise<DeliveryListing>;
	    /**
	     * Change current delivery settings
	     * @param {ChangeDeliverySettingsRequest} payload
	     * @returns {Promise<ChangeDeliverySettingsResponse>}
	     */
	    update: (payload: ChangeDeliverySettingsRequest) => Promise<ChangeDeliverySettingsResponse>;
	}
	/**
	 * @interface DeliveryListing
	 */
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
	    /**
	    * Information about the confirmation
	    */
	    confirmations?: [Confirmation];
	}
	/**
	 * @interface Confirmation
	 */
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
	/**
	 * @interface ChangeDeliverySettingsResponse
	 * @extends {DeliveryListing}
	 * @extends {Signable}
	 */
	export interface ChangeDeliverySettingsResponse extends DeliveryListing, Signable {
	}
	/**
	 * @interface ChangeDeliverySettingsRequest
	 */
	export interface ChangeDeliverySettingsRequest {
	    /**
	    * Indicates how a client receives their card and pin. Possible values: BRANCH, HOME, OTHER_BRANCH, ADDRESS_ABROAD.
	    */
	    cardDeliveryMode: string;
	    /**
	    * ID of a branch where card should be sent.
	    */
	    branchId?: string;
	    /**
	    * Address where card should be sent.
	    */
	    address?: Address;
	    /**
	    * Phone number of the client.
	    */
	    deliveryPhone?: string;
	    /**
	    * Information about the confirmation
	    */
	    confirmations: [Confirmation];
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * Allows to add or change a client's personal note and mark/star the card transaction as favorite/important for one specific transaction
	 * @class CardTransactionsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<CardTransactionResource>}
	 */
	export class CardTransactionsResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<CardTransactionResource>, CSCoreSDK.ParametrizedExportEnabled<ExportTransactionsParameters, Uint8Array> {
	    /**
	     * Returns CardTransactionResource for a given id
	     * @param {string} id
	     * @returns {CardTransactionResource}
	     */
	    withId: (id: string) => CardTransactionResource;
	    /**
	     * Export transactions to PDF
	     * @param {ExportTransactionsParameters} params
	     * @returns {Promise<Uint8Array>}
	     */
	    export: (params: ExportTransactionsParameters) => Promise<Uint8Array>;
	}
	/**
	 * Add or change a client's personal note and mark/star the card transaction as favorite/important
	 * @class CardTransactionResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionRequest, AddNoteAndMarkCardTransactionResponse>}
	 */
	export class CardTransactionResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionRequest, AddNoteAndMarkCardTransactionResponse> {
	    /**
	     * Adds, changes of marks transaction
	     * @param {AddNoteAndMarkTransactionRequest} payload
	     * @returns {Promise<AddNoteAndMarkCardTransactionResponse>}
	     */
	    update: (payload: AddNoteAndMarkTransactionRequest) => Promise<AddNoteAndMarkCardTransactionResponse>;
	}
	/**
	 * @interface AddNoteAndMarkCardTransactionResponse
	 * @extends {Signable}
	 */
	export interface AddNoteAndMarkCardTransactionResponse extends Signable {
	    cardTransaction: Transaction;
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * Issue various actions on a single card.
	 * @class CardActionsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.UpdateEnabled<CardActionRequest, CardActionResponse>}
	 */
	export class CardActionsResource extends CSCoreSDK.Resource implements CSCoreSDK.UpdateEnabled<CardActionRequest, CardActionResponse> {
	    /**
	     * Issues various actions on a single card
	     * @param {CardActionRequest} payload
	     * @returns {Promise<CardActionResponse>}
	     */
	    update: (payload: CardActionRequest) => Promise<CardActionResponse>;
	}
	/**
	 * @interface CardActionResponse
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface CardActionResponse extends CSCoreSDK.Signable {
	}
	/**
	 * @interface CardActionRequest
	 */
	export interface CardActionRequest {
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
declare module CSNetbankingSDK {
	
	
	
	/**
	 * Get information about different limits
	 * @class CardLimitsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<CardLimit>}
	 * @implements {CSCoreSDK.UpdateEnabled<ChangeCardLimitsRequest, ChangeCardLimitsResponse>}
	 */
	export class CardLimitsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<CardLimit>, CSCoreSDK.UpdateEnabled<ChangeCardLimitsRequest, ChangeCardLimitsResponse> {
	    /**
	     * List all limits
	     * @returns {Promise<CardLimitsList>}
	     */
	    list: () => Promise<CardLimitsList>;
	    /**
	     * Update individual limits
	     * @param {ChangeCardLimitsRequest} payload
	     * @returns {Promise<ChangeCardLimitsResponse>}
	     */
	    update: (payload: ChangeCardLimitsRequest) => Promise<ChangeCardLimitsResponse>;
	}
	/**
	 * @interface CardLimitsList
	 * @extends {CSCoreSDK.ListResponse<CardLimit>}
	 */
	export interface CardLimitsList extends CSCoreSDK.ListResponse<CardLimit> {
	}
	/**
	 * @interface CardLimit
	 */
	export interface CardLimit {
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
	/**
	 * @interface ChangeCardLimitsResponse
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface ChangeCardLimitsResponse extends CSCoreSDK.Signable {
	    /**
	    * Card's limits
	    */
	    limits?: [CardLimit];
	    /**
	    * Information about the confirmation
	    */
	    confirmations?: [Confirmation];
	}
	/**
	 * @interface ChangeCardLimitsRequest
	 */
	export interface ChangeCardLimitsRequest {
	    /**
	    * Card's limits
	    */
	    limits?: [CardLimit];
	    /**
	    * Information about the confirmation
	    */
	    confirmations?: [Confirmation];
	}

}
declare module CSNetbankingSDK {
	
	/**
	 * Get the 3D secure online shopping status
	 * @class CardSecure3DResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.GetEnabled<SecureSettings>}
	 */
	export class CardSecure3DResource extends CSCoreSDK.Resource implements CSCoreSDK.GetEnabled<SecureSettings> {
	    /**
	     * Returns 3D secure online shopping status
	     * @returns {Promise<SecureSettings>}
	     */
	    get: () => Promise<SecureSettings>;
	}
	/**
	 * @interface SecureSettings
	 */
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
declare module CSNetbankingSDK {
	
	
	/**
	 * Resource for paying up credit card debt
	 * @class CardTransferResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.UpdateEnabled<PayUpCreditCardRequest, PayUpCreditCardResponse>}
	 */
	export class CardTransferResource extends CSCoreSDK.Resource implements CSCoreSDK.UpdateEnabled<PayUpCreditCardRequest, PayUpCreditCardResponse> {
	    /**
	     * Pays up the credit card debt and returns sign info
	     * @param {PayUpCreditCardRequest} payload
	     * @returns {Promise<PayUpCreditCardResponse>}
	     */
	    update: (payload: PayUpCreditCardRequest) => Promise<PayUpCreditCardResponse>;
	}
	/**
	 * @interface PayUpCreditCardRequest
	 */
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
	/**
	 * @interface Sender
	 */
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
	/**
	 * @interface PayUpCreditCardResponse
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface PayUpCreditCardResponse extends CSCoreSDK.Signable {
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * Account resource for listing statements
	 * @class CardAccountsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<CardAccountResource>}
	 */
	export class CardAccountsResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<CardAccountResource> {
	    /**
	     * Returns CardAccountResource for an account with a given id
	     * @param {string} id
	     * @returns {CardAccountResource}
	     */
	    withId: (id: string) => CardAccountResource;
	}
	/**
	 * Indidiual account resource with a given id
	 * @class CardAccountResource
	 * @extends {CSCoreSDK.InstanceResource}
	 */
	export class CardAccountResource extends CSCoreSDK.InstanceResource {
	    /**
	     * Get statements of the account
	     * @returns {CardStatementsResource}
	     */
	    readonly statements: CardStatementsResource;
	}
	/**
	 * Get statements for an account
	 * @class CardStatementsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Statement>}
	 */
	export class CardStatementsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Statement>, CSCoreSDK.ParametrizedDownloadEnabled<DownloadStatementParameters, Uint8Array> {
	    /**
	     * List all statements
	     * @param {NetbankingParameters=} params
	     * @returns {Promise<StatementList>}
	     */
	    list: (params?: NetbankingParameters) => Promise<StatementList>;
	    /**
	     * Download PDF with statements
	     * @param {DownloadStatementParameters} params
	     * @returns {Promise<Uint8Array>}
	     */
	    download: (params: DownloadStatementParameters) => Promise<Uint8Array>;
	}

}
declare module CSNetbankingSDK {
	
	
	
	
	
	
	
	
	
	/**
	 * Represents list of payment cards (either debet or credit) for current user. Every card was issued for current user or belongs to one of his accounts.
	 * @class CardsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Card>}
	 * @implements {CSCoreSDK.HasInstanceResource<CardResource>}
	 */
	export class CardsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Card>, CSCoreSDK.HasInstanceResource<CardResource> {
	    /**
	     * List all cards
	     * @param {Promise<CardList>=} params
	     * @returns {Promise<CardList>}
	     */
	    list: (params?: NetbankingParameters) => Promise<CardList>;
	    /**
	     * Get a resource for card with a given id
	     * @param {string} id
	     * @returns {CardResource}
	     */
	    withId: (id: string) => CardResource;
	}
	/**
	 * @class CardResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<Card>}
	 * @implements {CSCoreSDK.UpdateEnabled<ChangeCardSettingsRequest, ChangeCardSettingsResponse>}
	 */
	export class CardResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<Card>, CSCoreSDK.UpdateEnabled<ChangeCardSettingsRequest, ChangeCardSettingsResponse> {
	    /**
	     * Get detail of the card
	     * @returns {Promise<Card>}
	     */
	    get: () => Promise<Card>;
	    /**
	     * Update card's alias
	     * @param {ChangeCardSettingsRequest} payload
	     * @returns {Promise<ChangeCardSettingsResponse>}
	     */
	    update: (payload: ChangeCardSettingsRequest) => Promise<ChangeCardSettingsResponse>;
	    /**
	     * Get current delivery settings
	     * @returns {CardDeliveryResource}
	     */
	    readonly delivery: CardDeliveryResource;
	    /**
	     * Allows to add or change a client's personal note and mark/star the card transaction as favorite/important for one specific transaction
	     * @returns {CardTransactionsResource}
	     */
	    readonly transactions: CardTransactionsResource;
	    /**
	     * Issue various actions on a single card. Currently supported actions are:
	     * reissue pin, lock card, unlock card, activate card, set automatic card replacement on, set automatic card replacement off, replacement card request
	     * @returns {CardActionsResource}
	     */
	    readonly actions: CardActionsResource;
	    /**
	     * Get information about different limits
	     * @returns {CardLimitsResource}
	     */
	    readonly limits: CardLimitsResource;
	    /**
	     * Get the 3D secure online shopping status
	     * @returns {CardSecure3DResource}
	     */
	    readonly secure3d: CardSecure3DResource;
	    /**
	     * Resource for paying up credit card debt
	     * @returns {CardTransferResource}
	     */
	    readonly transfer: CardTransferResource;
	    /**
	     * Account resource for listing statements
	     * @returns {CardAccountsResource}
	     */
	    readonly accounts: CardAccountsResource;
	}
	/**
	 * @interface CardList
	 * @extends {CSCoreSDK.PaginatedListResponse<Card>}
	 */
	export interface CardList extends CSCoreSDK.PaginatedListResponse<Card> {
	}
	/**
	 * @interface Card
	 */
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
	    mainAccount?: CardMainAccount;
	    /**
	    * Information about the main account's limits.
	    */
	    "cz-overallCardAccountLimits"?: CardAccountLimits;
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
	     * @returns {Promise<Card>}
	     */
	    get: () => Promise<Card>;
	    /**
	     * Convenience method for updating card's settings
	     * @param {ChangeCardSettingsRequest} payload
	     * @returns {Promise<ChangeCardSettingsResponse>}
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
	    * Convenience getter for getting card's transfer resource
	    */
	    transfer: CardTransferResource;
	    /**
	    * Convenience getter for getting card's accounts resource
	    */
	    accounts: CardAccountsResource;
	}
	/**
	 * @interface CardAccountLimits
	 */
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
	/**
	 * @interface CardMainAccount
	 */
	export interface CardMainAccount {
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
	/**
	 * @interface ChangeCardSettingsResponse
	 * @extends {Card}
	 * @extends {Signable}
	 */
	export interface ChangeCardSettingsResponse extends Card, Signable {
	    /**
	    * ID of the branch
	    */
	    branchId?: string;
	}
	/**
	 * @interface ChangeCardSettingsRequest
	 */
	export interface ChangeCardSettingsRequest {
	    /**
	    * Alias of the card
	    */
	    alias?: string;
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * Get currently available booking date
	 * @class PaymentBookingDateResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.UpdateEnabled<PaymentBookingDateRequest, PaymentBookingDateResponse>}
	 */
	export class PaymentBookingDateResource extends CSCoreSDK.Resource implements CSCoreSDK.UpdateEnabled<PaymentBookingDateRequest, PaymentBookingDateResponse> {
	    /**
	     * Returns current available booking date based on the provided account and optional payment order category parameters
	     * @param {PaymentBookingDateRequest} payload
	     * @returns {Promise<PaymentBookingDateResponse>}
	     */
	    update: (payload: PaymentBookingDateRequest) => Promise<PaymentBookingDateResponse>;
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

}
declare module CSNetbankingSDK {
	
	
	
	/**
	 * Create domestic payment order
	 * @class PaymentsDomesticResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.CreateEnabled<DomesticPaymentCreateRequest, DomesticPaymentResponse>}
	 */
	export class PaymentsDomesticResource extends CSCoreSDK.Resource implements CSCoreSDK.CreateEnabled<DomesticPaymentCreateRequest, DomesticPaymentResponse> {
	    /**
	     * Creates domestic payment order and returns it in promise
	     * @param {DomesticPaymentCreateRequest} payload
	     * @returns {Promise<DomesticPaymentResponse>}
	     */
	    create: (payload: DomesticPaymentCreateRequest) => Promise<DomesticPaymentResponse>;
	    /**
	     * Returns PaymentDomesticResource resource for updating domestic payment
	     * @param {string} id
	     * @returns {PaymentDomesticResource}
	     */
	    withId: (id: string) => PaymentDomesticResource;
	}
	/**
	 * Update domestic payment
	 * @class PaymentDomesticResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.UpdateEnabled<DomesticPaymentUpdateRequest, DomesticPaymentResponse>}
	 */
	export class PaymentDomesticResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.UpdateEnabled<DomesticPaymentUpdateRequest, DomesticPaymentResponse> {
	    /**
	     * Updates domestic payment and returns it in promise
	     * @param {DomesticPaymentUpdateRequest} payload
	     * @returns {Promise<DomesticPaymentResponse>}
	     */
	    update: (payload: DomesticPaymentUpdateRequest) => Promise<DomesticPaymentResponse>;
	}
	/**
	 * @interface FullDomesticPaymentUpdateRequest
	 * @extends {DomesticPaymentUpdateRequest}
	 */
	export interface FullDomesticPaymentUpdateRequest extends DomesticPaymentUpdateRequest {
	    /**
	    * Internal identifier of payment order. Note that after signing of the order the id could change.
	    */
	    id: string;
	}
	/**
	 * @interface DomesticPaymentUpdateRequest
	 * @extends {DomesticPaymentCreateRequest}
	 */
	export interface DomesticPaymentUpdateRequest extends DomesticPaymentCreateRequest {
	    /**
	    * Status of the payment order (details above), State of payment order presented to user on FE). Possible values: OPEN, SPOOLED, CANCELLED, CLOSED and DELETED
	    */
	    state?: string;
	    /**
	    * State detail of payment order provided based on BE technical states.
	    */
	    stateDetail?: string;
	    /**
	    * Indicator whether state (stateDetail value) of payment order is OK from user point of view. For mapping between stateDetail and stateOk indicator values see table below.
	    */
	    stateOk?: boolean;
	}
	/**
	 * @interface DomesticPaymentResponse
	 * @extends {Payment}
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface DomesticPaymentResponse extends Payment, CSCoreSDK.Signable {
	}
	/**
	 * @interface DomesticPaymentCreateRequest
	 */
	export interface DomesticPaymentCreateRequest {
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
	/**
	 * @interface DomesticPaymentAccount
	 */
	export interface DomesticPaymentAccount {
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

}
declare module CSNetbankingSDK {
	
	
	/**
	 * Get remaining amounts for payment orders
	 * @class PaymentLimitsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<PaymentLimit>}
	 */
	export class PaymentLimitsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<PaymentLimit> {
	    /**
	     * List all limits for payment orders
	     * @returns {Promise<PaymentLimitsList>}
	     */
	    list: () => Promise<PaymentLimitsList>;
	}
	/**
	 * @interface PaymentLimitsList
	 * @extends {CSCoreSDK.ListResponse<PaymentLimit>}
	 */
	export interface PaymentLimitsList extends CSCoreSDK.ListResponse<PaymentLimit> {
	}
	/**
	 * @interface PaymentLimit
	 */
	export interface PaymentLimit {
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
declare module CSNetbankingSDK {
	
	
	/**
	 * Recharging the credit available on prepaid cards provided by Vodafone, T-Mobile or O2.
	 * @class PaymentMobileResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.CreateEnabled<MobilePaymentsRequest, MobilePaymentsResponse>}
	 */
	export class PaymentMobileResource extends CSCoreSDK.Resource implements CSCoreSDK.CreateEnabled<MobilePaymentsRequest, MobilePaymentsResponse> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Recharge the credit on prepaid card
	     * @param {MobilePaymentsRequest} payload
	     * @returns {Promise<MobilePaymentsResponse>}
	     */
	    create: (payload: MobilePaymentsRequest) => Promise<MobilePaymentsResponse>;
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
	export interface MobilePaymentsResponse extends MobilePaymentsRequest, CSCoreSDK.Signable {
	}
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

}
declare module CSNetbankingSDK {
	
	
	
	
	
	
	
	/**
	 * Get information about payments orders
	 * @class OrdersResource
	 * @extends {CSCoreSDK.Resource}
	 */
	export class OrdersResource extends CSCoreSDK.Resource {
	    /**
	     * Returns PaymentsResource for listing, deleting and accessing other information about payments
	     * @returns {PaymentsResource}
	     */
	    readonly payments: PaymentsResource;
	}
	/**
	 * List payments, get individual payment and other resources
	 * @class PaymentsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<PaymentResource>}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Payment>}
	 */
	export class PaymentsResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<PaymentResource>, CSCoreSDK.PaginatedListEnabled<Payment> {
	    /**
	     * List all payments
	     * @param {NetbankingParameters=} params
	     * @returns {Promise<PaymentList>}
	     */
	    list: (params?: NetbankingParameters) => Promise<PaymentList>;
	    /**
	     * Get individual payment with a given id
	     * @param {string|number} id
	     * @returns {PaymentResource}
	     */
	    withId: (id: string | number) => PaymentResource;
	    /**
	     * Get currently available booking date
	     * @returns {PaymentBookingDateResource}
	     */
	    readonly bookingDate: PaymentBookingDateResource;
	    /**
	     * Create domestic payment order
	     * @returns {PaymentsDomesticResource}
	     */
	    readonly domestic: PaymentsDomesticResource;
	    /**
	     * Get remaining amounts for payment orders
	     * @returns {PaymentLimitsResource}
	     */
	    readonly limits: PaymentLimitsResource;
	    /**
	     * Recharging the credit available on prepaid cards provided by Vodafone, T-Mobile or O2.
	     * @returns {PaymentMobileResource}
	     */
	    readonly mobile: PaymentMobileResource;
	}
	/**
	 * Individual Payment order resource
	 * @class PaymentResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<Payment>}
	 * @implements {CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse>}
	 */
	export class PaymentResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<Payment>, CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse> {
	    /**
	     * Get detail of the payment
	     * @returns {Promise<Payment>}
	     */
	    get: () => Promise<Payment>;
	    /**
	     * Delete payment
	     * @returns {Promise<NetbankingEmptyResponse>}
	     */
	    delete: () => Promise<NetbankingEmptyResponse>;
	}
	/**
	 * @interface PaymentList
	 * @extends {CSCoreSDK.PaginatedListResponse<Payment>}
	 */
	export interface PaymentList extends CSCoreSDK.PaginatedListResponse<Payment> {
	}
	/**
	 * @interface Payment
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface Payment extends CSCoreSDK.Signable {
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
	    "cz-orderingDate": Date;
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
	    stateOk: boolean;
	    /**
	    * description of payment order, transaction type
	    */
	    "cz-description"?: string;
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
	     * @returns {Promise<Payment>}
	     */
	    get: () => Promise<Payment>;
	    /**
	     * Convenience method for removing payment
	     * @returns {Promise<NetbankingEmptyResponse>}
	     */
	    delete: () => Promise<NetbankingEmptyResponse>;
	}
	/**
	 * @interface Info
	 */
	export interface Info {
	    /**
	    * Message for payee set during payment order creation. It is used to identify transaction on receiver side. Array of texts 4x35.
	    */
	    text4x35?: [string];
	}
	/**
	 * @interface RemovePaymentOrderResponse
	 * @extends {Signable}
	 */
	export interface RemovePaymentOrderResponse extends Signable {
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class SecurityTransactionsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<SecurityTransactionResource>}
	 */
	export class SecurityTransactionsResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<SecurityTransactionResource>, CSCoreSDK.ParametrizedExportEnabled<ExportTransactionsParameters, Uint8Array> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Get resource of security transaction with a given id
	     * @param {string} id
	     * @returns {SecurityTransactionResource}
	     */
	    withId: (id: string) => SecurityTransactionResource;
	    /**
	     * Export transaction history into signed pdf.
	     * @param {ExportTransactionsParameters} params
	     * @return {Promise<Uint8Array>}
	     */
	    export: (params: ExportTransactionsParameters) => Promise<Uint8Array>;
	}
	/**
	 * @class SecurityTransactionResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.UpdateEnabled<SecurityTransactionRequest, SecurityTransactionResponse>}
	 */
	export class SecurityTransactionResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.UpdateEnabled<SecurityTransactionRequest, SecurityTransactionResponse> {
	    /**
	     * Allows to add or change a client's personal note and mark/star the transaction as favorite/important for one specific transaction on selected product.
	     * @param {SecurityTransactionRequest} payload
	     * @returns {Promise<SecurityTransactionResponse>}
	     */
	    update: (payload: SecurityTransactionRequest) => Promise<SecurityTransactionResponse>;
	}
	/**
	 * @interface SecurityTransactionRequest
	 */
	export interface SecurityTransactionRequest {
	    /**
	     * Personal, user specific note for transaction. Max. 4 000 characters.
	     */
	    note?: string;
	    /**
	     * List of flags.
	     */
	    flags?: [string];
	}
	/**
	 * @interface SecurityTransactionResponse
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface SecurityTransactionResponse extends CSCoreSDK.Signable {
	    transaction: {
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
	    };
	}

}
declare module CSNetbankingSDK {
	
	
	
	/**
	 * @class SecuritiesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Security>}
	 * @implements {CSCoreSDK.HasInstanceResource<SecurityResource>}
	 */
	export class SecuritiesResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Security>, CSCoreSDK.HasInstanceResource<SecurityResource> {
	    /**
	     * Returns list of securities accounts for current user. Securities account represents virtual account which holds securities titles and its shares (funds, bonds, etc.).
	     * @param {SecuritiesParams=} params
	     * @returns {Promise<SecurityList>}
	     */
	    list: (params?: SecuritiesParams) => Promise<SecurityList>;
	    /**
	     * Get resource of security with a given id
	     * @param {string} id
	     * @returns {SecuritiesResource}
	     */
	    withId: (id: string) => SecurityResource;
	}
	/**
	 * @class SecurityResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<Security>}
	 * @implements {CSCoreSDK.UpdateEnabled<SecurityRequest, SecurityResponse>}
	 */
	export class SecurityResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<Security>, CSCoreSDK.UpdateEnabled<SecurityRequest, SecurityResponse> {
	    /**
	     * Get a single securities account with all its details. Securities account represents virtual account which holds securities titles and its shares (funds, bonds, etc.).
	     * @returns {Promise<Security>}
	     */
	    get: () => Promise<Security>;
	    /**
	     * Allows to change a limited set of securities account-settings of one specific contract. Currently only the field alias can be changed. Change only to alias field must not be signed, but response is ready also for signing process.
	     * @param {SecurityRequest} payload
	     * @returns {Promise<SecurityResponse>}
	     */
	    update: (payload: SecurityRequest) => Promise<SecurityResponse>;
	    /**
	     * Returns security transactions resource
	     * @returns {SecurityTransactionsResource}
	     */
	    readonly transactions: SecurityTransactionsResource;
	}
	/**
	 * @interface SecurityList
	 * @extends {CSCoreSDK.PaginatedListResponse<Security>}
	 */
	export interface SecurityList extends CSCoreSDK.PaginatedListResponse<Security> {
	}
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
	    flags: [string];
	}
	/**
	 * @interface SecuritiesParams
	 * @extends {CSCoreSDK.Paginated}
	 */
	export interface SecuritiesParams extends CSCoreSDK.Paginated {
	}
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
	export interface SecurityResponse extends Security, CSCoreSDK.Signable {
	}

}
declare module CSNetbankingSDK {
	
	/**
	 * @class SettingsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.GetEnabled<Settings>}
	 * @implements {CSCoreSDK.UpdateEnabled<Settings, SignableSettings>}
	 */
	export class SettingsResource extends CSCoreSDK.Resource implements CSCoreSDK.GetEnabled<Settings>, CSCoreSDK.UpdateEnabled<Settings, SignableSettings> {
	    /**
	     * Returns basic user settings.
	     * @returns {Promise<Settings>}
	     */
	    get: () => Promise<Settings>;
	    /**
	     * Change user settings. Currently only language can be changed by this endpoint.
	     * @param {Settings} payload
	     * @returns {Promise<SignableSettings>}
	     */
	    update: (payload: Settings) => Promise<SignableSettings>;
	}
	/**
	 * @interface Settings
	 */
	export interface Settings {
	    /**
	     * Preferred language. Possible values are cs and en.
	     */
	    language: string;
	    /**
	     * List of flags.
	     */
	    flags?: [string];
	}
	/**
	 * @interface SignableSettings
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface SignableSettings extends CSCoreSDK.Signable {
	    settings: Settings;
	}

}
declare module CSNetbankingSDK {
	
	/**
	 * @class ContactsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Contact>}
	 * @implements {CSCoreSDK.HasInstanceResource<ContactResource>}
	 */
	export class ContactsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<Contact>, CSCoreSDK.HasInstanceResource<ContactResource> {
	    /**
	     * Resource represents list of contact information for current user. It can contain addresses, phones and email addresses.
	     * @returns {Promise<ContactList>}
	     */
	    list: () => Promise<ContactList>;
	    /**
	     * Get the resource of contact with a given id
	     * @param {string} id
	     * @returns {ContactResource}
	     */
	    withId: (id: string) => ContactResource;
	}
	/**
	 * @class ContactResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<Contact>}
	 */
	export class ContactResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<Contact> {
	    /**
	     * Resource represents one specific contact information identified by its id. It can be address, phone or email address.
	     * @returns {Promise<Contact>}
	     */
	    get: () => Promise<Contact>;
	}
	/**
	 * @interface ContactList
	 * @extends {CSCoreSDK.ListResponse<Contact>}
	 */
	export interface ContactList extends CSCoreSDK.ListResponse<Contact> {
	}
	/**
	 * @interface Contact
	 */
	export interface Contact {
	    /**
	     * Contact ID
	     */
	    id: string;
	    /**
	     * Type of contact. ENUM values: ADDRESS, PHONE, EMAIL, FAX.
	     */
	    type: string;
	    /**
	     * Contact flags
	     */
	    flags?: [string];
	    /**
	     * Contact address
	     */
	    address?: {
	        /**
	         * Address type. ENUM values: PERMANENT_RESIDENCE, SECONDARY_RESIDENCE, COMPANY_RESIDENCE, UNKNOWN
	         */
	        type: string;
	        /**
	         * Localized name of address type.
	         */
	        typeI18N: string;
	        description?: string;
	        street: string;
	        streetNumber?: string | number;
	        buildingApartment?: string | number;
	        zipCode: string;
	        city: string;
	        country: string;
	    };
	    /**
	     * Contact phone
	     */
	    phone?: {
	        /**
	         * Phone type. ENUM: PRIVATE, COMPANY, UNKNOWN
	         */
	        type: string;
	        /**
	         * Localized name of phone type.
	         */
	        typeI18N: string;
	        /**
	         * Country calling code as international phone number prefix. E.g.: "0043" or "+43", "00420" or "+420", "00421" or "+421"
	         */
	        countryCallingCode: string;
	        /**
	         * Phone number
	         */
	        phoneNumber: string;
	    };
	    /**
	     * Primary contact email address
	     */
	    email?: {
	        /**
	         * Email type. ENUM values: PRIVATE, COMPANY, UNKNOWN
	         */
	        type: string;
	        /**
	         * Localized name of email type.
	         */
	        typeI18N: string;
	        /**
	         * Email
	         */
	        email: string;
	    };
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class PluginsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Plugin>}
	 * @implements {CSCoreSDK.HasInstanceResource<PluginResource>}
	 */
	export class PluginsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Plugin>, CSCoreSDK.HasInstanceResource<PluginResource> {
	    /**
	     * Returns list of available plugins for current user. Plugin is application functionality which can be enabled/disabled by user.
	     * @param {PluginsParameters} params
	     * @returns {Promise<PluginList>}
	     */
	    list: (params: PluginsParameters) => Promise<PluginList>;
	    /**
	     * Returns resource of plugin with a given id
	     * @param {string} id
	     * @returns {PluginResource}
	     */
	    withId: (id: string) => PluginResource;
	}
	/**
	 * @class PluginResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdatePluginRequest, SignablePlugin>}
	 */
	export class PluginResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.UpdateEnabled<UpdatePluginRequest, SignablePlugin> {
	    /**
	     * Activation and deactivation of the specific plugin. You can also change settlement account for given plugin and current user.
	     * @param {UpdatePluginRequest} payload
	     * @returns {Promise<SignablePlugin>}
	     */
	    update: (payload: UpdatePluginRequest) => Promise<SignablePlugin>;
	}
	/**
	 * @interface PluginList
	 * @extends {CSCoreSDK.PaginatedListResponse<Plugin>}
	 */
	export interface PluginList extends CSCoreSDK.PaginatedListResponse<Plugin> {
	}
	/**
	 * @interface Plugin
	 * @extends {UpdatePluginRequest}
	 */
	export interface Plugin extends UpdatePluginRequest {
	    /**
	     * Localized name of the plugin.
	     */
	    name: string;
	    /**
	     * Date until plugin is valid.
	     */
	    validUntil: Date;
	    /**
	     * Date of activation of plugin for user.
	     */
	    dateOfActivation?: Date;
	    standardFees?: [{
	        /**
	         * Time moment of changing the plugin fee. Possible values are IMMEDIATELY, ACCOUNT_STATEMENT, UNKNOWN.
	         */
	        timeOfCharging: string;
	        /**
	         * Frequency period of changing the plugin fee. Possible values are MONTHLY, NON_RECURRING, UNKNOWN.
	         */
	        periodOfCharging: string;
	        /**
	         * Fee amount defined for this plugin.
	         */
	        amount: Amount;
	    }];
	}
	/**
	 * @interface UpdatePluginRequest
	 */
	export interface UpdatePluginRequest {
	    /**
	     * Plugin unique identifier.
	     */
	    productCode: string;
	    /**
	     * User settlement account for charging fees.
	     */
	    settlementAccount?: AccountNumber;
	    /**
	     * Array of optional flag values.
	     */
	    flags?: [string];
	}
	/**
	 * @interface PluginsParameters
	 * @extends {CSCoreSDK.Paginated}
	 */
	export interface PluginsParameters extends CSCoreSDK.Paginated {
	}
	/**
	 * @interface SignablePlugin
	 * @extends {Plugin}
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface SignablePlugin extends Plugin, CSCoreSDK.Signable {
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class BuildingsContractsServicesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Service>}
	 */
	export class BuildingsContractsServicesResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Service> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Returns list of services which are connected or arranged for building saving product instance.
	     * @param {ServiceParameters=} params
	     * @returns {Promise<ServiceList>}
	     */
	    list: (params?: ServiceParameters) => Promise<ServiceList>;
	}

}
declare module CSNetbankingSDK {
	
	
	
	/**
	 * @class ContractsTransactionsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<ContractsTransactionResource>}
	 */
	export class ContractsTransactionsResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<ContractsTransactionResource>, CSCoreSDK.ParametrizedExportEnabled<ExportTransactionsParameters, Uint8Array> {
	    /**
	     * Get contract transaction resource with a given id
	     * @param {string} id
	     * @returns {ContractsTransactionResource}
	     */
	    withId: (id: string) => ContractsTransactionResource;
	    /**
	     * Export transaction history into signed pdf.
	     * @param {ExportTransactionsParameters} params
	     * @returns {Promise<Uint8Array>}
	     */
	    export: (params: ExportTransactionsParameters) => Promise<Uint8Array>;
	}
	/**
	 * @class ContractsTransactionResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.UpdateEnabled<SecurityTransactionRequest, SecurityTransactionResponse>}
	 */
	export class ContractsTransactionResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.UpdateEnabled<SecurityTransactionRequest, SecurityTransactionResponse> {
	    /**
	     * Allows to add or change a client's personal note and mark/star the transaction as favorite/important for one specific transaction on selected product.
	     * @param {SecurityTransactionRequest} payload
	     * @returns {Promise<SecurityTransactionResponse>}
	     */
	    update: (payload: SecurityTransactionRequest) => Promise<SecurityTransactionResponse>;
	}

}
declare module CSNetbankingSDK {
	
	
	
	
	/**
	 * @class BuildingsContractsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<BuildingsContractResource>}
	 * @implements {CSCoreSDK.PaginatedListEnabled<BuildingsContract>}
	 */
	export class BuildingsContractsResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<BuildingsContractResource>, CSCoreSDK.PaginatedListEnabled<BuildingsContract> {
	    /**
	     * Resource represents list of building savings for current user. It contains building savings and loans from building savings as well.
	     * @param {BuildingsContractsParameters=} params
	     * @returns {Promise<BuildingsContractList>}
	     */
	    list: (params?: BuildingsContractsParameters) => Promise<BuildingsContractList>;
	    /**
	     * Get the resource of buildings contract with a given id
	     * @param {string} id
	     * @returns {BuildingsContractResource}
	     */
	    withId: (id: string) => BuildingsContractResource;
	}
	/**
	 * @class BuildingsContractResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<BuildingsContract>}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdateBuildingsContractRequest, UpdateBuildingsContractResponse>}
	 */
	export class BuildingsContractResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<BuildingsContract>, CSCoreSDK.UpdateEnabled<UpdateBuildingsContractRequest, UpdateBuildingsContractResponse> {
	    /**
	     * Resource represents one building saving product identified by it's identifier. It can be building saving or loan from building saving.
	     * @returns {Promise<BuildingsContract>}
	     */
	    get: () => Promise<BuildingsContract>;
	    /**
	     * Allows to change a limited set of building savings contract-settings of one specific contract. Currently only the field alias can be changed. Change only to alias field must not be signed, but response is ready also for signing process.
	     * @param {UpdateBuildingsContractRequest} payload
	     * @returns {Promise<UpdateBuildingsContractResponse>}
	     */
	    update: (payload: UpdateBuildingsContractRequest) => Promise<UpdateBuildingsContractResponse>;
	    /**
	     * Get buildings contracts services resource
	     * @returns {BuildingsContractsServicesResource}
	     */
	    readonly services: BuildingsContractsServicesResource;
	    /**
	     * Get buildings contracts transactions resource
	     * @returns {ContractsTransactionsResource}
	     */
	    readonly transactions: ContractsTransactionsResource;
	}
	/**
	 * @interface BuildingsContractList
	 * @extends {CSCoreSDK.PaginatedListResponse<BuildingsContract>}
	 */
	export interface BuildingsContractList extends CSCoreSDK.PaginatedListResponse<BuildingsContract> {
	}
	/**
	 * @interface BuildingsContract
	 * @extends {UpdateBuildingsContractRequest}
	 */
	export interface BuildingsContract extends UpdateBuildingsContractRequest {
	    /**
	     * Building saving identifier.
	     */
	    id: string;
	    /**
	     * Building saving account number.
	     */
	    accountno: AccountNumber;
	    /**
	     * Type of the account. Possible values are BUILD_SAVING and BUILD_LOAN.
	     */
	    type: string;
	    /**
	     * Product code.
	     */
	    product: string;
	    /**
	     * Product name.
	     */
	    productI18N: string;
	    /**
	     * Building savings account balance. For loans outstanding debt is served
	     */
	    balance: Amount;
	    /**
	     * Status of the contract. Possible values are ACTIVE and CLOSED.
	     */
	    status: string;
	    /**
	     * Debtor. Will only by set for loans.
	     */
	    contractHolders?: [string];
	    /**
	     * Basic credit interest rate, used for building saving deposits. Value in percentage, e.g. 1,5 will be displayed as 1,5%.
	     */
	    creditInterestRate?: number;
	    /**
	     * Basic debit interest rate, used for building loan. Value in percentage, e.g. 9,5 will be displayed as 9,5%.
	     */
	    debitInterestRate?: number;
	    saving?: {
	        /**
	         * Target amount. Will not be set for loans.
	         */
	        targetAmount?: Amount;
	        /**
	         * Agreed monthly savings amount for building savings. Will not be set for loans.
	         */
	        agreedMonthlySavings?: Amount;
	        /**
	         * Notice period expiry date. Not set for loans.
	         */
	        expiryDate?: Date;
	        /**
	         * Remaining deposit to be paid to Building Savings till the end of this year to get annual maximal bonus.
	         */
	        bonusBearingDepositToPay?: Amount;
	    };
	    loan?: {
	        /**
	         * Total contracted building loan amount.
	         */
	        loanAmount?: Amount;
	        /**
	         * Installment part of the loan monthly repayment.
	         */
	        loanInstallment: Amount;
	        /**
	         * Saving part of the loan monthly repayment.
	         */
	        additionalSavings?: Amount;
	        /**
	         * Insurance part of the loan monthly repayment.
	         */
	        paymentInsurance?: Amount;
	        /**
	         * Current interest rate is valid from this date. Filled only for loans.
	         */
	        interestRateFromDate?: Date;
	        /**
	         * Current interest rate is valid to this date. Filled only for loans in case of variable interest rate. If interest rate is fixed, this field is empty.
	         */
	        interestRateToDate?: Date;
	    };
	    /**
	     * List of flags.
	     */
	    flags?: [string];
	    /**
	     * Convenience get method for fetching contracts detail
	     * @returns {Promise<BuildingsContract>}
	     */
	    get: () => Promise<BuildingsContract>;
	    /**
	     * Convenience update method for updating contract
	     * @param {UpdateBuildingsContractRequest} payload
	     * @returns {Promise<UpdateBuildingsContractResponse>}
	     */
	    update: (payload: UpdateBuildingsContractRequest) => Promise<UpdateBuildingsContractResponse>;
	    /**
	     * Convenience getter for contracts services
	     */
	    services: BuildingsContractsServicesResource;
	    /**
	     * Convenience getter for contracts transactions
	     */
	    transactions: ContractsTransactionsResource;
	}
	/**
	 * @interface BuildingsContractsParameters
	 * @extends {CSCoreSDK.Paginated}
	 */
	export interface BuildingsContractsParameters extends CSCoreSDK.Paginated {
	}
	/**
	 * @interface UpdateBuildingsContractRequest
	 */
	export interface UpdateBuildingsContractRequest {
	    /**
	     * User-specific alias of the contract. Max. 50 characters.
	     */
	    alias?: string;
	}
	/**
	 * @interface UpdateBuildingsContractResponse
	 * @extends {BuildingsContract}
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface UpdateBuildingsContractResponse extends BuildingsContract, CSCoreSDK.Signable {
	}

}
declare module CSNetbankingSDK {
	/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	
	
	
	/**
	 * @class PensionsContractsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Pension>}
	 * @implements {CSCoreSDK.HasInstanceResource<PensionsContractResource>}
	 */
	export class PensionsContractsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Pension>, CSCoreSDK.HasInstanceResource<PensionsContractResource> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Returns list of pension products which belongs to current user. This includes Pension Savings, Supplementary Pension Insurance and Supplementary Pension Savings.
	     * @param {PensionParameters=} params
	     * @returns {Promise<PensionList>}
	     */
	    list: (params?: PensionParameters) => Promise<PensionList>;
	    /**
	     * Get the resource of pension contract with a given id
	     * @param {string} id
	     * @returns {PensionsContractResource}
	     */
	    withId: (id: string) => PensionsContractResource;
	}
	/**
	 * @class PensionsContractResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<Pension>}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdatePensionRequest, UpdatePensionResponse>}
	 */
	export class PensionsContractResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<Pension>, CSCoreSDK.UpdateEnabled<UpdatePensionRequest, UpdatePensionResponse> {
	    /**
	     * Returns detail of pension product which belongs to current user. This can be Pension Saving, Supplementary Pension Insurance and Supplementary Pension Saving.
	     * @returns {Promise<Pension>}
	     */
	    get: () => Promise<Pension>;
	    /**
	     * Allows to change a limited set of pension contract-settings of one specific contract. Currently only the field alias can be changed. Change only to alias field must not be signed, but response is ready also for signing process.
	     * @param {UpdatePensionRequest} payload
	     * @returns {Promise<UpdatePensionResponse>}
	     */
	    update: (payload: UpdatePensionRequest) => Promise<UpdatePensionResponse>;
	    /**
	     * Returns transactions resource for pension contract
	     * @returns {ContractsTransactionsResource}
	     */
	    readonly transactions: ContractsTransactionsResource;
	}
	/**
	 * @interface PensionList
	 * @extends {CSCoreSDK.PaginatedListResponse<Pension>}
	 */
	export interface PensionList extends CSCoreSDK.PaginatedListResponse<Pension> {
	}
	/**
	 * @interface Pension
	 * @extends {UpdatePensionRequest}
	 */
	export interface Pension extends UpdatePensionRequest {
	    /**
	     * Product unique identifier.
	     */
	    id: string;
	    /**
	     * Name of the contract owner.
	     */
	    owner?: string;
	    /**
	     * Date when contract was signed.
	     */
	    signingDate?: Date;
	    /**
	     * First day of contract validity.
	     */
	    validFrom?: Date;
	    /**
	     * Last day of contract validity.
	     */
	    validTo?: Date;
	    /**
	     * Pension contract number.
	     */
	    agreementNumber: string;
	    /**
	     * Contract status. Possible values: ACTIVE, TERMINATED, PENSION_PAYMENT, INTERRUPTED, PAYMENTS_SUSPENDED, PAYMENTS_DEFFERED, SETTLED, REPEALED, NEGOTIATED.
	     */
	    status: string;
	    productAccount: {
	        /**
	         * Account balance.
	         */
	        amount: Amount;
	        /**
	         * Date of the account balance validity.
	         */
	        date: Date;
	    };
	    /**
	     * Localized product name.
	     */
	    productI18N: string;
	    /**
	     * Identification of the product type.
	     */
	    product: string;
	    /**
	     * Identification of the product group. Possible values are SUPPLEMENTARY_INSURANCE, PENSION_SAVINGS and SUPPLEMENTARY_SAVINGS.
	     */
	    subtype: string;
	    /**
	     * Birth number of the product owner.
	     */
	    birthNumber: string;
	    /**
	     * Amount of already paid benefits.
	     */
	    paidBenefits: Amount;
	    strategy?: {
	        /**
	         * Conservative strategy share. Value in percentage, e.g. 0,5 will be displayed as 0,5 %.
	         */
	        conservative?: number;
	        /**
	         * Balanced strategy share. Value in percentage, e.g. 0,5 will be displayed as 0,5 %.
	         */
	        balanced?: number;
	        /**
	         * Dynamic strategy share. Value in percentage, e.g. 0,5 will be displayed as 0,5 %.
	         */
	        dynamic?: number;
	        /**
	         * State bonds strategy share. Value in percentage, e.g. 0,5 will be displayed as 0,5 %.
	         */
	        stateBonds?: number;
	    };
	    pensionAgreed?: {
	        /**
	         * Indication whether old-age pension has been agreed.
	         */
	        oldAge?: boolean;
	        /**
	         * Indication whether disability pension has been agreed.
	         */
	        disability?: boolean;
	        /**
	         * Indication whether early-retirement pension has been agreed.
	         */
	        earlyRetirement?: boolean;
	    };
	    savingTime?: {
	        /**
	         * Supplementary pension saving time.
	         */
	        supplementary?: number;
	        /**
	         * Old-age pension saving time.
	         */
	        oldAge?: number;
	        /**
	         * Early-retirement saving time.
	         */
	        earlyRetirement?: number;
	    };
	    contribution?: {
	        /**
	         * Indication whether employer contribution is set up.
	         */
	        employer: boolean;
	        /**
	         * Participant contribution value.
	         */
	        participantAmount: Amount;
	        /**
	         * Other person contribution value.
	         */
	        otherPersonAmount: Amount;
	    };
	    supplementary?: {
	        /**
	         * Email used for electronic communication.
	         */
	        email?: string;
	        /**
	         * Phone number used for sms communication.
	         */
	        sms?: string;
	        /**
	         * Indication whether maximum service is set up.
	         */
	        maxService?: boolean;
	        /**
	         * Indication whether optimum service is set up.
	         */
	        optService?: boolean;
	    };
	    beneficiaries?: {
	        /**
	         * Beneficiary name.
	         */
	        name: string;
	        /**
	         * Beneficiary birth date.
	         */
	        birthDate: Date;
	        /**
	         * Beneficiary birth number.
	         */
	        birthNumber: string;
	        /**
	         * Address where card should be sent.
	         */
	        address?: Address;
	        /**
	         * Beneficiary share. Value in percentage, e.g. 0,5 will be displayed as 0,5 %.
	         */
	        share: number;
	        /**
	         * Entitlement type. Possible values TAKEOVER.
	         */
	        entitlement?: string;
	    };
	    /**
	     * Array of flags.
	     */
	    flags?: [string];
	    /**
	     * Convenience get method for fetching Pensions detail
	     * @returns {Promise<Pension>}
	     */
	    get: () => Promise<Pension>;
	    /**
	     * Convenience update method for updating Pension
	     * @param {UpdatePensionRequest} payload
	     * @returns {Promise<UpdatePensionResponse>}
	     */
	    update: (payload: UpdatePensionRequest) => Promise<UpdatePensionResponse>;
	    /**
	     * Convenience getter for getting Pensions transactions resource
	     */
	    transactions: ContractsTransactionsResource;
	}
	/**
	 * @interface UpdatePensionRequest
	 */
	export interface UpdatePensionRequest {
	    /**
	     * User defined account name. Max. 50 characters.
	     */
	    alias?: string;
	}
	/**
	 * @interface UpdatePensionResponse
	 * @extends {CSCoreSDK.Signable, Pension}
	 */
	export interface UpdatePensionResponse extends CSCoreSDK.Signable, Pension {
	}
	/**
	 * @interface PensionParameters
	 * @extends {CSCoreSDK.Paginated}
	 */
	export interface PensionParameters extends CSCoreSDK.Paginated {
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class InsurancesContractFundsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Fund>}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdateFundRequest, UpdateFundResponse>}
	 */
	export class InsurancesContractFundsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<Fund>, CSCoreSDK.UpdateEnabled<UpdateFundRequest, UpdateFundResponse> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Returns detail of distribution of capital value into funds.
	     * @returns {Promise<FundList>}
	     */
	    list: () => Promise<FundList>;
	    /**
	     * Change the distribution of capital value into funds.
	     * @param {UpdateFundRequest} payload
	     * @returns {Promise<UpdateFundResponse>}
	     */
	    update: (payload: UpdateFundRequest) => Promise<UpdateFundResponse>;
	}
	/**
	 * @interface FundList
	 * @extends {CSCoreSDK.ListResponse<Fund>}
	 */
	export interface FundList extends CSCoreSDK.ListResponse<Fund> {
	    /**
	     * Total invested amount into all funds in CZK.
	     */
	    totalInvestedAmount: Amount;
	    /**
	     * Shows, whether a investment program is active for life insurance product. The field can be either blank or filled with 2 values - INVESTMENT_MANAGEMENT or CONSEQ
	     */
	    investmentProgram?: string;
	    /**
	     * Array of flags for funds.
	     */
	    flags?: [string];
	}
	/**
	 * @interface Fund
	 */
	export interface Fund {
	    /**
	     * Unique code of fund.
	     */
	    code: string;
	    /**
	     * Name of fund.
	     */
	    name: string;
	    /**
	     * Current value invested into fund in CZK
	     */
	    investedAmount: Amount;
	    /**
	     * Current value invested into fund in %.
	     */
	    investedShare: number;
	    /**
	     * The rate at which the savings component of the premium will be invested in selected funds.Value in percentage, e.g. 63 will be displayed as 63 %.
	     */
	    allocation: number;
	}
	/**
	 * @interface UpdateFundRequest
	 */
	export interface UpdateFundRequest {
	    funds: [{
	        /**
	         * Unique code of fund.
	         */
	        code: string;
	        allocation: number;
	    }];
	    /**
	     * Shows, whether an investment program is active for life insurance product. The field can be either blank or filled with 2 values - INVESTMENT_MANAGEMENT or CONSEQ
	     */
	    investmentProgram?: string;
	}
	/**
	 * @interface UpdateFundResponse
	 * @extends {UpdateFundRequest}
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface UpdateFundResponse extends UpdateFundRequest, CSCoreSDK.Signable {
	}

}
declare module CSNetbankingSDK {
	
	/**
	 * @class InsurancesContractBeneficiariesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<InsuranceBeneficiary>}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdateInsuranceBeneficiaries, UpdateInsuranceBeneficiaries>}
	 */
	export class InsurancesContractBeneficiariesResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<InsuranceBeneficiary>, CSCoreSDK.UpdateEnabled<UpdateInsuranceBeneficiaries, UpdateInsuranceBeneficiaries> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Returns list of beneficiaries related to the insurance contract.
	     * @returns {Promise<InsuranceBeneficiaryList>}
	     */
	    list: () => Promise<InsuranceBeneficiaryList>;
	    /**
	     * Change beneficiaries and distribution of insurance among beneficiaries.
	     * @param {UpdateInsuranceBeneficiaries} payload
	     * @returns {Promise<UpdateInsuranceBeneficiaries>}
	     */
	    update: (payload: UpdateInsuranceBeneficiaries) => Promise<UpdateInsuranceBeneficiaries>;
	}
	/**
	 * @interface InsuranceBeneficiaryList
	 * @extends {CSCoreSDK.ListResponse<InsuranceBeneficiary>}
	 */
	export interface InsuranceBeneficiaryList extends CSCoreSDK.ListResponse<InsuranceBeneficiary> {
	}
	/**
	 * @interface InsuranceBeneficiary
	 */
	export interface InsuranceBeneficiary {
	    /**
	     * Type of beneficiary
	     */
	    type: string;
	    /**
	     * Name of the beneficiary.
	     */
	    name?: string;
	    /**
	     * Birthdate of the beneficiary.
	     */
	    birthdate?: Date;
	    /**
	     * Percentage of the insurance contract determined to beneficiary or distributed by law. Value in percentage, e.g. 63 will be displayed as 63 %.
	     */
	    percentage?: number;
	    /**
	     * Attribute returns unstructured information about distribution among beneficiaries in a single string in 2 cases: 1) Distribution have never been changed (after modifying the distribution - information will be returned ina structured form); 2) BE did not cut up unstructured format.
	     */
	    unstructuredInfo?: string;
	    /**
	     * List of flags.
	     */
	    flags?: [string];
	}
	/**
	 * @interface UpdateInsuranceBeneficiaries
	 */
	export interface UpdateInsuranceBeneficiaries {
	    beneficiaries: [InsuranceBeneficiary];
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class InsurancesContractInsureesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Insuree>}
	 */
	export class InsurancesContractInsureesResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<Insuree> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Returns list of insurees related to the insurance contract.
	     * @returns {Promise<InsureeList>}
	     */
	    list: () => Promise<InsureeList>;
	}
	/**
	 * @interface InsureeList
	 * @extends {CSCoreSDK.ListResponse<Insuree>}
	 */
	export interface InsureeList extends CSCoreSDK.ListResponse<Insuree> {
	}
	/**
	 * @interface Insuree
	 */
	export interface Insuree {
	    /**
	     * Unique ID of the person related to the insurance contract. ID is hashed combination of contract number and birthnumber of the person: contractNumber_birthnumber.
	     */
	    id: string;
	    /**
	     * Type of person related to the insurance contract. 3 possible values: POLICYHOLDER, INSURED_PERSON, CHILD.
	     */
	    type: string;
	    /**
	     * Name of the person related to the insurance contract.
	     */
	    name: string;
	    /**
	     * Contact address.
	     */
	    addresses: [Address];
	    /**
	     * Birthnumber of the person related to the insurance contract.
	     */
	    birthNumber: string;
	    /**
	     * Phone number of the person related to the insurance contract.
	     */
	    phoneNumber?: string;
	    /**
	     * Email address of the person related to the insurance contract.
	     */
	    email?: string;
	    risks?: [{
	        /**
	         * Name of the active risk product.
	         */
	        productName?: string;
	        /**
	         * Group of the active risk product.
	         */
	        riskGroup?: string;
	        /**
	         * Amount that an ​insurance ​company will ​pay after making a ​claim.
	         */
	        insuredSum?: Amount;
	        /**
	         * Frequency in which insured sum may be paid.
	         */
	        frequency?: string;
	        /**
	         * Description of the insured risk.
	         */
	        explanation?: string;
	    }];
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class InsurancesContractPaymentsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<ContractPayment>}
	 */
	export class InsurancesContractPaymentsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<ContractPayment> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Returns list of life insurance payments. List contains one upcoming payment and payments history for 2 years.
	     * @returns {Promise<ContractPaymentList>}
	     */
	    list: () => Promise<ContractPaymentList>;
	}
	/**
	 * List of contract payments
	 * @interface ContractPaymentList
	 * @extends {CSCoreSDK.ListResponse<ContractPayment>}
	 */
	export interface ContractPaymentList extends CSCoreSDK.ListResponse<ContractPayment> {
	}
	/**
	 * @interface ContractPayment
	 */
	export interface ContractPayment {
	    /**
	     * Payment identifier. Unique for current insurance.
	     */
	    id: string;
	    /**
	     * Type of the payment. Possible values are ORDINARY, ONETIME, EXTRAORDINARY, FUTURE, OVERDUE, WITHDRAWAL, PARTIALLY_PAID, UNKNOWN.
	     */
	    type: string;
	    /**
	     * Payment date.
	     */
	    transactionDate?: Date;
	    /**
	     * Payment amount. Amount which was received by insurance company.
	     */
	    amount: Amount;
	    /**
	     * Rest which should be paid if payment instruction wasn't fully paid by this payment.
	     */
	    restToPay?: Amount;
	    /**
	     * Payment instruction amount. Amount which should be paid for particular period.
	     */
	    instruction?: Amount;
	    /**
	     * Amount paid by employer (as benefit). It is included in the payment amount.
	     */
	    employerContribution?: Amount;
	    /**
	     * Start date of the period for which payment instruction was created.
	     */
	    instructionFrom?: Date;
	    /**
	     * End date of the period for which payment instruction was created.
	     */
	    instructionTo?: Date;
	    /**
	     * Array of flags for funds.
	     */
	    flags?: [string];
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class InsurancesContractServicesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<InsuranceService>}
	 */
	export class InsurancesContractServicesResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<InsuranceService> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Returns list of services for the life insurance
	     * @returns {Promise<InsuranceServiceList>}
	     */
	    list: () => Promise<InsuranceServiceList>;
	    /**
	     * Allows activation of risk sports insurance.
	     * @param {RiskSportsUpdateRequest} payload
	     * @returns {Promise<ActivateRiskSportsResponse>}
	     */
	    activateRiskSports: (payload: RiskSportsUpdateRequest) => Promise<ActivateRiskSportsResponse>;
	    /**
	     * Allows deactivation of risk sports insurance.
	     * @param {RiskSportsUpdateRequest} payload
	     * @returns {Promise<DeactivateRiskSportsResponse>}
	     */
	    deactivateRiskSports: (payload: RiskSportsUpdateRequest) => Promise<DeactivateRiskSportsResponse>;
	}
	/**
	 * @interface InsuranceServiceList
	 * @extends {CSCoreSDK.ListResponse<InsuranceService>}
	 */
	export interface InsuranceServiceList extends CSCoreSDK.ListResponse<InsuranceService> {
	}
	/**
	 * @interface InsuranceService
	 */
	export interface InsuranceService {
	    /**
	     * indicator for FE for grouping services to boxes. Possible values: RISK_SPORTS, SERVICE
	     */
	    group: string;
	    /**
	     * service id
	     */
	    id: string;
	    /**
	     * service icon group
	     */
	    iconGroup: string;
	    /**
	     * service name
	     */
	    nameI18N: string;
	    /**
	     * Description of the service.
	     */
	    descriptionI18N: string;
	    /**
	     * relevant only for RISK_SPORTS group. For those number of days this service can be activated this year at all.
	     */
	    availableDays: string;
	    /**
	     * Starting date of active service. Relevant for RISK_SPORTS.
	     */
	    activeFrom: Date;
	    /**
	     * Ending date of active service. Relevant for RISK_SPORTS.
	     */
	    activeTo: Date;
	    /**
	     * Amount of bonus. Relevant for NO_CLAIM_BONUS, LOYALTY_BONUS.
	     */
	    bonusAmount: Amount;
	    /**
	     * Indicates service state. Three possible values: ACTIVATED - insurance was already activated but will be active in the future. ACTIVE - insurance is active right now. INACTIVE - insurance is neither activated nor active.
	     */
	    state: string;
	}
	/**
	 * @interface RiskSportsUpdateRequest
	 */
	export interface RiskSportsUpdateRequest {
	    dateFrom: Date;
	    dateTo: Date;
	    phoneNumber: string;
	}
	/**
	 * @interface ActivateRiskSportsResponse
	 * @extends {RiskSportsUpdateRequest}
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface ActivateRiskSportsResponse extends RiskSportsUpdateRequest, CSCoreSDK.Signable {
	    policyNumber: string;
	}
	/**
	 * @interface DeactivateRiskSportsResponse
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface DeactivateRiskSportsResponse extends CSCoreSDK.Signable {
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class InsurancesContractEventsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<ContractEvent>}
	 */
	export class InsurancesContractEventsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<ContractEvent> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Returns list of events for the life insurance
	     * @returns {Promise<ContractEventList>}
	     */
	    list: () => Promise<ContractEventList>;
	}
	/**
	 * @interface ContractEventList
	 * @extends {CSCoreSDK.ListResponse<ContractEvent>}
	 */
	export interface ContractEventList extends CSCoreSDK.ListResponse<ContractEvent> {
	}
	/**
	 * @interface ContractEvent
	 */
	export interface ContractEvent {
	    /**
	     * Insurance event number
	     */
	    number: string;
	    /**
	     * Creation date of the insurance event.
	     */
	    creationDate: Date;
	    /**
	     * State of the event. Possible values: REPORTED, ATTACHING_DOCS, IN_SOLUTION, CLOSED
	     */
	    state: string;
	    /**
	     * Substate of the event.
	     */
	    substate?: string;
	    /**
	     * Date that relates to the insurance substate.
	     */
	    substateDate?: Date;
	    /**
	     * Substate information with text and date.
	     */
	    substateInfo?: string;
	    /**
	     * Total amount for the insurance event
	     */
	    amount: Amount;
	    /**
	     * The date when thi event has been reported
	     */
	    processingDate?: Date;
	    /**
	     * List of indemnities related to the insurance event.
	     */
	    indemnities?: [{
	        /**
	         * Date of the payment was paid out.
	         */
	        paymentDate: Date;
	        /**
	         * Method of the transfer.
	         */
	        transferMethod: string;
	        /**
	         * Receiver name.
	         */
	        receiverName: string;
	        /**
	         * Paid indemnity value.
	         */
	        amount: Amount;
	    }];
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class InsurancesContractTaxBenefitsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.GetEnabled<TaxBenefit>}
	 */
	export class InsurancesContractTaxBenefitsResource extends CSCoreSDK.Resource implements CSCoreSDK.GetEnabled<TaxBenefit> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Returns tax benefits for the life insurance
	     * @returns {Promise<TaxBenefit>}
	     */
	    get: () => Promise<TaxBenefit>;
	}
	/**
	 * @interface TaxBenefit
	 */
	export interface TaxBenefit {
	    /**
	     * Tax deductable premium.
	     */
	    taxDeductiblePremium?: Amount;
	    /**
	     * Recommended extraordinary deposit for maximum tax deduction.
	     */
	    recommendedDeposit?: Amount;
	    /**
	     * Explanatory text for recommended extraordinary deposit. Available only in CZ language.
	     */
	    recommendedDepositText?: string;
	    /**
	     * Contains data that should be prefilled to domestic payment form.
	     */
	    paymentTemplate?: {
	        /**
	         * The date when thi event has been reported
	         */
	        symbols?: {
	            /**
	             * Variable symbol for the payment template.
	             */
	            variableSymbol?: string;
	        };
	        /**
	         * Receiver's account number of the payment.
	         */
	        receiver?: AccountNumber;
	    };
	}

}
declare module CSNetbankingSDK {
	
	/**
	 * @class InsurancesContractStrategiesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<ContractStrategy>}
	 */
	export class InsurancesContractStrategiesResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<ContractStrategy> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Returns list of strategies with corresponsing funds allocation for the life insurance
	     * @returns {Promise<ContractStrategyList>}
	     */
	    list: () => Promise<ContractStrategyList>;
	}
	/**
	 * @interface ContractStrategyList
	 * @extends {CSCoreSDK.ListResponse<ContractStrategy>}
	 */
	export interface ContractStrategyList extends CSCoreSDK.ListResponse<ContractStrategy> {
	}
	/**
	 * @interface ContractStrategy
	 */
	export interface ContractStrategy {
	    /**
	     * Type of the chosen strategy. Possible values: CONSERVATIVE, PROGRESSIVE, BALANCED, CONTROL, ACTUAL_SETTING
	     */
	    type: string;
	    /**
	     * Possible values are STRATEGY, INVESTMENT_MANAGEMENT. That means the funds allocation is fixed given by the chosen strategy, or it is under an investment program, so it is variable depending on current market state.
	     */
	    group: string;
	    funds: [{
	        /**
	         * Id of the fund
	         */
	        code: string;
	        /**
	         * Name of the fund.
	         */
	        name: string;
	        /**
	         * Share in the fund. This is percentage value. 20 means 20%.
	         */
	        share: number;
	        changeType?: string;
	    }];
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class InsurancesContractTransferResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdateContractTrasferRequest, UpdateContractTrasferResponse>}
	 */
	export class InsurancesContractTransferResource extends CSCoreSDK.Resource implements CSCoreSDK.UpdateEnabled<UpdateContractTrasferRequest, UpdateContractTrasferResponse> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Creates insurance transfer - premium payment, extra deposit or recommended deposit.
	     * @param {UpdateContractTrasferRequest} payload
	     * @returns {Promise<UpdateContractTrasferResponse>}
	     */
	    update: (payload: UpdateContractTrasferRequest) => Promise<UpdateContractTrasferResponse>;
	}
	/**
	 * @interface UpdateContractTrasferRequest
	 */
	export interface UpdateContractTrasferRequest {
	    /**
	     * Type of the transfer. Possible values are PAY_PREMIUM, EXTRA_DEPOSIT, RECOMMENDED_DEPOSIT.
	     */
	    type: string;
	    /**
	     * Amount which should be transfered.
	     */
	    amount: Amount;
	    /**
	     * Sender account.
	     */
	    sender: AccountNumber;
	}
	/**
	 * @interface UpdateContractTrasferResponse
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface UpdateContractTrasferResponse extends CSCoreSDK.Signable {
	}

}
declare module CSNetbankingSDK {
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * @class InsurancesContractsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Insurance>}
	 * @implements {CSCoreSDK.HasInstanceResource<InsurancesContractResource>}
	 */
	export class InsurancesContractsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Insurance>, CSCoreSDK.HasInstanceResource<InsurancesContractResource> {
	    /**
	     * Returns list of life insurances for current user.
	     * @param {InsurancesParameters=} params
	     * @returns {Promise<InsuranceList>}
	     */
	    list: (params?: InsurancesParameters) => Promise<InsuranceList>;
	    /**
	     * Get the resource of insurance contracts with a given id
	     * @param {string} id
	     * @returns {InsurancesContractResource}
	     */
	    withId: (id: string) => InsurancesContractResource;
	}
	/**
	 * @class InsurancesContractResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<InsuranceDetail>}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdateInsuranceRequest, UpdateInsuranceResponse>}
	 */
	export class InsurancesContractResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<InsuranceDetail>, CSCoreSDK.UpdateEnabled<UpdateInsuranceRequest, UpdateInsuranceResponse> {
	    /**
	     * Returns detail of the life insurance
	     * @returns {Promise<InsuranceDetail>}
	     */
	    get: () => Promise<InsuranceDetail>;
	    /**
	     * Allows to change a limited set of insurance settings of one specific contract. Currently only the field alias can be changed. Change only to alias field must not be signed, but response is ready also for signing process.
	     * @param {UpdateInsuranceRequest} payload
	     * @returns {Promise<UpdateInsuranceResponse>}
	     */
	    update: (payload: UpdateInsuranceRequest) => Promise<UpdateInsuranceResponse>;
	    /**
	     * Returns funds resource for insurance contract
	     * @returns {InsurancesContractFundsResource}
	     */
	    readonly funds: InsurancesContractFundsResource;
	    /**
	     * Returns beneficiaries resource for insurance contract
	     * @returns {InsurancesContractBeneficiariesResource}
	     */
	    readonly beneficiaries: InsurancesContractBeneficiariesResource;
	    /**
	     * Returns insurees resource for insurance contract
	     * @returns {InsurancesContractInsureesResource}
	     */
	    readonly insurees: InsurancesContractInsureesResource;
	    /**
	     * Returns payments resource for insurance contract
	     * @returns {InsurancesContractPaymentsResource}
	     */
	    readonly payments: InsurancesContractPaymentsResource;
	    /**
	     * Returns services resource for insurance contract
	     * @returns {InsurancesContractServicesResource}
	     */
	    readonly services: InsurancesContractServicesResource;
	    /**
	     * Returns events resource for insurance contract
	     * @returns {InsurancesContractEventsResource}
	     */
	    readonly events: InsurancesContractEventsResource;
	    /**
	     * Returns taxBenefits resource for insurance contract
	     * @returns {InsurancesContractTaxBenefitsResource}
	     */
	    readonly taxBenefits: InsurancesContractTaxBenefitsResource;
	    /**
	     * Returns strategies resource for insurance contract
	     * @returns {InsurancesContractStrategiesResource}
	     */
	    readonly strategies: InsurancesContractStrategiesResource;
	    /**
	     * Returns transfer resource for insurance contract
	     * @returns {InsurancesContractTransferResource}
	     */
	    readonly transfer: InsurancesContractTransferResource;
	}
	/**
	 * @interface InsuranceList
	 * @extends {CSCoreSDK.PaginatedListResponse<Insurance>}
	 */
	export interface InsuranceList extends CSCoreSDK.PaginatedListResponse<Insurance> {
	}
	/**
	 * @interface Insurance
	 * @extends {UpdateInsuranceRequest}
	 */
	export interface Insurance extends UpdateInsuranceRequest {
	    /**
	     * Contract number.
	     */
	    id: string;
	    /**
	     * Product Type of insurance. ENUM values: LIFE (CSAS supports only this value)
	     */
	    type: string;
	    /**
	     * Code of the sVersicherung product.
	     */
	    product: string;
	    /**
	     * Name of the sVersicherung product (localised).
	     */
	    productI18N: string;
	    /**
	     * The primary holder of the specific insurance contract.
	     */
	    insurancePolicyHolder: string;
	    /**
	     * Policy number
	     */
	    policyNumber: string;
	    /**
	     * ENUM: ACTIVE, CLOSED
	     */
	    status: string;
	    life?: LifeDetail;
	    /**
	     * Convenience get method for fetching Insurance detail
	     * @returns {Promise<InsuranceDetail>}
	     */
	    get: () => Promise<InsuranceDetail>;
	    /**
	     * Convenience update method for updating insurance
	     * @param {UpdateInsuranceRequest} payload
	     * @returns {Promise<UpdateInsuranceResponse>}
	     */
	    update: (payload: UpdateInsuranceRequest) => Promise<UpdateInsuranceResponse>;
	    /**
	     * Convenience getter for Insurance funds
	     */
	    funds: InsurancesContractFundsResource;
	    /**
	     * Convenience getter for Insurance beneficiaries
	     */
	    beneficiaries: InsurancesContractBeneficiariesResource;
	    /**
	     * Convenience getter for Insurance insurees
	     */
	    insurees: InsurancesContractInsureesResource;
	    /**
	     * Convenience getter for Insurance payments
	     */
	    payments: InsurancesContractPaymentsResource;
	    /**
	     * Convenience getter for Insurance services
	     */
	    services: InsurancesContractServicesResource;
	    /**
	     * Convenience getter for Insurance events
	     */
	    events: InsurancesContractEventsResource;
	    /**
	     * Convenience getter for Insurance tax benefits
	     */
	    taxBenefits: InsurancesContractTaxBenefitsResource;
	    /**
	     * Convenience getter for Insurance strategies
	     */
	    strategies: InsurancesContractStrategiesResource;
	    /**
	     * Convenience getter for Insurance transfer
	     */
	    transfer: InsurancesContractTransferResource;
	}
	/**
	 * @interface UpdateInsuranceRequest
	 */
	export interface UpdateInsuranceRequest {
	    /**
	     * User-specific alias of the contract. Max. 50 characters.
	     */
	    alias?: string;
	}
	/**
	 * @interface UpdateInsuranceResponse
	 * @extends {Insurance}
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface UpdateInsuranceResponse extends Insurance, CSCoreSDK.Signable {
	}
	/**
	 * @interface InsuranceDetail
	 * @extends {Insurance}
	 */
	export interface InsuranceDetail extends Insurance {
	    /**
	     * Additional description of insurance product, additional charges, index applied to insurance contract
	     */
	    description?: string;
	    life?: LifeDetail;
	}
	/**
	 * @interface InsurancesParameters
	 * @extends {CSCoreSDK.Paginated}
	 */
	export interface InsurancesParameters extends CSCoreSDK.Paginated {
	}
	/**
	 * @interface Life
	 */
	export interface Life {
	    lastPremiumDate?: Date;
	    lastPremiumPaid?: Amount;
	    /**
	     * Payment Interval. ENUM: ONCE, MONTHLY, QUARTERLY, HALFYEARLY, YEARLY, UNKNOWN
	     */
	    premiumPaymentInterval: string;
	    /**
	     * The agreed premium for the specific insurance.
	     */
	    premium: Amount;
	    /**
	     * The agreed end dates of the insurance contract.
	     */
	    contractEndDate?: Date;
	    /**
	     * The contract start date.
	     */
	    contractStartDate: Date;
	    /**
	     * The agreed amount insured or risk covered by the insurance.
	     */
	    insuredAmount: Amount;
	    /**
	     * Capital value of the insurance. Amount of money in saving part of the insurance.
	     */
	    currentCapitalValue?: Amount;
	    /**
	     * Date of possible contract termination
	     */
	    contractTerminationDate?: Date;
	    /**
	     * Array of flags for life insurance extended detail
	     */
	    flags?: [string];
	}
	/**
	 * @interface LifeDetail
	 * @extends {Life}
	 */
	export interface LifeDetail extends Life {
	    /**
	     * Reason of possible contract termination
	     */
	    contractTerminationReason?: string;
	    /**
	     * In case of CLOSED contract, this means the reason of the termination. This field si localized.
	     */
	    "cz-contractEndReason"?: string;
	    /**
	     * Technique for the premium payment
	     */
	    premiumPaymentMethodI18N?: string;
	    /**
	     * Date of the last premium payment
	     */
	    premiumLastPaid?: Date;
	    /**
	     * Technical interest rate. Value in percentage, e.g. 0,5 will be displayed as 0,5 %.
	     */
	    technicalInterestRate?: number;
	    employerBenefit?: {
	        /**
	         * frequency of the contribution. ENUM: ONCE, MONTHLY, QUARTERLY, HALFYEARLY, YEARLY, UNKNOWN
	         */
	        frequency?: string;
	        /**
	         * Explanatory text to employer contribution. Possible values: WHOLE_PREMIUM, PARTLY_PAID_PREMIUM, EXTRAORDINARY_PAYMENTS?
	         */
	        type?: string;
	        /**
	         * Amount of the contribution
	         */
	        amount?: Amount;
	    };
	    immobilization?: {
	        /**
	         * Immobilization secures the loan agreement with this contract number
	         */
	        contractNumber: string;
	        /**
	         * immobilization partner - third party name
	         */
	        partner: string;
	    };
	    paymentTemplates?: [{
	        /**
	         * Type of payment template. Possible values - ORDINARY, EXTRAORDINARY
	         */
	        type?: string;
	        symbols?: {
	            /**
	             * Variable symbol
	             */
	            variableSymbol?: string;
	        };
	        /**
	         * Receiver account number
	         */
	        receiver?: AccountNumber;
	    }];
	    /**
	     * Maximum amount that can be withdrawn from capital value
	     */
	    "cz-capitalValueMaxWithdrawal"?: Amount;
	}

}
declare module CSNetbankingSDK {
	
	/**
	 * @class LoyaltyContractsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.GetEnabled<Loyalty>}
	 */
	export class LoyaltyContractsResource extends CSCoreSDK.Resource implements CSCoreSDK.GetEnabled<Loyalty> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Get data about iBod account of the current client.
	     * @returns {Promise<Loyalty>}
	     */
	    get: () => Promise<Loyalty>;
	}
	/**
	 * @interface Loyalty
	 */
	export interface Loyalty {
	    /**
	     * State of the ibod account. Possible values are REGISTERED, UNREGISTERED, DEACTIVATED_FROM_FSCS.
	     */
	    state: string;
	    /**
	     * Date when data were actual.
	     */
	    exportDate: Date;
	    /**
	     * IBod points count.
	     */
	    pointsCount: number;
	    /**
	     * Activation ibod code.
	     */
	    activationCode?: string;
	}

}
declare module CSNetbankingSDK {
	
	
	
	
	
	/**
	 * @class ContractsResource
	 * @extends {CSCoreSDK.Resource}
	 */
	export class ContractsResource extends CSCoreSDK.Resource {
	    /**
	     * Get buildings contracts resource
	     * @returns {BuildingsContractsResource}
	     */
	    readonly buildings: BuildingsContractsResource;
	    /**
	     * Get pensions contracts resource
	     * @returns {PensionsContractsResource}
	     */
	    readonly pensions: PensionsContractsResource;
	    /**
	     * Get insurances contracts resource
	     * @returns {InsurancesContractsResource}
	     */
	    readonly insurances: InsurancesContractsResource;
	    /**
	     * Get loyalty contracts resource
	     * @returns {LoyaltyContractsResource}
	     */
	    readonly loyalty: LoyaltyContractsResource;
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class ServicesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Service>}
	 */
	export class ServicesResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Service> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Returns possibly empty list of services for current user. This resource represents only services which are not bound to any product.
	     * @param {ServiceParameters=} params
	     * @returns {Promise<ServiceList>}
	     */
	    list: (params?: ServiceParameters) => Promise<ServiceList>;
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class MessagesMandatoryResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Message>}
	 */
	export class MessagesMandatoryResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<Message> {
	    /**
	     * Returns all mandatory messages. This call might return different messages based on appId of the caller (for example, some messages might be specific to an application). Which messages can be seen by which application can be configured on the presto server side.
	     * @return {Promise<MandatoryMessageList>}
	     */
	    list: () => Promise<MandatoryMessageList>;
	}
	/**
	 * @interface MandatoryMessageList
	 * @extends {CSCoreSDK.ListResponse<Message>}
	 */
	export interface MandatoryMessageList extends CSCoreSDK.ListResponse<Message> {
	}

}
declare module CSNetbankingSDK {
	
	/**
	 * @class MessageAttachmentsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<MessageAttachmentResource>}
	 */
	export class MessageAttachmentsResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<MessageAttachmentResource> {
	    /**
	     * Get the resource of attachments
	     * @param {string} id
	     * @returns {MessageAttachmentResource}
	     */
	    withId: (id: string) => MessageAttachmentResource;
	}
	/**
	 * @class MessageAttachmentResource
	 * @extends {CSCoreSDK.InstanceResource}
	 */
	export class MessageAttachmentResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.DownloadEnabled<Uint8Array> {
	    /**
	     * Downloads attachment file. The binary representation of an attachment file, with a “Content-Disposition” header of type attachment (including the filename), in order to instruct the browser to open a save dialog.
	     * @returns {Promise<Uint8Array>}
	     */
	    download: () => Promise<Uint8Array>;
	}

}
declare module CSNetbankingSDK {
	
	
	
	
	/**
	 * @class MessagesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Message>}
	 * @implements {CSCoreSDK.HasInstanceResource<MessageResource>}
	 */
	export class MessagesResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Message>, CSCoreSDK.HasInstanceResource<MessageResource> {
	    /**
	     * Get all messages for current user generated by bank itself. Message can be read or unread, mandatory and non-mandatory. This call might return different messages based on appId of the caller (for example, some messages might be specific to an application).
	     * @param {MessagesParameters=} params
	     * @returns {Promise<MessageList>}
	     */
	    list: (params?: MessagesParameters) => Promise<MessageList>;
	    /**
	     * Get the resource of message with a given id
	     * @param {string} id
	     * @returns {MessageResource}
	     */
	    withId: (id: string) => MessageResource;
	    /**
	     * Get messages mandatory resource
	     * @returns {MessagesMandatoryResource}
	     */
	    readonly mandatory: MessagesMandatoryResource;
	}
	/**
	 * @class MessageResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<Message>}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdateMessageRequest, NetbankingEmptyResponse>}
	 * @implements {CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse>}
	 */
	export class MessageResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<Message>, CSCoreSDK.UpdateEnabled<UpdateMessageRequest, NetbankingEmptyResponse>, CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse> {
	    /**
	     * Get one specific messages for current user generated by bank itself. Message can be read or unread, mandatory and non-mandatory.
	     * @returns {Promise<Message>}
	     */
	    get: () => Promise<Message>;
	    /**
	     * After message has been read by user it should be marked accordingly by this endpoint.
	     * @param {UpdateMessageRequest} payload
	     * @returns {Promise<NetbankingEmptyResponse>}
	     */
	    update: (payload: UpdateMessageRequest) => Promise<NetbankingEmptyResponse>;
	    /**
	     * Resource for deleting message by its identifier. Only read messages can be deleted.
	     * @returns {Promise<NetbankingEmptyResponse>}
	     */
	    delete: () => Promise<NetbankingEmptyResponse>;
	    /**
	     * Get messages attachments resource
	     * @returns {MessageAttachmentsResource}
	     */
	    readonly attachments: MessageAttachmentsResource;
	}
	/**
	 * @interface MessageList
	 * @extends {CSCoreSDK.PaginatedListResponse<Message>}
	 */
	export interface MessageList extends CSCoreSDK.PaginatedListResponse<Message> {
	}
	/**
	 * @interface Message
	 */
	export interface Message {
	    /**
	     * Message identifier.
	     */
	    id: string;
	    /**
	     * Name of the message sender. For example source system of the message.
	     */
	    from: string;
	    /**
	     * Message subject.
	     */
	    subject: string;
	    /**
	     * Date when message was sent/generated.
	     */
	    date: Date;
	    /**
	     * Body of the message. Body is html code. It is up to FE application to properly display it.
	     */
	    body: string;
	    /**
	     * Array of message attachments.
	     */
	    attachments: [{
	        /**
	         * Attachment identifier.
	         */
	        id: string;
	        /**
	         * File name of the attachment.
	         */
	        fileName: string;
	    }];
	    /**
	     * Array of flags for messages.
	     */
	    flags?: [string];
	    /**
	     * Convenience get method for fetching message detail
	     * @returns {Promise<Message>}
	     */
	    get: () => Promise<Message>;
	    /**
	     * Convenience update method for updating message
	     * @param {UpdateMessageRequest} payload
	     * @returns {Promise<NetbankingEmptyResponse>}
	     */
	    update: (payload: UpdateMessageRequest) => Promise<NetbankingEmptyResponse>;
	    /**
	     * Convenience delete method for deleting message
	     * @returns {Promise<NetbankingEmptyResponse>}
	     */
	    delete: () => Promise<NetbankingEmptyResponse>;
	}
	/**
	 * @interface MessagesParameters
	 * @extends {CSCoreSDK.Paginated}
	 * @extends {CSCoreSDK.Sortable}
	 */
	export interface MessagesParameters extends CSCoreSDK.Paginated, CSCoreSDK.Sortable {
	}
	/**
	 * @interface UpdateMessageRequest
	 */
	export interface UpdateMessageRequest {
	    read: boolean;
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class TemplateResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Template>}
	 * @implements {CSCoreSDK.HasInstanceResource<TemplateResource>}
	 */
	export class TemplatesResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Template>, CSCoreSDK.HasInstanceResource<TemplateResource> {
	    /**
	     * List of payment templates for current user.
	     * @param {TemplatesParameters=} params
	     * @returns {Promise<TemplateList>}
	     */
	    list: (params?: TemplatesParameters) => Promise<TemplateList>;
	    /**
	     * Get resource for template with a given id
	     * @param {string} id
	     * @returns {TemplateResource}
	     */
	    withId: (id: string) => TemplateResource;
	}
	/**
	 * @class TemplateResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<Template>}
	 */
	export class TemplateResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<Template> {
	    /**
	     * Get payment template detail
	     * @returns {Promise<Template>}
	     */
	    get: () => Promise<Template>;
	}
	/**
	 * @interface TemplateList
	 * @extends {CSCoreSDK.PaginatedListResponse<Template>}
	 */
	export interface TemplateList extends CSCoreSDK.PaginatedListResponse<Template> {
	}
	/**
	 * @interface Template
	 */
	export interface Template {
	    /**
	     * template ID
	     */
	    id: string;
	    /**
	     * name defined by user
	     */
	    name?: string;
	    /**
	     * Order category. Possible values: DOMESTIC, INTERNATIONAL
	     */
	    orderCategory?: string;
	    /**
	     * Receiver account number.
	     */
	    receiver: AccountNumber;
	    /**
	     * Convenience method for fetching templates detail
	     * @returns {Promise<Template>}
	     */
	    get: () => Promise<Template>;
	}
	/**
	 * @interface TemplatesParameters
	 * @extends {CSCoreSDK.Paginated}
	 */
	export interface TemplatesParameters extends CSCoreSDK.Paginated {
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class PhoneNumbersResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<PhoneNumber>}
	 * @implements {CSCoreSDK.CreateEnabled<PhoneNumberRequest, PhoneNumber>}
	 * @implements {CSCoreSDK.HasInstanceResource<PhoneNumberResource>}
	 */
	export class PhoneNumbersResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<PhoneNumber>, CSCoreSDK.CreateEnabled<PhoneNumberRequest, PhoneNumber>, CSCoreSDK.HasInstanceResource<PhoneNumberResource> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Returns list of phone numbers
	     * @returns {Promise<PhoneNumberList>}
	     */
	    list: () => Promise<PhoneNumberList>;
	    /**
	     * Creates new phone number
	     * @param {PhoneNumberRequest} payload
	     * @returns {Promise<PhoneNumber>}
	     */
	    create: (payload: PhoneNumberRequest) => Promise<PhoneNumber>;
	    /**
	     * Get single phone number with a given id
	     * @param {string} id
	     * @returns {PhoneNumberResource}
	     */
	    withId: (id: string) => PhoneNumberResource;
	}
	/**
	 * @class PhoneNumberResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.UpdateEnabled<PhoneNumberRequest, PhoneNumber>}
	 * @implements {CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse>}
	 */
	export class PhoneNumberResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.UpdateEnabled<PhoneNumberRequest, PhoneNumber>, CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse> {
	    /**
	     * Updates phone number
	     * @param {PhoneNumberRequest} payload
	     * @returns {Promise<PhoneNumber>}
	     */
	    update: (payload: PhoneNumberRequest) => Promise<PhoneNumber>;
	    /**
	     * Deletes phone number
	     * @returns {Promise<NetbankingEmptyResponse>}
	     */
	    delete: () => Promise<NetbankingEmptyResponse>;
	}
	/**
	 * @interface PhoneNumberList
	 * @extends {CSCoreSDK.ListResponse<PhoneNumber>}
	 */
	export interface PhoneNumberList extends CSCoreSDK.ListResponse<PhoneNumber> {
	}
	/**
	 * @interface PhoneNumber
	 * @extends {PhoneNumberRequest}
	 */
	export interface PhoneNumber extends PhoneNumberRequest {
	    /**
	     * Phone book entry identifier.
	     */
	    id: string;
	    /**
	     * Convenience method for updating Phone number
	     * @param {PhoneNumberRequest} payload
	     * @returns {Promise<PhoneNumber>}
	     */
	    update: (payload: PhoneNumberRequest) => Promise<PhoneNumber>;
	    /**
	     * Convenience method for deleting Phone number
	     * @returns {Promise<NetbankingEmptyResponse>}
	     */
	    delete: () => Promise<NetbankingEmptyResponse>;
	}
	/**
	 * @interface PhoneNumberRequest
	 */
	export interface PhoneNumberRequest {
	    /**
	     * Alias name of phone number entered by user for his better orientation in phone book.
	     */
	    alias?: string;
	    /**
	     * Phone number which will be saved in phone book. The value in the phone number field must be a 9-digit number that cannot have a leading zero.
	     */
	    phoneNumber: string;
	    /**
	     * Array of optional Flag values.
	     */
	    flags?: [string];
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class BudgetsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Budget>}
	 */
	export class BudgetsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<Budget> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Returns list of user's tracked categories and its limits.
	     * @returns {Promise<BudgetList>}
	     */
	    list: () => Promise<BudgetList>;
	    /**
	     * Set new value of tracked categories.
	     * @param {UpdateBudgets} payload
	     * @returns {Promise<UpdateBudgets>}
	     */
	    update: (payload: UpdateBudgets) => Promise<UpdateBudgets>;
	}
	/**
	 * @interface BudgetList
	 * @extends {CSCoreSDK.ListResponse<Budget>}
	 */
	export interface BudgetList extends CSCoreSDK.ListResponse<Budget> {
	}
	/**
	 * @interface Budget
	 */
	export interface Budget {
	    category: {
	        /**
	         * Unique id of watched main category of client transactions. Possible values are NON_REGULAR_INCOME, UNCATEGORIZED_INCOME, TRAVEL_HOLIDAYS, HEALTH, LEISURE, COMMUNICATION, CAR, FOOD, EDUCATION,
	         * REGULAR_INCOME, ONLINE_SHOPPING, OTHER_EXPENSES, CLOTHING, UNCATEGORIZED_EXPENSE, FEES, SAVINGS_INVESTMENT, TRANSPORT, ALIMONY_POCKET_MONEY, TAXES, WITHDRAWAL, LIVING_AND_ENERGY.
	         */
	        id: string;
	        /**
	         * Category level. Currently only "mainCategory" is supported.
	         */
	        level: string;
	    };
	    /**
	     * financial limit of the watched category per a given period.
	     */
	    budget?: Amount;
	}
	/**
	 * @interface UpdateBudgets
	 */
	export interface UpdateBudgets {
	    budgets: [Budget];
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class GoalsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Goal>}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdateGoal, UpdateGoal>}
	 */
	export class GoalsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<Goal>, CSCoreSDK.UpdateEnabled<UpdateGoal, UpdateGoal> {
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    constructor(basePath: string, client: CSCoreSDK.WebApiClient);
	    /**
	     * Returns list of user's saving goals except of completed ones. In price, only CZK currency is supported. If user has never set any goal, the response is empty.
	     * @returns {Promise<GoalList>}
	     */
	    list: () => Promise<GoalList>;
	    /**
	     * Set new value of goals. In price, only CZK currency is supported. If completed flag is not present, false value is supposed. All goals of given client are replaced - old ones (except of completed) are deleted and these new specified are inserted.
	     * @param {UpdateGoal} payload
	     * @returns {Promise<UpdateGoal>}
	     */
	    update: (payload: UpdateGoal) => Promise<UpdateGoal>;
	}
	/**
	 * @interface GoalList
	 * @extends {CSCoreSDK.ListResponse<Goal>}
	 */
	export interface GoalList extends CSCoreSDK.ListResponse<Goal> {
	}
	/**
	 * @interface Goal
	 */
	export interface Goal {
	    /**
	     * Saving goal name. Must be non-empty and unique among goals of one client.
	     */
	    name: string;
	    /**
	     * Price of the saving goal.
	     */
	    price: Amount;
	    /**
	     * Maximal date (deadline) of the saving goal completion.
	     */
	    deadline: Date;
	    /**
	     * Flag of the completed goal.
	     */
	    completed: boolean;
	}
	/**
	 * @interface UpdateGoal
	 */
	export interface UpdateGoal {
	    goals: [Goal];
	}

}
declare module CSNetbankingSDK {
	
	/**
	 * @class PromotionsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Promotion>}
	 * @implements {CSCoreSDK.CreateEnabled<CreatePromotionRequest, CreatePromotionResponse>}
	 */
	export class PromotionsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<Promotion>, CSCoreSDK.CreateEnabled<CreatePromotionRequest, CreatePromotionResponse> {
	    /**
	     * Returns promotion list for the current user
	     * @returns {Promise<PromotionList>}
	     */
	    list: () => Promise<PromotionList>;
	    /**
	     * Hide specified promotion
	     * @param {CreatePromotionRequest} payload
	     * @returns {Promise<CreatePromotionResponse>}
	     */
	    create: (payload: CreatePromotionRequest) => Promise<CreatePromotionResponse>;
	}
	/**
	 * @interface PromotionList
	 * @extends {CSCoreSDK.ListResponse<Promotion>}
	 */
	export interface PromotionList extends CSCoreSDK.ListResponse<Promotion> {
	}
	/**
	 * @interface Promotion
	 */
	export interface Promotion {
	    /**
	     * Id of campaign
	     */
	    promotionId: string;
	    displayType: {
	        /**
	         * Title of the promotion.
	         */
	        titleText?: string;
	        /**
	         * Additional - subline text for the title.
	         */
	        sublineText?: string;
	        /**
	         * The type of the layout for the campaign. Currently only these values are possible: OVERVIEW_CARD
	         */
	        displayType: string;
	        /**
	         * Type of the campaign, possible values are PRODUCT_PROMOTION, PLUGIN_PROMOTION, INFOCARD, SHADOWCARD
	         */
	        cardDesign: string;
	        /**
	         * relative path of url for the background picture published in WCM.
	         */
	        backgroundImage?: string;
	        /**
	         * relative path of url for the main picture published in WCM.
	         */
	        mainImage?: string;
	        /**
	         * Number of the row in the Overview screen, where the promotion should by displayed. Relevant only for displayType OVERVIEW_CARD
	         */
	        position: number;
	        /**
	         * Number of the column in the Overview screen, where the promotion should by displayed. Relevant only for displayType OVERVIEW_CARD
	         */
	        column: string;
	        /**
	         * Labeling of the main button. Can also be empty, if empty we don’t show a button. Max characters: 30 preliminary value can perhaps change later.
	         */
	        btnText?: string;
	        /**
	         * Key, describing the look of the main button. Must be one of the following values: DEFAULT BORDER PRIMARY SUCCESS INFO WARNING DANGER LINK, GREY
	         */
	        btnDesign?: string;
	    };
	    /**
	     * Possible actions. Each action is represented by related button on the promotion card/message etc.
	     */
	    actions: [{
	        /**
	         * Technical identifier of the action
	         */
	        actionID: string;
	        /**
	         * Type of the action button. Possible values are SHOPPRODUCT, SHOWURL, HIDE
	         */
	        actionType: string;
	        /**
	         * Name of the window where the url should be opened. This element is mandatory only in case of actionType = SHOWURL. Can be empty then same window
	         */
	        target?: string;
	        /**
	         * Contains the URL of an external site to be called. This element is only mandatory if actionType = SHOWURL
	         */
	        url?: string;
	        /**
	         * Code of the product/plugin connected to the sales promotion. Possible values are Possible values are: RUFO_ORDER, RUFO_INCREASE, UFO_ORDER, UFO_INCREASE.
	         */
	        productCode?: string;
	        /**
	         * Element connected to this action. Application specific attribute.
	         */
	        element: string;
	    }];
	}
	/**
	 * @interface CreatePromotionRequest
	 */
	export interface CreatePromotionRequest {
	    /**
	     * Id of campaign
	     */
	    promotionId: string;
	    executedAction: {
	        actionId: string;
	        actionType: string;
	    };
	}
	/**
	 * @interface CreatePromotionResponse
	 */
	export interface CreatePromotionResponse {
	    infoItems?: [{
	        infoName: string;
	        infoValue: string;
	    }];
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class AuthorizationLimitsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ParametrizedListEnabled<AuthorizationLimitsParams, AuthorizationLimit>}
	 * @implements {CSCoreSDK.HasInstanceResource<AuthorizationLimitResource>}
	 */
	export class AuthorizationLimitsResource extends CSCoreSDK.Resource implements CSCoreSDK.ParametrizedListEnabled<AuthorizationLimitsParams, AuthorizationLimit>, CSCoreSDK.HasInstanceResource<AuthorizationLimitResource> {
	    /**
	     * Return all user local specific payment order entry limits for for all user active authorization methods and channels/applications used in country.
	     * @param {AuthorizationLimitsParams=} params
	     * @returns {Promise<AuthorizationLimitList>}
	     */
	    list: (params?: AuthorizationLimitsParams) => Promise<AuthorizationLimitList>;
	    /**
	     * Get the resource of authorization limit with a given id
	     * @param {string} id
	     * @returns {AuthorizationLimitResource}
	     */
	    withId: (id: string) => AuthorizationLimitResource;
	}
	/**
	 * @class AuthorizationLimitResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<AuthorizationLimit>}
	 */
	export class AuthorizationLimitResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<AuthorizationLimit> {
	    /**
	     * Return local specific payment order entry limits valid for combination of user, authorization method and used channel/application. For example user could define different limits for TAC authorization via George and mobile applications.
	     * @returns {Promise<AuthorizationLimit>}
	     */
	    get: () => Promise<AuthorizationLimit>;
	}
	/**
	 * @interface AuthorizationLimitList
	 * @extends {CSCoreSDK.ListResponse<AuthorizationLimit>}
	 */
	export interface AuthorizationLimitList extends CSCoreSDK.ListResponse<AuthorizationLimit> {
	}
	/**
	 * @interface AuthorizationLimit
	 */
	export interface AuthorizationLimit {
	    /**
	     * Internal ID for limit definition for authorization type, channel, application. If internal ID doesn't exist, ID could be generated using authorizationType, channelId and applicationId values.
	     */
	    id: string;
	    /**
	     * Authorization method type for which is limit defined. ENUM: tac, tan, sms, gridCard, eok, displayCard, mToken other local authorization type has to be defined.
	     */
	    authorizationType: string;
	    /**
	     * ID of the channel for which is limit defined. ENUM: netBanking, mobileBanking, homeBanking, thirdParty, and unknown - limit valid for all channels, not particulary defined.
	     */
	    channelId: string;
	    /**
	     * ID of the application for which is limit defined. ENUM: George, InternetBanking and unknown - limit valid for all applications, not particulary defined.
	     */
	    applicationId: string;
	    /**
	     * Daily limit for particular authorization method (_embedded AMOUNT type)
	     */
	    dailyLimit?: Amount;
	    /**
	     * Transaction limit for particular authorization method.
	     */
	    transactionLimit?: Amount;
	    /**
	     * Maximal daily limit for authorization method defined by bank.
	     */
	    maxBankLimit?: Amount;
	    /**
	     * Convenience method for fetching authorization limit detail.
	     * @returns {Promise<AuthorizationLimit>}
	     */
	    get: () => Promise<AuthorizationLimit>;
	}
	/**
	 * @interface AuthorizationLimitsParams
	 */
	export interface AuthorizationLimitsParams {
	    /**
	     * Channel for which limits are requested. Example: George
	     */
	    channel?: string;
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class AuthorizationTokenResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse>}
	 */
	export class AuthorizationTokenResource extends CSCoreSDK.Resource implements CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse> {
	    /**
	     * Invalidate authorization token.
	     * @returns {Promise<NetbankingEmptyResponse>}
	     */
	    delete: () => Promise<NetbankingEmptyResponse>;
	}

}
declare module CSNetbankingSDK {
	
	
	/**
	 * @class BundlesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.CreateEnabled<BundleCreateRequest, BundleResponse>}
	 */
	export class BundlesResource extends CSCoreSDK.Resource implements CSCoreSDK.CreateEnabled<BundleCreateRequest, BundleResponse> {
	    /**
	     * @param {BundleCreateRequest} payload
	     * @returns {Promise<BundleResponse>}
	     */
	    create: (payload: BundleCreateRequest) => Promise<BundleResponse>;
	}
	/**
	 * @interface BundleCreateRequest
	 */
	export interface BundleCreateRequest {
	    /**
	     * Name of the bundle.
	     */
	    name: string;
	    /**
	     * Array of items in bundle. Every item represents payment order for batch sign.
	     */
	    items: [{
	        id: string;
	        signInfo: {
	            state: string;
	            signId: string;
	        };
	    }];
	}
	/**
	 * @interface BundleResponse
	 * @extends {CSCoreSDK.Signable}
	 */
	export interface BundleResponse extends CSCoreSDK.Signable {
	    /**
	     * Bundle identifier.
	     */
	    id: string;
	    /**
	     * Name of the bundle.
	     */
	    name?: string;
	    /**
	     * Array of items in bundle. Every item represents payment order for batch sign.
	     */
	    items: [{
	        id: string;
	        signInfo: SignInfo;
	    }];
	}

}
declare module CSNetbankingSDK {
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * Returns the singleton NetbankingClient
	 * @returns {NetbankingClient}
	 */
	export function getClient(): NetbankingClient;
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
	    constructor(config: CSCoreSDK.WebApiConfiguration, context: CSCoreSDK.WebApiContext);
	    /**
	     * List all accounts and get other information like balance, services, statements etc.
	     * @returns {AccountsResource}
	     */
	    readonly accounts: AccountsResource;
	    /**
	     * Get information about the current user's profile and past logins.
	     * @returns {ProfileResource}
	     */
	    readonly profile: ProfileResource;
	    /**
	     * List all cards and other information like delivery, transactions, limits etc.
	     * @returns {CardsResource}
	     */
	    readonly cards: CardsResource;
	    /**
	     * List, update and get payments, booking date or create and update domestic payments.
	     * @returns {OrdersResource}
	     */
	    readonly orders: OrdersResource;
	    /**
	     * @returns {SecuritiesResource}
	     */
	    readonly securities: SecuritiesResource;
	    /**
	     * @returns {SettingsResource}
	     */
	    readonly settings: SettingsResource;
	    /**
	     * @returns {ContactsResource}
	     */
	    readonly contacts: ContactsResource;
	    /**
	     * @returns {PluginsResource}
	     */
	    readonly plugins: PluginsResource;
	    /**
	     * @returns {ContractsResource}
	     */
	    readonly contracts: ContractsResource;
	    /**
	     * @returns {ServicesResource}
	     */
	    readonly services: ServicesResource;
	    /**
	     * @returns {MessagesResource}
	     */
	    readonly messages: MessagesResource;
	    /**
	     * @returns {TemplatesResource}
	     */
	    readonly templates: TemplatesResource;
	    /**
	     * @returns {PhoneNumbersResource}
	     */
	    readonly phoneNumbers: PhoneNumbersResource;
	    /**
	     * @returns {BudgetsResource}
	     */
	    readonly budgets: BudgetsResource;
	    /**
	     * @returns {GoalsResource}
	     */
	    readonly goals: GoalsResource;
	    /**
	     * @returns {PromotionsResource}
	     */
	    readonly promotions: PromotionsResource;
	    /**
	     * @returns {AuthorizationLimitsResource}
	     */
	    readonly authorizationLimits: AuthorizationLimitsResource;
	    /**
	     * @returns {AuthorizationTokenResource}
	     */
	    readonly authorizationToken: AuthorizationTokenResource;
	    /**
	     * @returns {BundlesResource}
	     */
	    readonly bundles: BundlesResource;
	}

}
