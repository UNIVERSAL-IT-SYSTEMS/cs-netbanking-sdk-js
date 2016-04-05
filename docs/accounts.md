# Accounts

This guide walks you through retrieving current user's accounts detail and other information like account's services, transactions, repayments etc. There are also actions like changing account's settings or changing and adding note to transaction. Finally you can export transactions or download statements. 

## 1. List all of current user's accounts

You can list all of current user's accounts by calling the `list` method on `AccountsResource`. The method takes object with properties such as `pageSize` or `sortBy` as a parameter. See all parameters in `Parameters` interface in [`common.ts`](../lib/common.ts) file. For complete response see `AccountsList` in [`accounts.ts`](../lib/accounts/accounts.ts). 

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .list({
            pageNumber: 0,
            pageSize: 10,
            sortBy: 'iban',
            order: 'desc' 
        })
        .then(function(accounts) {
           var account = accounts.items[0];
           console.log(accounts.pagination.pageSize); // 10 
        });

```

## 2. Get individual current user's account

You can get detail of the individual current user's account by calling the `withId` method on `AccountsResource` with id as a parameter and then calling the `get` method. For complete response see `MainAccount` interface in [`accounts.ts`](../lib/accounts/accounts.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .get()
        .then(function(account) {
           console.log(account.productI18N); // Osobní účet ČS II 
        });

```

## 3. Update current user's account

You can update current user's account by calling the `withId` method on `AccountsResource` with `id` as a parameter and then calling the `update` method and giving it payload in object as a parameter. Currently only alias can be changed. For payload properties please see `ChangeAccountsSettingsRequest` interface and `ChangeAccountsSettingsResponse` interface for response in [`accounts.ts`](../lib/accounts/accounts.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .update({
            alias: 'muj ucet'
        })
        .then(function(account) {
            console.log(account.alias): // muj ucet 
        });

```   

## 4. Get account's balances

Get account's balances by getting the `AccountsBalanceResource` resource and then calling the `get` method. For complete response see `AccountsBalance` interface in [`balance.ts`](../lib/accounts/balance.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .balance
        .get()
        .then(function(balances) {
           console.log(balances.balance.value); // 42856 
        });

```

## 5. List account's services

List account's services by getting the `AccountsServicesResource` resource and then calling the `list` method. The method takes object with properties as a parameter. Services resource supports pagination. See all supported parameters in `ServicesParameters` interface in [`services.ts`].(../lib/accounts/services.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .services
        .list({
            pageSize: 10,
            pageNumber: 0
        })
        .then(function(services) {
            var service = services.items[0];
            console.log(service.nameI18N); // Všechny platby v KČ 
        });

```
## 6. Add or change note and mark transaction

Add, change or mark transaction by calling the `update` method on `AccountsTransactionResource` and passing it object with options as parameter. See all supported options in `ServicesParameters` interface and `ServicesList` interface for full response in [`services.ts`](../lib/accounts/services.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .transactions
        .withId('9070785')
        .update({
            note: 'This is new note'
        })
        .then(function(response) {
            console.log(response.transaction.note); // This is new note 
        });

```

## 7. Export transaction history

Export transaction history into signed PDF by calling the `export` method on `AccountsTransactionsResource` and passing it object with options as parameter. See `ExportTransactionsParameters` in [`common.ts`](../lib/common.ts) for all supported parameters.

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .transactions
        .export({
            dateFrom: new Date(2015, 2, 23),
            dateTo: new Date(2015, 2, 30),
            fields: 'note,payment'
        });

``` 

## 8. List account's reservations

List account's reservations by getting the `AccountsReservationsResource` resource and then calling the `list` method. The method takes object with properties as a parameter. See all supported parameters in `ReservationsResource` interface and `ReservationsList` for full response in [services.ts](../lib/accounts/reservations.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .reservations
        .list({
            pageSize: 10,
            pageNumber: 0
        })
        .then(function(reservations) {
            var reservation = reservations.items[0];
            console.log(reservation.status); // Reserved 
        });

```

## 9. Transfer

Update transfer by getting the `AccountsTransferResource` and then calling the `update` method on it. The method takes object with properties as a parameter. See all supported properties in `TransferRequest` interface and `TransfereResponse` for full response in [`transfer.ts`](../lib/accounts/transfer.ts).    

```javascript
    
    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .transfers
        .update({
            type: "REVOLVING_LOAN_DISBURSEMENT",
            amount: {
                value: 1000,
                precision: 2,
                currency: "CZK"
            },
            transferDate: new Date(2015, 2, 28),
            recipientNote: "note"
        })
        .then(function(response) {
            console.log(response.signInfo.state); // OPEN 
        });

```

## 10. List account's repayments

List account's repayments by getting the `AccountsRepaymentsResource` resource and then calling the `list` method. For full response see `RepaymentsList` in [`repayments.ts`](../lib/accounts/repayments.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .repayments
        .list()
        .then(function(repayments) {
            var repayment = repayments.items[0];
            console.log(repayment.amount.value); // 32500 
        });

```

## 11. List account's statements

List account's statements by getting the `AccountsStatementsResource` resource and then calling the `list` method. The method takes object with properties such as `pageSize` or `sortBy` as a parameter. See all supported parameters in `Parameters` interface in [`common.ts`](../lib/common.ts). For full response see `StatementsList` interface in [`statements.ts`](../lib/accounts/statements.ts). 

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
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

## 12. Download account's statement

Download account's statement by getting the `AccountsStatementsResource` resource and then calling the `download` method on it. The method takes object with properties as a parameter. For all supported parameters see `DownloadStatementsParamaters` in [`common.ts`](../lib/common.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .statements
        .download({
            format: 'PDF_A4',
            statementId: 239820940
        });

```

## 13. List sub account's statements

List sub account's statements by getting the `SubAccountsStatementsResource` resource and the calling the `list` method on it. The list method takes object with properties as a parameter. See all supported parameters in `Parameters` interface and `StatementsList` interface for full response in [`common.ts`](../lib/common.ts). 

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .subaccounts
        .withId('8979DS98792KJ972')
        .statements
        .list({
            pageNumber: 0,
            pageSize: 10,
            sort: 'statementDate'
        })
        .then(function(statements) {
            var statement = statements.items[0];
            console.log(statement.periodicity); // MONTHLY
        });

```

## 14. Download sub account's statements

Download sub account's statement by getting the `SubAccountsStatementsResource` and then calling the `download` method on it. The method takes object with properties as a paramater. For all supported parameters see `DownloadStatementsParameters` interface in [`common.ts`](../lib/common.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .subaccounts
        .withId('8979DS98792KJ972')
        .statements
        .download({
            format: 'PDF_A4',
            statementId: 239824534
        });

```