
import * as CSCoreSDK from 'cs-core-sdk';
import {Message} from './messages';

export class MessagesMandatoryResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<Message> {

    /**
     * Returns all mandatory messages. This call might return different messages based on appId of the caller (for example, some messages might be specific to an application). Which messages can be seen by which application can be configured on the presto server side.
     */
    list = (): Promise<MandatoryMessageList> => {
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'messages').then(response => {
            CSCoreSDK.EntityUtils.addDatesToItems(['date'], response);

            return response;
        });
    }
}

export interface MandatoryMessageList extends CSCoreSDK.ListResponse<Message> {}