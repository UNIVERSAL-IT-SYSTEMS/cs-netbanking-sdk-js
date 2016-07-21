/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

export class PluginsResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<any>, CSCoreSDK.HasInstanceResource<PluginResource> {

    list = (params: any): Promise<any> => {
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'plugins', params, response => {
            return response;
        });
    }

    withId = (id: string): PluginResource => {
        return new PluginResource(id, this.getPath(), this.getClient());
    }
}

export class PluginResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.UpdateEnabled<any, any> {

    update = (payload: any) => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
    }
}