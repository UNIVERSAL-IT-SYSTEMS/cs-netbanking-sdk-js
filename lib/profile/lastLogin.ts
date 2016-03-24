/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

/** 
 * List all past logins
 */
export class LastLoginResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<LastLoginInfo> {
    
    /** 
     * Returns promise with a list of past logins
     */ 
    list = () : Promise<LastLoginList> => {
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'lastlogin').then(response => {
           
            CSCoreSDK.EntityUtils.addDatesToItems('lastlogin', response); 
            return response;
        });
    }
}

export interface LastLoginList extends CSCoreSDK.ListResponse<LastLoginInfo> {}

export interface LastLoginInfo {
    
    /**
    * Channel of the last login.
    */
    channel: string;
    
    /**
    * Date of the last login.
    */
    lastlogin: Date;
}