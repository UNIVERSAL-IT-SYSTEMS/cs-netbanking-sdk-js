# Securities

This guide walks you through retrieving list of securities, individual security detail and updating security. You can also update transactions and export them.

## List all securities

Securities account represents virtual account which holds securities titles and its shares (funds, bonds, etc.). List of securities accounts for current user by calling the `list` method on `SecuritiesResource`. The method takes object with properties such as `pageSize` or `sortBy` as a parameter. See all parameters in `SecuritiesParams` interface in [`securities.ts`](../lib/securities/securities.ts) file. For complete response see `SecurityList` in [`securities.ts`](../lib/securities/securities.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .securities
        .list({
            pageNumber: 0,
            pageSize: 10
        })
        .then(function(securities) {
            var security = securities.items[0];
            console.log(security.accountno); // 1034176627
        });

```

## Get security's detail

Retrieve security's detail by calling the `withId` method on `SecuritiesResource` with id as a parameter and then calling the `get` method. For full response see `Security` interface in [`securities.ts`](../lib/securities/securities.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .securities
        .withId('JLK21J3LKJ1')
        .get()
        .then(function(security) {
            console.log(security.description); // Aleš Vrba
        });

```

## Update security

Update security's settings by getting the `SecurityResource` and then calling the `update` method on it. The method takes object with properties as a parameter. Currently only alias can be changed. For all supported parameters see `ChangeCardsSettingsRequest` interface and `ChangeCardsSettingsResponse` interface for full response.

```javascript

    CSNetbankingSDK
        .getClient()
        .securities
        .withId('JLK21J3LKJ1')
        .update({
            alias: 'some alias'
        })
        .then(function(security) {
            console.log(security.alias); // some alias
        });

```

## Add or change note and mark transaction

Add, change or mark transaction by calling the `update` method on `SecurityTransactionResource` and passing it object with options as parameter. See all supported options in `SecurityTransactionRequest` interface and `SecurityTransactionResponse` interface for full response in [`transactions.ts`](../lib/securities/transactions.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .securities
        .withId('JLK21J3LKJ1')
        .transactions
        .withId('9070785')
        .update({
            note: 'This is a new note'
        })
        .then(function(response) {
            console.log(response.transaction.note); // This is a new note 
        });

```

## Export transaction history

Export transaction history into signed PDF by calling the `export` method on `SecurityTransactionsResource` and passing it object with options as parameter. See `ExportTransactionsParameters` in [`common.ts`](../lib/common.ts) for all supported parameters.

```javascript

    CSNetbankingSDK
        .getClient()
        .securities
        .withId('JLK21J3LKJ1')
        .transactions
        .export({
            dateFrom: new Date(2015, 2, 23),
            dateTo: new Date(2015, 2, 30),
            fields: 'note,payment'
        });

```