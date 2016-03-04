/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

export interface Profile {
    
    /**
    * user's first name
    */
    firstName: string,
    
    /**
    * user's last name
    */
    lastName: string,
    
    /**
    * user's name used for salutation
    */
    salutation?: string,
    
    /**
    * customer's id
    */
    customerId: string,
    
    /**
    * number of institute
    */
    institudeId: number,
    
    /**
    * Has the customer approved §107 telecommunication act. Possible values: ACCEPTED, NOT_ACCEPTED, UNKNOWN.
    */
    marketingInfoAcceptance: string,
    
    /**
    * user's gender. Possible values: MALE, FEMALE, UNKNOWN.
    */
    gender: string,
    
    /**
    * Date and time of the last login of customer. Common last login for all client applications - George, QC, etc.
    */
    lastlogin?: Date
}

export interface LastLogin {
    
    /**
    * Description of profile login info
    */
    lastlogin?: [LastLoginInfo]
}

export interface LastLoginInfo {
    
    /**
    * Channel of the last login.
    */
    channel: string,
    
    /**
    * Date of the last login.
    */
    lastlogin: Date
}