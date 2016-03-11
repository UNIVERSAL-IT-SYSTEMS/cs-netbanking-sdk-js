#Using NetbankingSDK
Netbanking SDK allows you to get information user's profile, accounts, cards and orders payments from Česká spořitelna a.s.

This SDK uses [ES6-promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) as its return values from asynchronous calls.

##Before You Begin

Before using CoreSDK in your application, you need to initialize it by providing it your WebApiKey.

```javascript
    //Set your WebApi key
    CSCoreSDK.useWebApiKey( "YourApiKey" )
    //Get NetbankingClient
    var netbankingClient = CSNetbankingSDK.getClient();
```

##Resources
These resources are available on the [`NetbankingClient`](../lib/netbanking.ts). 

- ProfileResource - Get detail of the current user and information about his last logins.
- AccountsResource - List all of current user's accounts, get detail of an individual account and additional information about it.
- CardsResource -  List all of current user's cards, get detail of an individual card and additional information about it.
- OrdersResource - Get list of payment orders for accounts of the current user, create domestic orders and get infomation about user's limits.

To get resource instances see the following code snippet.

```javascript
    // Get netbankingClient
    var netbankingClient = CSNetbankingSDK.getClient();
    
    // Get ProfileResource Instance 
    netbankingClient.profile
    
    // Get AccountsResource Instance
    netbankingClient.accounts
    
    // Get CardsResource Instance
    netbankingClient.cards
    
    // Get Orders Instance
    netbankingClient.orders

```

##Usage
This usage guide walks you through getting detail of the current user, information about his last logins, listing all current user's accounts and cards and additional information about it and payments options.  


###1. Profile

####1. Get currrent user's profile detail

You can get current users profile detail by calling the `get` method on `ProfileResource`.

```javascript

    CSNetbankingSDK
        .getClient()
        .profile
        .get()
        .then(function(profile) {
            console.log(profile.firstName) // Jan
        });

```

####2. List curremt user's last logins

You can list current user's last logins by calling the `list` method on `LastLoginResource`.

```javascript

    CSNetbankingSDK
        .getClient()
        .profile
        .LastLogin
        .list()
        .then(function(logins) {
           var login = logins.items[0];
           console.log(login.channel); // GEORGE 
        });

```

###2. Accounts

####1. List all of current user's accounts

You can list all of current user's accounts by calling the `list` method on `AccountsResource`. The method takes object with properties such as `pageSize` or `sortBy` as a parameter. See all available parameters in `Parameters` interface in [`common.ts`](../lib/common.ts) file. 

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

####2. Individual account info

#####1. Get individual current user's account

You can get detail of the individual current user's account by calling the `withId` method on `AccountsResource` with id as a parameter and then calling the `get` method.

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

#####2. Get account's balances

Get account's balances by getting the `AccountsBalanceResource` resource and then calling the `get` method.

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

#####3. List account's services

List account's services by getting the `AccountsServicesResource` resource and then calling the `list` method. The method takes object with properties as a parameter. See all available parameters in `ServicesParameters` interface in [services.ts](../lib/accounts/services.ts) file.

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .services
        .list({
            pageSize: 10
        })
        .then(function(services) {
            var service = services.items[0];
            console.log(service.nameI18N); // Všechny platby v KČ 
        });

```

#####4. List account's reservations

List account's reservations by getting the `AccountsReservationsResource` resource and then calling the `list` method. The method takes object with properties as a parameter. See all available parameters in `ReservationsResource` interface in [services.ts](../lib/accounts/reservations.ts) file.

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .reservations
        .list({
            pageSize: 10
        })
        .then(function(reservations) {
            var reservation = reservations.items[0];
            console.log(reservation.status); // Reserved 
        });

```

#####5. List account's repayments

List account's repayments by getting the `AccountsRepaymentsResource` resource and then calling the `list` method.

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

#####6. List account's statements

List account's statements by getting the `AccountsStatementsResource` resource and then calling the `list` method. The method takes object with properties such as `pageSize` or `sortBy` as a parameter. See all available parameters in `Parameters` interface in [`common.ts`](../lib/common.ts) file. 

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .withId('CCA4F9863D686D04')
        .statements
        .list({
            pageSize: 10,
            sortBy: 'statementDate'
        })
        .then(function(statements) {
            var statement = statements.items[0];
            console.log(statement.periodicity); // MONTHLY
        });

```

###3. Cards

####1. List all of current user's cards

You can list all of current user's cards by calling the `list` method on `CardsResource`. The method takes object with properties such as `pageSize` or `sortBy` as a parameter. See all available parameters in `Parameters` interface in [`common.ts`](../lib/common.ts) file.

```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .list({
           pageSize: 20,
           sortBy: 'id' 
        })
        .then(function(cards) {
            var card = cards.items[0];
            console.log(card.type); // BANK_CARD
        });

```

####2. Individual card info

#####1. Get card's detail

You can get detail of the individual card by calling the `withId` method on `CardsResource` with id as a parameter and then calling the `get` method.

```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .withId('76FABDF10FD983EA144FF90EB3EB64AAFC67A664')
        .get()
        .then(function(card) {
            console.log(card.owner); // ŠVANTNER MAREK
        })

```

#####2. Get card's delivery information

Get card's delivery by getting the `CardDeliveryResource` resource and then calling the `get` method.

```javascript

    CSNetbankingSDK
        .getClient()
        .cards
        .withId('76FABDF10FD983EA144FF90EB3EB64AAFC67A664')
        .delivery
        .get()
        .then(function(delivery) {
            console.log(delivery.address.street); // Antala Staška
        })

```

#####3. Get card's limits

Get card's limits by getting the `CardLimitsResource` resource and then calling the `list` method.

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

#####4. Get card's 3D Secure status

Get card's 3D Secure status by getting the `CardSecure3DResource` resource and then calling the `get` method.

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

#####5. Get statements of a card's account

Get statements of a card's account by getting the `CardAccountsResource` resource then calling the `withId` method and passing it id of the account after that getting the `CardStatementsResource` resource and finally calling the `list` method. The method takes object with properties such as `pageSize` or `sortBy` as a parameter. See all available parameters in `Parameters` interface in [`common.ts`](../lib/common.ts) file. 

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
            sortBy: 'statementDate'
        })
        .then(function(statements) {
            var statement = statements.items[0];
            console.log(statement.periodicity); // MONTHLY 
        });

```

###4. Orders Payments

####1. List all payment orders

List all payment orders by calling the `list` method on `PaymentsResource` resource. The method takes object with properties such as `pageSize` or `sortBy` as a parameter. See all available parameters in `Parameters` interface in [`common.ts`](../lib/common.ts) file.

```javascript

    CSNetbankingSDK
        .getClient()
        .orders
        .payments
        .list({
            pageSize: 20,
            sortBy: 'transferDate'
        })
        .then(function(payments) {
            var payment = payments.items[0];
            console.log(payment.orderCategory); // DOMESTIC
        });
    
```

####2. Get payment's detail

Get payment's detail by calling the `withId` method on `PaymentsResource` resource and then calling the `get` method.

```javascript

    CSNetbankingSDK
        .getClient()
        .orders
        .payments
        .withId('150506293532245')
        .get()
        .then(function(payment) {
            console.log(payment.orderType); // PAYMENT_OUT
        });

```

####3. Get remaining amounts for payment orders

Get remaining amounts for payment orders by getting the `PaymentsLimitsResource` resource and then calling the `list` method.

```javascript

    CSNetbankingSDK
        .getClient()
        .orders
        .payments
        .limits
        .list()
        .then(function(limits) {
            var limit = limits.items[0];
            console.log(limits.remainingAmount.value); // 25000 
        });
```


## Demo
Check out the [AngularJS demo application](https://github.com/Ceskasporiteln/csas-sdk-demo-js) for usage demonstration.

##Further documentation
Please see the documented [TypeScript definition file](../dist/cs-places-sdk.sfx.d.ts) for detailed description of the functionalities provided by this SDK.

This SDK communicates with Places API. You can have a look at its [documentation](http://docs.ext0csasplaces2.apiary.io).