/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

export interface Signable {
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
    signId?: string;
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

export interface StatementList extends CSCoreSDK.PaginatedListResponse<Statement> {}

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

export interface AddNoteAndMarkTransactionResponse extends Signable {
    
    /**
    * Transactions information
    */
    transaction: Transaction;
   
}

export interface TransactionList extends CSCoreSDK.PaginatedListResponse<Transaction>, Signable {}

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

export interface NetbankingParameters extends CSCoreSDK.Paginated, CSCoreSDK.Sortable {}

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
    fields: string|Array<string>;
    
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

export interface NetbankingEmptyResponse extends CSCoreSDK.EmptyResponse {}

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
    city?: string;

    /**
     * Zip code of the address.
     */
    zipCode?: string;

    /**
     * Address country.
     */
    country?: string;

    /**
     * More detailed description of address, company name or department.
     */
    description?: string;
}