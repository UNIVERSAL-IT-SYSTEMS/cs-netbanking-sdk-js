/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount} from '../../common';

export class InsurancesContractEventsResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<ContractEvent> {

    list = (): Promise<ContractEventList> => {
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'events').then(response => {
            response.items.forEach(item => {
                CSCoreSDK.EntityUtils.addDatesFromISO(['substateDate', 'processingDate'], item);
                
                if((<ContractEvent>item).indemnities && Array.isArray((<ContractEvent>item).indemnities)) {
                    (<ContractEvent>item).indemnities.forEach(indemnity => {
                        CSCoreSDK.EntityUtils.addDatesFromISO('paymentDate', indemnity);
                    });
                }
            });

            return response;
        });
    }
}

export interface ContractEventList extends CSCoreSDK.ListResponse<ContractEvent> {}

export interface ContractEvent {

    /**
     * Insurance event number
     */
    number: string;

    /**
     * Creation date of the insurance event.
     */
    creationDate: string;

    /**
     * State of the event. Possible values: REPORTED, ATTACHING_DOCS, IN_SOLUTION, CLOSED
     */
    state: string;

    /**
     * Substate of the event.
     */
    substate?: string;

    /**
     * Date that relates to the insurance substate.
     */
    substateDate?: Date;

    /**
     * Substate information with text and date.
     */
    substateInfo?: string;

    /**
     * Total amount for the insurance event
     */
    amount: Amount;

    /**
     * The date when thi event has been reported
     */
    processingDate?: Date;

    /**
     * List of indemnities related to the insurance event.
     */
    indemnities?: [{

        /**
         * Date of the payment was paid out.
         */
        paymentDate: Date;

        /**
         * Method of the transfer.
         */
        transferMethod: string;

        /**
         * Receiver name.
         */
        receiverName: string;

        /**
         * Paid indemnity value.
         */
        amount: Amount;
    }];
}