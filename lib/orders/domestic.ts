/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount, Signed} from '../common';
import {Person, Info, Symbols, Order} from './orders';

export interface DomesticOrderRequest extends Signed {
    id?: string,
    senderName: string,
    sender: Person,
    receiverName: string,
    receiver: Person,
    amount: Amount,
    transferDate?: Date,
    additionalInfo?: Info,
    senderReference?: string,
    symbols?: Symbols,
    flags?: [string] 
}

export interface DomesticOrderResponse extends Order {}