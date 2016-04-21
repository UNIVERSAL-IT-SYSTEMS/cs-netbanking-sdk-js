/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Signable} from '../common';
import {Confirmation} from './delivery';

/**
 * Issue various actions on a single card. 
 */
export class CardActionsResource extends CSCoreSDK.Resource
implements CSCoreSDK.UpdateEnabled<CardActionRequest, CardActionResponse> {
    
    /**
     * Issues various actions on a single card  
     */ 
    update = (payload: CardActionRequest): Promise<CardActionResponse> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
    } 
}

export interface CardActionResponse extends Signable {}

export interface CardActionRequest {
    
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