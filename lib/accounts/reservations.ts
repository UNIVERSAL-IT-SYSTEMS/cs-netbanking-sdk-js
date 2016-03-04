/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount} from '../common';

export interface ReservationList extends CSCoreSDK.PaginatedListResponse<Reservation> {}

export interface Reservation {
    
    /**
    * Type of reservation. Possible values are CASH_WITHDRAWAL, PAYMENT, CARD_PAYMENT, OTHER
    */
    type: string,
    
    /**
    * Reservation status. Possible values are RESERVED, CANCELLED, EXPIRED. Currently only reservations with status RESERVED are supported.
    */
    status: string,
    
    /**
    * Transaction date and time.
    */
    creationDate: Date,
    
    /**
    * Reservation expiration date.
    */
    expirationDate?: Date,
    
    /**
    * Merchant Name / ATM.
    */
    merchantName?: string,
    
    /**
    * Merchant address.
    */
    // cz-merchantAddress?: string,
    
    /**
    * Reservation description, additional info.
    */
    description: string,
    
    /**
    * The amount of reservation in account's currency
    */
    amount: Amount,
    
    /**
    * The amount of the reservation in transaction currency
    */
    amountSender?: Amount     
}