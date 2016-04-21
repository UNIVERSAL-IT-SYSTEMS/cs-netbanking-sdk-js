# Cards

This guide walks you through retrieving current user's cards and information like limits, transactions, transfers etc. You can also issue card's actions or updating or adding and marking a transaction.

## 1. List all of current user's cards

You can list all of current user's cards by calling the `list` method on `CardsResource`. The method takes object with properties such as `pageSize` or `sortBy` as a parameter. See all supported parameters in `Parameters` interface in [`common.ts`](../lib/common.ts). For full response see `CardsList` interface in [`cards.ts`](../lib/cards/cards.ts). 

```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .list({
           pageSize: 20,
           pageNumber: 0,
           sortBy: 'id' 
        })
        .then(function(cards) {
            var card = cards.items[0];
            console.log(card.type); // BANK_CARD
        });

```

## 2. Get card's detail

You can get detail of the individual card by calling the `withId` method on `CardsResource` with id as a parameter and then calling the `get` method. For full response see `Card` interface in [`cards.ts`](../lib/cards/cards.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .withId('76FABDF10FD983EA144FF90EB3EB64AAFC67A664')
        .get()
        .then(function(card) {
            console.log(card.owner); // ŠVANTNER MAREK
        });

```

## 3. Update card's settings

Update card's settings by getting the `CardResource` and then calling the `update` method on it. The method takes object with properties as a parameter. Currently only alias can be changed. For all supported parameters see `ChangeCardsSettingsRequest` interface and `ChangeCardsSettingsResponse` interface for full response.

```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .withId('76FABDF10FD983EA144FF90EB3EB64AAFC67A664')
        .update({
            alias: 'my card'
        })
        .then(function(card) {
            console.log(card.alias); // my card 
        });

```

## 4. Get card's delivery information

Get card's delivery by getting the `CardsDeliveryResource` resource and then calling the `get` method. For full response see `DeliveryListing` interface in [`delivery.ts`](../lib/cards/delivery.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .withId('76FABDF10FD983EA144FF90EB3EB64AAFC67A664')
        .delivery
        .get()
        .then(function(delivery) {
            console.log(delivery.address.street); // Antala Staška
        });

```

## 5. Update card's delivery

Update card's delivery by getting the `CardsDeliveryResource` resource and then calling the `update` method. The `update` method takes object with properties as a parameter. For all supported parameters see `ChangeDeliverySettingsRequest` interface and for full response see `ChangeDeliverySettingsResponse` interface in [`delivery.ts`](../lib/cards/delivery.ts). 


```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .withId('76FABDF10FD983EA144FF90EB3EB64AAFC67A664')
        .delivery
        .update({
            cardDeliveryMode: "BRANCH",
            confirmations: [
                {
                    email: "john.doe@test.com",
                    language: "cs"
                }
            ] 
        })
        .then(function(delivery) {
            console.log(delivery.cardDeliveryMode); // BRANCH 
        });

```

## 6. Add or change note and mark transaction

Add or change note and mark transaction by getting the `CardsTransactionsResource` and calling the `update` method on it. The method takes object with properties as a parameter. See all supported parameters in `AddNoteAndMarkTransactionsRequest` interface and `AddNoteAndMarkCardsTransactionsResponse` interface for full response in [`transactions.ts`](../lib/cards/transactions.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .withId('76FABDF10FD983EA144FF90EB3EB64AAFC67A664')
        .transactions
        .withId('KJH769826183GK12321')
        .update({
            note: "some note",
            flags: [
                "hasStar"
            ]
        })
        .then(function(response) {
            console.log(response.cardTransaction.note); // some note 
        });

```

## 7. Export transaction history

Extract transaction history into signed PDF by getting the `CardsTransactionsResource` and calling the `export` method on it. The method takes object with properties as a parameter. See all supported parameters in `ExportTransactionsParameters` interface in [`common.ts`](../lib/common.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .withId('76FABDF10FD983EA144FF90EB3EB64AAFC67A664')
        .transactions
        .export({
            dateFrom: new Date(2015, 2, 23),
            dateTo: new Date(2015, 2, 30),
            fields: 'note,payment'
        });

```

## 8. Issue card's action

Issue card's action by getting the `CardsActionsResource` and calling the `update` method on it. Currently supported actions are reissue pin, lock card, unlock card, activate card, set automatic card replacement on, set automatic card replacement off and replacement card request. Possibility to issue action is controlled by flags and features on particular card:

- reissue pin - reissuePin feature
- lock card - onlineLocking feature
- unlock card - onlineUnlocking feature
- activate card - activationAllowed flag
- set automatic card replacement on - if automaticReplacementOn flag is not present
- set automatic card replacement off - if automaticReplacementOn flag is present
- replace card - replacementCard feature

For supported parameters see `CardsActionsRequest` interface and `CardsActionsResponse` interface for full response in [`actions.ts`](../lib/common.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .withId('76FABDF10FD983EA144FF90EB3EB64AAFC67A664')
        .actions
        .create({
            action: 'ACTIVATE_CARD'
        })
        .then(function(response) {
            
        });

```

## 9. Get card's limits

Get card's limits by getting the `CardsLimitsResource` resource and then calling the `list` method. For full response see `CardsLimitsList` interface in [`limits.ts`](../lib/cards/limits.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .withId('76FABDF10FD983EA144FF90EB3EB64AAFC67A664')
        .limits
        .list()
        .then(function(limits) {
            var limit = limits.items[0];
            console.log(limit.limitType); // ATM 
        });

```

## 10. Update card's limits

Update card's limits by getting the `CardsLimitsResource` resource and then calling the `update` method. The method takes object with properties as a parameter. See all supported parameters in `ChangeCardsLimitsRequest` interface and `ChangeCardsLimitsResponse` interface for full response in [`limits.ts`](../lib/cards/limits.ts). 

```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .withId('76FABDF10FD983EA144FF90EB3EB64AAFC67A664')
        .limits
        .update({
            limits: [
                {
                    limitType: 'ATM',
                    limitPeriod: '5D',
                    limit: {
                        value: 1100000,
                        precision: 2,
                        currency: 'CZK'
                    }
                }
            ]
        })
        .then(function(response) {
            var limit = response.limits[0];
            console.log(limit.limitType); // ATM         
        });

```

## 11. Get card's 3D Secure status

Get card's 3D Secure status by getting the `CardsSecure3DResource` resource and then calling the `get` method. See `SecureSettings` interface for full response in [`secure3D.ts`](../lib/cards/secure3D.ts).  

```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .withId('76FABDF10FD983EA144FF90EB3EB64AAFC67A664')
        .secure3d
        .get()
        .then(function(response) {
           console.log(response.status); // OK 
        });

```

## 12. Pay up credit card debt

Pay up credit card debt by getting the `CardsTransferResource` resource and then calling the `update` method. The method takes object with properties as a parameter. See `PayUpCreditCardRequest` interface for supported parameters and `PayUpCreditCardResponse` interface for full response in [`transfer.ts`](../lib/cards/transfer.ts). 

```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .withId('76FABDF10FD983EA144FF90EB3EB64AAFC67A664')
        .transfer
        .update({
            type: "DEBT_REPAYMENT",
            sender: {
                accountno: {
                    number: "2326573123",
                    bankCode: "0800"
                }
            },
            amount: {
                value: 500000,
                precision: 2,
                currency: "CZK"
            }
        })
        .then(function(response) {
            
        });

```

## 13. Get statements of a card's account

Get statements of a card's account by getting the `CardsAccountsResource` resource then calling the `withId` method and passing it id of the account after that getting the `CardsStatementsResource` resource and finally calling the `list` method. The method takes object with properties such as `pageSize` or `sortBy` as a parameter. See all supported parameters in `Parameters` interface and `StatementsList` interface for full response in [`common.ts`](../lib/common.ts).   

```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .withId('76FABDF10FD983EA144FF90EB3EB64AAFC67A664')
        .account
        .withId('D81E28ADD904A6DD08956E46A3F68CEAF32C8399')
        .statements
        .list({
            pageSize: 10,
            pageNumber: 0,
            sortBy: 'statementDate'
        })
        .then(function(statements) {
            var statement = statements.items[0];
            console.log(statement.periodicity); // MONTHLY 
        });

```

## 14. Download statement of a card's account

Download statement of a card's account by getting the `CardsStatementsResource` resource and then calling the `download` method. The method takes object with properties as a parameter. See `DownloadStatementsParameters` interface for all supported parameters in [`common.ts`](../lib/common.ts). 

```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .withId('76FABDF10FD983EA144FF90EB3EB64AAFC67A664')
        .account
        .withId('D81E28ADD904A6DD08956E46A3F68CEAF32C8399')
        .statements
        .download({
            format: 'PDF_A4',
            statementId: 239820940
        });

```