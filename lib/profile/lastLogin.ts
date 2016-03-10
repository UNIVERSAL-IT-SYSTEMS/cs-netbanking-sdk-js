/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

export class LastLoginResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<LastLoginInfo> {
    
    list = () : Promise<LastLoginList> => {
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'lastlogin');
    }
}

export interface LastLoginList extends CSCoreSDK.ListResponse<LastLoginInfo> {}

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