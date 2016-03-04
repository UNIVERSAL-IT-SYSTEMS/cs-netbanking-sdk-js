/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Signed} from '../common';
import {Confirmation} from './delivery';

export interface IssueCardActionResponse extends Signed {}

export interface IssueCardActionRequest {
    action: string,
    lockReason?: string,
    confirmations: [Confirmation]
}