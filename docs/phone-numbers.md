# Phone numbers

This guide walks you through listing all phone numbers, creating new ones and updating and deleting existing ones.

## List all phone numbers

List all phone numbers by calling the `list` method on `PhoneNumbersResource`. For complete response see `PhoneNumberList` in [`phone-numbers.ts`](../lib/phone-numbers/phone-numbers.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .phoneNumbers
        .list()
        .then(function(response) {
            var item = response.items[0];
            console.log(item.phoneNumber); // 723892238
        });

``` 

## Create phone number entry

Create phone number entry by getting the `PhoneNumbersResource` resource and then calling the `create` method. The `create` method takes object with properties as a parameter. See `PhoneNumberRequest` interface for all supported parameters in and `PhoneNumber` interface for full response in [`phone-numbers.ts`](../lib/phone-numbers/phone-numbers.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .phoneNumbers
        .create({
            alias: 'Graham Bell',
            phoneNumber: '777952341',
            flags: [
                'isFavourite'
            ]
        })
        .then(function(response) {
            console.log(response.phoneNumber); // 777952341
        });

```

## Update phone number entry

Update phone number entry by getting the `PhoneNumberResource` resource and then calling the `update` method. The `update` method takes object with options as a parameter. For all supported options see `PhoneNumberRequest` interface and for full response see `PhoneNumber` interface in [`phone-numbers.ts`](../lib/phone-numbers/phone-numbers.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .phoneNumbers
        .withId('723876987')
        .update({
            alias: 'Graham B.',
        })
        .then(function(phoneNumber) {
            console.log(phoneNumber.alias); // Graham B.
        });

```

## Delete phone number entry

Delete payment by getting the `PhoneNumberResource` resource and then calling the `delete` method.

```javascript

    CSNetbankingSDK
        .getClient()
        .phoneNumbers
        .withId('723876987')
        .delete();

```