import {Signed} from '../accounts/accounts';
import {Confirmation} from './delivery';

export interface IssueCardActionResponse {
    signInfo: Signed
}

export interface IssueCardActionRequest {
    action: string,
    lockReason?: string,
    confirmations: [Confirmation]
}