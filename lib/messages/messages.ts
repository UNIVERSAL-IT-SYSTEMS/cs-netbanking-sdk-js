/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {MessagesMandatoryResource} from './mandatory';
import {MessageAttachmentsResource} from './attachments';
import {NetbankingEmptyResponse} from '../common';

export class MessagesResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<Message>, CSCoreSDK.HasInstanceResource<MessageResource> {

    list = (params?: MessagesParameters): Promise<MessageList> => {
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'messages', params, response => {

            response.items.forEach(item => {
                transformDates(item);
                resourcifyMessages(<Message>item, this.withId((<Message>item).id));
            });

            return response;
        });
    }

    withId = (id: string): MessageResource => {
        return new MessageResource(id, this.getPath(), this.getClient());
    }

    get mandatory(): MessagesMandatoryResource {
        return new MessagesMandatoryResource(`${this.getPath()}/mandatory`, this.getClient());
    }
}

export class MessageResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.GetEnabled<Message>, CSCoreSDK.UpdateEnabled<UpdateMessageRequest, NetbankingEmptyResponse>, CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse> {

    get = (): Promise<Message> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null).then(response => {
            transformDates(response);
            resourcifyMessages(<Message>response, this);        

            return response;
        });
    }

    update = (payload: UpdateMessageRequest): Promise<NetbankingEmptyResponse> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
    }

    delete = (): Promise<NetbankingEmptyResponse> => {
        return CSCoreSDK.ResourceUtils.CallDelete(this, null);
    }

    get attachments(): MessageAttachmentsResource {
        return new MessageAttachmentsResource(`${this.getPath()}/attachments`, this.getClient());
    }
}

function transformDates(item) {
    CSCoreSDK.EntityUtils.addDatesFromISO(['date'], item);
}

function resourcifyMessages(message: Message, messageReference: MessageResource) {
    message.get = messageReference.get;
    message.update = messageReference.update;
    message.delete = messageReference.delete;
}

export interface MessageList extends CSCoreSDK.PaginatedListResponse<Message> {}

export interface Message {

    /**
     * Message identifier.
     */
    id: string;

    /**
     * Name of the message sender. For example source system of the message.
     */
    from: string;

    /**
     * Message subject.
     */
    subject: string;
    
    /**
     * Date when message was sent/generated.
     */
    date: Date;

    /**
     * Body of the message. Body is html code. It is up to FE application to properly display it.
     */
    body: string;

    /**
     * Array of message attachments.
     */
    attachments: [{

        /**
         * Attachment identifier.
         */
        id: string;

        /**
         * File name of the attachment.
         */
        fileName: string;
    }];

    /**
     * Array of flags for messages.
     */
    flags?: [string];

    /**
     * Convenience get method for fetching message detail
     */
    get: () => Promise<Message>;

    /**
     * Convenience update method for updating message
     */
    update: (payload: UpdateMessageRequest) => Promise<NetbankingEmptyResponse>;

    /**
     * Convenience delete method for deleting message
     */
    delete: () => Promise<NetbankingEmptyResponse>;
}

export interface MessagesParameters extends CSCoreSDK.Paginated {}

export interface UpdateMessageRequest {
    read: boolean;
}