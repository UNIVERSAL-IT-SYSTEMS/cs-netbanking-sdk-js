/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

export class AccountStandingOrdersResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<any>, CSCoreSDK.HasInstanceResource<AccountStandingOrderResource>, CSCoreSDK.CreateEnabled<any, any> {

    //date transforms
    
    list = (params: any): Promise<any> => {

        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'standingOrders', params, response => {
            return response;
        });
    }

    withId = (id: string): AccountStandingOrderResource => {
        return new AccountStandingOrderResource(id, this.getPath(), this.getClient());
    }

    create = (payload): Promise<any> => {
        return CSCoreSDK.ResourceUtils.CallCreate(this, payload);
    }
}

export class AccountStandingOrderResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.GetEnabled<any>, CSCoreSDK.DeleteEnabled<any> {
    
    // date transforms
    get = (): Promise<any> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null);
    }

    delete = (): Promise<any> => {
        return CSCoreSDK.ResourceUtils.CallDelete(this, null);
    }
}