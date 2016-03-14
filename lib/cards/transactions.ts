/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {TransactionList, AddNoteAndMarkTransactionsRequest} from '../common';

/**
* Allows to add or change a client's personal note and mark/star the card transaction as favorite/important for one specific transaction
*/
export class CardTransactionsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<CardTransactionResource> {
    
    /**
     * Returns CardTransactionResource for a given id
     */
    withId = (id: string) : CardTransactionResource => {
        return new CardTransactionResource(id, this.getPath(), this._client);
    }
    
    /**
     * Export transactions to PDF
     */ 
    export = (params: CardTransactionsParameters) : Promise<> => {
        // zkontrolovat, pravděpodobně nebude fungovat
        return CSCoreSDK.ResourceUtils.CallCreateWithSuffix(this, 'export', params);
    }
}

/**
 * Add or change a client's personal note and mark/star the card transaction as favorite/important
 */ 
export class CardTransactionResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionsRequest, TransactionList> {
    
}

export interface CardTransactionsParameters {
    
    // prověřit
    /**
     * Date from which transactions should be exported. Example: 1999-09-27T00%3A00%3A00%2B02%3A00.
     */ 
    dateFrom: string;
    
    // prověřit
    /**
     * Date to which transactions should be exported Example: 2000-09-27T00%3A00%3A00%2B02%3A00.
     */
    dateTo: string;
    
    /**
     * Array of fields which should appear in export. Possible fields are: bookingDate, partner, amount, currency, variableSymbol, constantSymbol, specificSymbol, transactionType, note, paymentReference, senderReference, cardNumber, investmentInstrumentName, marked, valuationDate, referenceId, 
     * location Example: bookingDate,partner,amount,currency.
     */
    fields: string;
    
    /**
     * Indication whether account name should be visible in export. Default is false. Example: true.
     */
    showAccountName?: boolean;
    
    /**
     * Indication whether account number should be visible in export. Default is false. Example: true.
     */
    showAccountNumber?: boolean;
    
    /**
     * Indication whether timespan of the export should be visible. Default is false. Example: true.
     */
    showTimestamp?: boolean;
    
    /**
     * Indication whether balance of the account should be visible in export. Default is false. Example: true.
     */
    showBalance?: boolean;
}