import {Pagination, Amount, Signed} from '../accounts/accounts';

export interface OrdersListing extends Pagination {
    orders: [Order]    
}

export interface Order {
    id: string,
    referenceId?: string,
    orderCategory: string,
    orderType: string,
    senderName?: string,
    sender: Person,
    receiverName?: string,
    receiver: Person,
    amount: Amount,
    symbols?: Symbols,
    additionalInfo?: Info,
    senderReference?: string,
    executionDate?: Date,
    modificationDate?: Date,
    transferDate?: Date,
    expirationDate?: Date,    
    //cz-orderingDate: Date,
    state: string,
    stateDetail: string,
    stateOk: string,
    //cz-description?: string,
    applicationId?: string,
    channelId?: string,
    receiverAddress?: string,
    flags?: [string],
    // ¯\_(ツ)_/¯ not signable according to the documentation checkmark
    signInfo?: Signed    
}

export interface Person {
    // cz-iban?: string,
    // cz-bic?: string,
    number: string,
    bankCode: string,
    countryCode?: string
}

export interface Symbols {
    variableSymbol?: string,
    constantSymbol?: string,
    specificSymbol?: string,
}

export interface Info {
    text4x35?: [string]
}

export interface RemovePaymentOrderResponse {
    signInfo: Signed
}