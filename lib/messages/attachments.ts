import * as CSCoreSDK from 'cs-core-sdk';

export class MessageAttachmentsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.HasInstanceResource<MessageAttachmentResource> {

  /**
   * Get the resource of attachments 
   */
  withId = (id: string): MessageAttachmentResource => {
    return new MessageAttachmentResource(id, this.getPath(), this.getClient());
  }
}

export class MessageAttachmentResource extends CSCoreSDK.InstanceResource {

  /**
   * Downloads attachment file. The binary representation of an attachment file, with a “Content-Disposition” header of type attachment (including the filename), in order to instruct the browser to open a save dialog.
   */
  download = (): Promise<any> => {
    return CSCoreSDK.ResourceUtils.CallDownload(this, null, 'POST');
  }
}