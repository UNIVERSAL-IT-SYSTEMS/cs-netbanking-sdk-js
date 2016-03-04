/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {AccountNo, Amount, Signed} from '../common';

export interface PayUpCreditCardRequest {
    type: string,
    sender: Sender,
    amount: Amount    
}

export interface Sender {
    id?: string,
    accountno: AccountNo
}

export interface PayUpCreditCardResponse extends Signed {}