/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

export class LoyaltyContractsResource extends CSCoreSDK.Resource
implements CSCoreSDK.GetEnabled<Loyalty> {

    get = (): Promise<Loyalty> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null).then(response => {
            CSCoreSDK.EntityUtils.addDatesFromISO('exportDate', response);

            return response;
        });
    }
}

export interface Loyalty {

    /**
     * State of the ibod account. Possible values are REGISTERED, UNREGISTERED, DEACTIVATED_FROM_FSCS.
     */
    state: string;

    /**
     * Date when data were actual.
     */
    exportDate: Date;

    /**
     * IBod points count.
     */
    pointsCount: number;

    /**
     * Activation ibod code.
     */
    activationCode?: string; 
}