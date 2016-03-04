/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

export interface SecureSettings {
    status?: string,
    pam?: string,
    phoneNumber?: string,
    language?: string
}