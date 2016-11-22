/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Signable, ExportTransactionsParameters} from '../common';

export class SecurityTransactionsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<SecurityTransactionResource> {


    constructor(basePath: string, client: CSCoreSDK.WebApiClient) {
        super(basePath, client);
        
        this._path = this.getPath().replace('/my', '/cz/my');
    }

    /**
     * Get resource of security transaction with a given id
     */
    withId = (id: string): SecurityTransactionResource => {
        return new SecurityTransactionResource(id, this.getPath(), this.getClient());
    }

    /**
     * Export transaction history into signed pdf. 
     */
    export = (params: ExportTransactionsParameters): Promise<any> => {

        // transform "fields" parameter to comma separated list from array
        CSCoreSDK.EntityUtils.transformArrayParamsToString(params, 'fields');
        
        // transform Date objects to ISO strings
        CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);

        return this._client.callApi(`${this.getPath()}/export`, 'POST', params, null, null, 'arraybuffer');
    }
    
}

export class SecurityTransactionResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.UpdateEnabled<SecurityTransactionRequest, SecurityTransactionResponse> {

    /**
     * Allows to add or change a client's personal note and mark/star the transaction as favorite/important for one specific transaction on selected product.
     */
    update = (payload: SecurityTransactionRequest): Promise<SecurityTransactionResponse> => {
        (<any>payload).id = this._id;
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {

            CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), this.getPath());

            return response;
        });
    }

}

export interface SecurityTransactionRequest {

    /**
     * Personal, user specific note for transaction. Max. 4 000 characters.
     */
    note?: string;

    /**
     * List of flags.
     */
    flags?: [string];
}

export interface SecurityTransactionResponse extends CSCoreSDK.Signable {

    transaction: {

        /**
         * Transaction identifier.
         */
        id: string;

        /**
         * Personal, user specific note for transaction. Max. 4 000 characters.
         */
        note?: string;

        /**
         * List of flags.
         */
        flags?: [string];
    }
}