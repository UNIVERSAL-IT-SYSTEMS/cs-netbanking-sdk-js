/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount} from '../common';

/**
* Get information about the account's reservations
*/
export class AccountsReservationsResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<Reservation> {
    
    /**
    * Fetches the reservations and returns them in a promise
    */
    list = (params?: ReservationsParameters) : Promise<ReservationsList> => {
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'reservations', params, response => {
            
            // transform ISO dates to native Date objects
            CSCoreSDK.EntityUtils.addDatesToItems(['creationDate', 'expirationDate'], response);
            
            return response;
        });
    }
}

export interface ReservationsList extends CSCoreSDK.PaginatedListResponse<Reservation> {}

export interface Reservation {
    
    /**
    * Type of reservation. Possible values are CASH_WITHDRAWAL, PAYMENT, CARD_PAYMENT, OTHER
    */
    type: string;
    
    /**
    * Reservation status. Possible values are RESERVED, CANCELLED, EXPIRED. Currently only reservations with status RESERVED are supported.
    */
    status: string;
    
    /**
    * Transaction date and time.
    */
    creationDate: Date;
    
    /**
    * Reservation expiration date.
    */
    expirationDate?: Date;
    
    /**
    * Merchant Name / ATM.
    */
    merchantName?: string;
    
    /**
    * Merchant address.
    */
    "cz-merchantAddress"?: string;
    
    /**
    * Reservation description, additional info.
    */
    description: string;
    
    /**
    * The amount of reservation in account's currency
    */
    amount: Amount;
    
    /**
    * The amount of the reservation in transaction currency
    */
    amountSender?: Amount; 
}

export interface ReservationsParameters extends CSCoreSDK.Paginated {}