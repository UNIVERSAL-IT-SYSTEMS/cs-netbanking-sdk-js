/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Signed} from '../common';
import {Confirmation} from './delivery';

export class CardActionsResource extends CSCoreSDK.Resource
implements CSCoreSDK.CreateEnabled<IssueCardActionRequest, IssueCardActionResponse> {
    
}

export interface IssueCardActionResponse extends Signed {}

export interface IssueCardActionRequest {
    
   /**
    * Action which should be issued. Possible values are "REISSUE_PIN", "LOCK_CARD", "UNLOCK_CARD", "REPLACE_CARD", "ACTIVATE_CARD", "SET_AUTOMATIC_REPLACEMENT_ON", "SET_AUTOMATIC_REPLACEMENT_OFF".
    */
    action: string,
    
    /**
    * Reason why card should be locked. Possible values are "THEFT" and "LOSS". Relevant only for action "LOCK_CARD".
    */
    lockReason?: string,
    
    /**
    * Information about the confirmation
    */
    confirmations: [Confirmation]
}