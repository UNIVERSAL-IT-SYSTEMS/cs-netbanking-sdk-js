/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

export interface Profile {
    firstName: string,
    lastName: string,
    salutation?: string,
    customerId: string,
    institudeId: number,
    marketingInfoAcceptance: string,
    gender: string,
    lastlogin?: Date
}

export interface LastLogin {
    lastlogin?: [LastLoginInfo]
}

export interface LastLoginInfo {
    channel: string,
    lastlogin: Date
}