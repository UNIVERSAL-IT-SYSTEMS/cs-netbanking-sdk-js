/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Signed, Amount} from '../common';

export interface TransfersResponse {
    signInfo: Signed
}

export interface TransfersRequest {
    type: string,
    amount: Amount,
    transferDate: Date,
    recipientNote?: string
}