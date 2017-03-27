# Contacts

This guide walks you through retrieving user's contact information. It can contain addresses, phones and email addresses.

## List all contacts

List all of current user's contact information by calling the `list` method on `ContactsResource`. For full response see `ContactList` interface in [`contacts.ts`](../lib/contacts/contacts.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .contacts
        .list()
        .then(function(contacts) {
            var contact = contacts.items[0];
            console.log(contact.type); // ADDRESS
        });

```

## Get contact detail

You can get detail of the user's contact information by calling the `withId` method on `ContactsResource` with `id` as a parameter and then calling the `get` method. For complete response see `Contact` interface in [`contact.ts`](../lib/contact/contact.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .contacts
        .withId('postaladdresspermanent')
        .then(function(contact) {
            console.log(contact.type); // ADDRESS
        });

```