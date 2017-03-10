import * as CSCoreSDK from 'cs-core-sdk';

/**
 * @class MessageAttachmentsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.HasInstanceResource<MessageAttachmentResource>}
 */
export class MessageAttachmentsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.HasInstanceResource<MessageAttachmentResource> {

  /**
   * Get the resource of attachments 
   * @param {string} id
   * @returns {MessageAttachmentResource}
   */
  withId = (id: string): MessageAttachmentResource => {
    return new MessageAttachmentResource(id, this.getPath(), this.getClient());
  }
}

/**
 * @class MessageAttachmentResource
 * @extends {CSCoreSDK.InstanceResource}
 */
export class MessageAttachmentResource extends CSCoreSDK.InstanceResource
  implements CSCoreSDK.DownloadEnabled<Uint8Array> {

  /**
   * Downloads attachment file. The binary representation of an attachment file, with a “Content-Disposition” header of type attachment (including the filename), in order to instruct the browser to open a save dialog.
   * @returns {Promise<Uint8Array>}
   */
  download = (): Promise<Uint8Array> => {
    return CSCoreSDK.ResourceUtils.CallDownload(this, null, 'POST');
  }
}