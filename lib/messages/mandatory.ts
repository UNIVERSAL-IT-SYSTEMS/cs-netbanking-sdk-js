/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Message} from './messages';

export class MessagesMandatoryResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<Message> {

    list = (): Promise<MandatoryMessageList> => {
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'messages').then(response => {
            CSCoreSDK.EntityUtils.addDatesToItems(['date'], response);

            return response;
        });
    }
}

export class MandatoryMessageList extends CSCoreSDK.ListResponse<Message> {}