import {Pagination} from './accounts';

export interface StatementsListing extends Pagination {
    statements?: Statement
}

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