import * as CSCoreSDK from 'cs-core-sdk';
import { Message } from './messages';

/**
 * @class MessagesMandatoryResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.ListEnabled<Message>}
 */
export class MessagesMandatoryResource extends CSCoreSDK.Resource
  implements CSCoreSDK.ListEnabled<Message> {

  /**
   * Returns all mandatory messages. This call might return different messages based on appId of the caller (for example, some messages might be specific to an application). Which messages can be seen by which application can be configured on the presto server side.
   * @return {Promise<MandatoryMessageList>}
   */
  list = (): Promise<MandatoryMessageList> => {
    return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'messages').then(response => {
      CSCoreSDK.EntityUtils.addDatesToItems(['date'], response);

      return response;
    });
  }
}

/**
 * @interface MandatoryMessageList
 * @extends {CSCoreSDK.ListResponse<Message>}
 */
export interface MandatoryMessageList extends CSCoreSDK.ListResponse<Message> { }