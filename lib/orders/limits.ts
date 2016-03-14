/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount} from '../common';

/**
* Get remaining amounts for payment orders
*/
export class PaymentsLimitsResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<Limit> {
    
    /**
    * List all limits for payment orders
    */  
    list = (): Promise<PaymentsLimitList> => {
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'remainingLimits', null);
    }
}

export interface PaymentsLimitList extends CSCoreSDK.PaginatedListResponse<Limit> {}

export interface Limit {
    
    /**
    * Authorization method type for which is limit defined. ENUM: tac, tan, sms, gridCard, eok, displayCard, mToken. Other local authorization type has to be defined.
    */
    authorizationType: string;
    
    /**
    * ID of the channel for which is limit defined. ENUM: netBanking, mobileBanking, homeBanking, thirdParty, and unknown - remaining limit amount valid for all channels, not particulary defined.
    */
    channelId: string;
    
    /**
    * ID of the application for which is limit defined. ENUM: George, InternetBanking and unknown - remaining limit amount valid for all applications, not particulary defined.
    */
    applicationId: string;
    
    /**
    * Remaining Daily amount which can be transferred using particular authorization method and channel (_embedded AMOUNT type).
    */
    remainingAmount: Amount;   
}