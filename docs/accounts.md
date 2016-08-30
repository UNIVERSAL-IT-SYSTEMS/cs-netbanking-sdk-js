# Accounts

This guide walks you through retrieving current user's accounts detail and other information like account's services, transactions, repayments etc. There are also actions like changing account's settings or changing and adding note to transaction. Finally you can export transactions or download statements. 

## List all of current user's accounts

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

## Get individual current user's account

You can get detail of the individual current user's account by calling the `withId` method on `AccountsResource` with `id` as a parameter and then calling the `get` method. For complete response see `MainAccount` interface in [`accounts.ts`](../lib/accounts/accounts.ts).

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

## Update current user's account

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

## Get account's balances

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

## List account's services

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
## Add or change note and mark transaction

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

## Export transaction history

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

## List account's reservations

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

## Revolve loan disbursement

Revolve loan disbursement by getting the `AccountsTransferResource` and then calling the `update` method on it. The method takes object with properties as a parameter. See all supported properties in `TransferRequest` interface and `TransfereResponse` for full response in [`transfer.ts`](../lib/accounts/transfer.ts).    

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

## List account's repayments

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

## List account's statements

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

## Download account's statement

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

## List sub account's statements

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

## Download sub account's statements

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

## Standing/Sweep Orders

### List standing/sweep orders

Retrieve list of actual standing/sweep orders for accounts of the current user by getting the `AccountStandingOrdersResource` and then calling the `list` method on it. The method takes object with properties as a parameters. For all supported parameters see `NetbankingParameters` interface in [`common.ts`](../lib/common.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .standingOrders
        .list({
            pageNumber: 0,
            pageSize: 10
        })
        .then(function(orders) {
            var order = orders.items[0];
            console.log(order.number); // LJL234L243JL
        });

```

### Get detail of standing/sweep order

Get detail of actual standing/sweep order identified by its number by calling the `withId` method on `AccountStandingOrderResource` with `id` as a parameter and then calling the `get` method. For complete response see `StandingOrder` interface in [`standing-orders.ts`](../lib/accounts/standing-orders.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .standingOrders
        .withId('JK123908JL')
        .get()
        .then(function(order) {
            console.log(order.number); // LJL234L243JL
        });

```

### Delete standing/sweep order

Remove existing standing/sweep order by calling the `withId` method on `AccountStandingOrdersResource` with `id` as a parameter and then calling the `delete` method. No more payments for the order are executed after the change has been signed.

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .standingOrders
        .withId('JK123908JL')
        .delete()
        .then(function(orders) {
            var order = orders.items[0];
            console.log(order.number); // LJL234L243JL
        });

```

### Create standing/sweep order

Create standing/sweep order by getting the `AccountStandingOrdersResource` and calling the `create` method on it. The method takes object as a parameter. See `CreateStandingOrderRequest` interface for all properties and `StandingOrderResponse` interface for full response in [`standing-orders.ts`](../lib/accounts/standing-orders.ts). Once order has been signed new payments are generated and executed according its settings.

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .standingOrders
        .create({
            type: 'STANDING_ORDER',
            alias: 'Monthly standing order executed on the last day of month',
            receiverName: 'Name of the receiver',
            receiver: {
                number: '188505042',
                bankCode: '0300'
            },
            amount: {
                value: 30000,
                precision: 2,
                currency: 'CZK'
            },
            nextExecutionDate: '2016-12-31',
            executionMode: 'UNTIL_CANCELLATION',
            executionDueMode: 'DUE_LAST_DAY_OF_MONTH',
            executionInterval: 'MONTHLY',
            symbols: {
                variableSymbol: '854259',
                constantSymbol: '0305',
                specificSymbol: '785421'
            }
        })
        .then(function(orders) {
            console.log(order.number); // 160526104005956
        });

```

## Direct debits

### List all account's direct debits

Direct Debit List represents collection of all direct debit approvals entered by user for the specified user. List all account's direct debits by getting the `AccountDirectDebitsResource` and calling the `list` method on it. The method takes object with properties as a parameters. For all supported parameters see `NetbankingParameters` interface in [`common.ts`](../lib/common.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .directDebits
        .list({
            pageNumber: 0,
            pageSize: 1
        })
        .then(function(directDebits) {
            var directDebit = directDebits.items[0];
            console.log(directDebit.type); // DIRECT_DEBIT
        });

```

### Get direct debit's detail


Get single direct debit's detail by calling the `withId` method on `AccountDirectDebitResource` with `id` as a parameter and then calling the `get` method. For complete response see `DirectDebit` interface in [`direct-debits.ts`](../lib/accounts/direct-debits.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .directDebits
        .withId('2313')
        .get()
        .then(function(directDebits) {
            var directDebit = directDebits.items[0];
            console.log(directDebit.type); // DIRECT_DEBIT
        });

```

### Delete direct debit

Remove existing direct debit by calling the `withId` method on `AccountDirectDebitsResource` with `id` as a parameter and then calling the `delete` method. Once signed no more transfers can be made by receiver party.

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .directDebits
        .withId('2313')
        .delete()
        .then(function(directDebits) {
            var directDebit = directDebits.items[0];
            console.log(directDebit.type); // DIRECT_DEBIT
        });

```

### Create direct debit  

Create (or allow) direct debit on certain account by getting the `AccountDirectDebitsResource` and calling the `create` method on it. The method takes object as a parameter. See `DirectDebit` interface for all properties and `SignableDirectDebit` interface for full response in [`direct-debits.ts`](../lib/accounts/direct-debits.ts). Once signed it can be used by receiver party. 

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .directDebits
        .create({
            type: 'DIRECT_DEBIT',
            receiver: {
                number: '428602109',
                bankCode: '0800',
            },
            alias: 'moje inkaso',
            periodicity: 1,
            periodCycle: 'MONTHLY',
            limit: {
                value: 100000,
                precision: 2,
                currency: 'CZK'
            },
            limitSum: {
                value: 300000,
                precision: 2,
                currency: 'CZK'
            },
            numberLimit: 5,
            startDate: '2017-07-14',
            endDate: '2018-07-14',
            symbols: {
                variableSymbol: '4567',
                specificSymbol: '800'
            }
        })
        .then(function(directDebit) {
            console.log(directDebit.alias); // moje inkaso
        });

```
