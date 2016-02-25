import {Signed, Amount} from './accounts';

export interface TransfersResponse {
    signInfo: Signed
}

export interface TransfersRequest {
    type: string,
    amount: Amount,
    transferDate: Date,
    recipientNote?: string
}