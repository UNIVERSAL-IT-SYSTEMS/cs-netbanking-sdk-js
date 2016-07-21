/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

export class ContactsResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<any>, CSCoreSDK.HasInstanceResource<ContactResource> {

    list = (): Promise<any> => {
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'contacts');
    }

    withId = (id: string): ContactResource => {
        return new ContactResource(id, this.getPath(), this.getClient());
    }
}

export class ContactResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.GetEnabled<any> {

    get = (): Promise<any> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null);
    }
}