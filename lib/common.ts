/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

export interface Signed {
    signInfo?: SignInfo
}

export interface SignInfo {
    state: string,
    signId?: number
}

export interface AccountNo {
    number: string,
    bankCode: string,
    countryCode?: string,
    // cz-iban: string,
    // cz-bic: string,
}

export interface Amount {
    value: number,
    precision: number,
    currency: string
}

export interface StatementList extends CSCoreSDK.PaginatedListResponse<Statement> {}

export interface Statement {
    id: string,
    number: number,
    statementDate: Date,
    periodicity: string,
    format?: string,
    language: string,
    //cz-fileTotalNumber: string,
    //cz-fileOrderNumber: string
}

export interface AddNoteAndMarkTransactionsRequest {
    note?: string,
    flags?: [string]
}

export interface TransactionList extends CSCoreSDK.PaginatedListResponse<Transaction>, Signed {}

export interface Transaction {
    id: string,
    note?: string,
    flags?: [string]
}