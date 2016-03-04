/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount, AccountNumber, Signed} from '../common';

export interface CardsListing extends CSCoreSDK.PaginatedListResponse<Card> {}

export interface Card {
    id: string,
    alias?: string,
    owner: string,
    number: string,
    sequenceNumber: string,
    productI18N: string,
    productCode?: string,
    expiryDate?: Date,
    validFromDate?: Date,
    state: string,
    type: string,
    provider: string,
    lockReason?: string,
    characteristics?: string,
    limit?: Amount,
    balance?: Amount,
    outstandingAmount?: Amount,
    installmentDueDate?: Date,
    mainAccount?: MainAccount,
    // cz-overallCardAccountLimits?: {
    //  limitATM?: Amount,
    //  limitPOS?: Amount
    // },
    cardDeliveryMode?: string,
    features?: [string],
    flags?: [string]
}

export interface MainAccount {
    id?: string,
    holderName: string,
    accountno: AccountNumber
}

export interface ChangeCardSettingsResponse extends Card {
    minimalMonthlyAmount?: Amount,
    branchId?: string,
    signInfo: Signed
} 

export interface ChangeCardSettingsRequest {
    id?: string,
    alias?: string
}