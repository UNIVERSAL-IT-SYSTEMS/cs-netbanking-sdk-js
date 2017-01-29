/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import * as CSCoreSDK from 'cs-core-sdk';
import {Amount} from '../../common';

export class InsurancesContractEventsResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<ContractEvent> {

    constructor(basePath: string, client: CSCoreSDK.WebApiClient) {    
        super(basePath, client);
        
        // insert 'cz' resource into the resource's path because the api requires it in some resources
        this._path = this.getPath().replace('/my', '/cz/my');
    }

    /**
     * Returns list of events for the life insurance
     */
    list = (): Promise<ContractEventList> => {
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'events').then(response => {
            response.items.forEach(item => {
                CSCoreSDK.EntityUtils.addDatesFromISO(['substateDate', 'processingDate', 'creationDate'], item);
                
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
    creationDate: Date;

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