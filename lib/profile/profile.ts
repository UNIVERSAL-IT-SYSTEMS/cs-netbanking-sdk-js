/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {LastLoginResource} from './lastLogin';

/**
* Get information about the profile and past logins.
*/
export class ProfileResource extends CSCoreSDK.Resource
implements CSCoreSDK.GetEnabled<Profile> {
    
    /** 
     * Returns information about the profile 
     */  
    get = (): Promise<Profile> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null);
    }
    
    /** 
     * Returns LastLoginResource for listing past logins
     */
    get lastLogin() {
        return new LastLoginResource(this.getPath() + '/logininfo', this.getClient());
    }
}

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