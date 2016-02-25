import {Signed} from './accounts';

export interface TransactionsListing {
    transaction: Transaction,
    signInfo: Signed
}

export interface Transaction {
    id: string,
    note?: string,
    flags?: [string]
}

export interface AddNoteAndMarkTransactionsRequest {
    note?: string,
    flags?: [string]
}