/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount, Signed} from '../common';
import {Person} from './orders';

export interface MobilePaymentsRequest {
    paymentType: string,
    phoneNumber: string,
    sender: Person,
    amount: Amount,
    invoiceNumber?: string,
    confirmationPhoneNumber: string   
}

export interface MobilePaymentsResponse extends MobilePaymentsRequest {
    signInfo: Signed            
}