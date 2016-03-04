/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount, Signed} from '../common';

export interface OrdersListing extends CSCoreSDK.PaginatedListResponse<Order> {}

export interface Order extends Signed {
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

export interface RemovePaymentOrderResponse extends Signed {}