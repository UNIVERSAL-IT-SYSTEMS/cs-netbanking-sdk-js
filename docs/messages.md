# Messages

This guide walks you through listing all messages, mandatory messages and retrieving, updating and deleting message. You can also download message attachments.

## List all messages

You can list all messages by calling the `list` method on `MessagesResource`. The method takes object with properties such as `pageSize` as a parameter. See all parameters in `MessagesParameters` interface in [`messages.ts`](../lib/messages/messages.ts) file. For complete response see `MessageList` also in [`messages.ts`](../lib/messages/messages.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .messages
        .list({
            pageNumber: 0,
            pageSize: 10
        })
        .then(function(messages) {
            var message = messages.items[0];
            console.log(message.subject); // test message
        });

```

## Get message detail

Get detail of the message by calling the `withId` method on `MessagesResource` with `id` as a parameter and then calling the `get` method. For complete response see `Message` interface in [`messages.ts`](../lib/messages/messages.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .messages
        .withId('134625')
        .get()
        .then(function(messages) {
            var message = messages.items[0];
            console.log(message.subject); // test message
        });

```

## Update message

Update message by calling the `withId` method on `MessagesResource` with `id` as a parameter and then calling the `update` method and giving it payload in object as a parameter. This call marks message as read. For payload properties please see `UpdateMessageRequest` interface and in [`messages.ts`](../lib/messages/messages.ts). 

```javascript

    CSNetbankingSDK
        .getClient()
        .messages
        .withId('134625')
        .update({
            read: true
        });

```

## Delete message

Remove existing message by calling the `withId` method on `MessagesResource` with `id` as a parameter and then calling the `delete` method. Only read messages can be deleted.

```javascript

    CSNetbankingSDK
        .getClient()
        .messages
        .withId('134625')
        .delete();

```

## Download message's attachments

Download message's attachment by getting the `MessageResource` and from there get `MessageAttachmentsResource` where you call the `withId` method with attachment `id` as a parameter. Finally call `download` method.

```javascript

    CSNetbankingSDK
        .getClient()
        .messages
        .withId('1234625)
        .attachments
        .withId('palec.png')
        .download();

```

## List mandatory messages

You can list all messages by calling the `list` method on `MessagesResource`. For complete response see `MandatoryMessageList` in [`mandatory.ts`](../lib/messages/mandatory.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .messages
        .mandatory
        .list()
        .then(function(messages) {
            var message = messages.items[0];
            console.log(message.subject); // test message
        });

```