/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount, Signed, AccountNumber} from '../common';
import {Info, Symbols, Order} from './orders';

export interface DomesticOrderRequest extends Signed {
    
    /**
    * Internal identifier of payment order. Note that after signing of the order the id could change.
    */
    id?: string,
    
    /**
    * Name of the sender
    */
    senderName: string,
    
    /**
    * Account number of the sender.
    */
    sender: AccountNumber,
    
    /**
    * Name of the payee
    */
    receiverName: string,
    
    /**
    * Account number of payee
    */
    receiver: AccountNumber,
    
    /**
    * Payment order amount.
    */
    amount: Amount,
    
    /**
    * Optional date (in the future) when this payment has to be done
    */
    transferDate?: Date,
    
    /**
    * Message for payee set during payment order creation. It is used to identify transaction on receiver side. Array of texts 4x35
    */
    additionalInfo?: Info,
    
    /**
    * Message for me set during payment order creation.
    */
    senderReference?: string,
    
    /**
    * Information about the symbols
    */
    symbols?: Symbols,
    
    /**
    * Array of optional Flag values depends on Payment order category, type.
    */
    flags?: [string] 
}

export interface DomesticOrderResponse extends Order {}