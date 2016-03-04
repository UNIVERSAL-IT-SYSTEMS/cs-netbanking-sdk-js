/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Signed, Amount} from '../common';

export interface TransfersResponse extends Signed {}

export interface TransfersRequest {
    
   /**
    * Type of the transfer. Currently only REVOLVING_LOAN_DISBURSEMENT is supported.
    */
    type: string,
    
    /**
    * Amount which should be transfered.
    */
    amount: Amount,
    
    /**
    * Payment transfer date.
    */
    transferDate: Date,
    
    /**
    * Note for the recipient.
    */
    recipientNote?: string
}