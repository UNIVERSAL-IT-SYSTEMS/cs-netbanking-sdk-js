/// <reference path="../../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

export class InsurancesContractServicesResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<any> {

    list = (): Promise<any> => {
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'insurees');
    }
}