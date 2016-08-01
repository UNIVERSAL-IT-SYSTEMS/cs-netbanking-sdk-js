/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

export class MessageAttachmentsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<MessageAttachmentResource> {

    withId = (id: string): MessageAttachmentResource => {
        return new MessageAttachmentResource(id, this.getPath(), this.getClient());
    }
}

export class MessageAttachmentResource extends CSCoreSDK.InstanceResource {

    download = (): Promise<any> => {
        return CSCoreSDK.ResourceUtils.CallDownload(this, null, 'POST');
    }
}