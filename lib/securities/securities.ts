/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {SecurityTransactionsResource} from './transactions';

export class SecuritiesResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<any>, CSCoreSDK.HasInstanceResource<SecurityResource> {
    
    list = (params?: any): Promise<any> => {
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'securitiesAccounts', params, response => {
            return response;
        });
    }
    
    withId = (id: string): SecurityResource => {
        return new SecurityResource(id, this.getPath(), this.getClient());
    }
}

export class SecurityResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.GetEnabled<any>, CSCoreSDK.UpdateEnabled<any, any> {
    
    get = (): Promise<any> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null);
    }
    
    update = (payload: any): Promise<any> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
    }

    get transactions(): SecurityTransactionsResource {
        return new SecurityTransactionsResource(`${this.getPath()}/transactions`, this.getClient());
    }
}