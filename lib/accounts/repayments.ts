import {Amount} from './accounts'

export interface RepaymentsListing {
    repaymenets: [Repayment]
}

export interface Repayment {
    repaymentDate: Date,
    amount: Amount,
    paidAmount?: Amount   
}