/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

export class SettingsResource extends CSCoreSDK.Resource
implements CSCoreSDK.GetEnabled<any>, CSCoreSDK.UpdateEnabled<any, any> {

    get = (): Promise<any> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null);
    }

    update = (payload: any): Promise<any> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
    }
}