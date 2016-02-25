import {Pagination, Amount, AccountNo, Signed} from '../accounts/accounts';

export interface CardsListing extends Pagination {
    cards: [Card]
}

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
    accountno: AccountNo
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