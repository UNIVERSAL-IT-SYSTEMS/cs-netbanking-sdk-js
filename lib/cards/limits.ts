import {Amount, Signed} from '../accounts/accounts';
import {Confirmation} from './delivery';

export interface LimitsListing {
    limits?: [Limit]
}

export interface Limit {
    limitType: string,
    limitPeriod: string,
    limit?: Amount,
    temporaryLimit?: Amount,
    bankLimit?: Amount,
    temporaryLimitExpiration?: Date
}

export interface ChangeCardLimitsResponse extends LimitsListing {
    confirmations?: [Confirmation],
    signInfo: Signed
}

export interface ChangeCardLimitsRequest extends LimitsListing {
    confirmations?: [Confirmation],
}