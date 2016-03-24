/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Signable} from '../common';
import {Confirmation} from './delivery';

/**
 * Issue various actions on a single card. 
 */
export class CardActionsResource extends CSCoreSDK.Resource
implements CSCoreSDK.UpdateEnabled<CardsActionsRequest, CardsActionsResponse> {
    
    /**
     * Issues various actions on a single card  
     */ 
    update = (payload: CardsActionsRequest): Promise<CardsActionsResponse> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
    } 
}

export interface CardsActionsResponse extends Signable {}

export interface CardsActionsRequest {
    
   /**
    * Action which should be issued. Possible values are "REISSUE_PIN", "LOCK_CARD", "UNLOCK_CARD", "REPLACE_CARD", "ACTIVATE_CARD", "SET_AUTOMATIC_REPLACEMENT_ON", "SET_AUTOMATIC_REPLACEMENT_OFF".
    */
    action: string;
    
    /**
    * Reason why card should be locked. Possible values are "THEFT" and "LOSS". Relevant only for action "LOCK_CARD".
    */
    lockReason?: string;
    
    /**
    * Information about the confirmation
    */
    confirmations?: [Confirmation];
}