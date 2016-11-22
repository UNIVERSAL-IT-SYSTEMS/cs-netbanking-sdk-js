#Using NetbankingSDK
Netbanking SDK allows you to get information user's profile, accounts, cards and orders payments from Česká spořitelna a.s.

This SDK uses [ES6-promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) as its return values from asynchronous calls.

##Before You Begin

Before using CoreSDK in your application, you need to initialize it by providing it your WebApiKey.

```javascript

    //Set your WebApi key
    CSCoreSDK.useWebApiKey('YourApiKey');
    
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

## General concepts

### Pagination

Resources that supports pagination implements `PaginatedListEnabled` interface (for example [`AccountsResource`](../lib/accounts/accounts.ts)). If thats the case you can (and should) pass an object with properties `pageNumber` and `pageSize` to the `list` method. There is no SDK default pagination so if you do not pass pagination parameters then you get whatever the server decides so we strongly recommend you use pagination parameters.

 ```javascript
 
    CSNetbankingSDK
        .getClient()
        .accounts
        .list({
            // number of the page 
            pageNumber: 0,
            
            // size of the listing
            pageSize: 10 
        })
        .then(function(accounts) {
            // ...
        });
 
 ```

The response from this call contains `pagination` property. `Pagination` object has properties such as `pageCount`, `hasNextPage` or `hasPrevPage`. For `Pagination` definition please see [`ResponsePagination`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/master/lib/web-api/lists.ts).
See full sample response below.

```javascript

    PaginatedListResponseStructure {
        items: Array[10],
        pagination: {
            hasNextPage: true,
            hasPrevPage: false,
            pageCount: 13,
            pageNumber: 0,
            pageSize: 10,
            nextPage: 1,
            prevPage: null
        },
        nextPage: function,
        prevPage: function
    }

```

On this response you can call `nextPage` function which returns `Promise` with a next page results.

```javascript

    var accounts;
    
    CSNetbankingSDK
        .getClient()
        .accounts
        .list({
            pageNumber: 0,
            pageSize: 10
        }).then(function(response) => {
            accounts = response;            
        });
        
    // Do something ...
    
    accounts
        .nextPage()
        .then(function(response) => {
            console.log(response.pagination.pageNumber); // 1
        });

```

If you are on the second or latter page you can also call `prevPage` on the listing to get previous page results.

```javascript

    accounts
        .prevPage()
        .then(function(response) {
            console.log(response.pagination.pageNumber); // 0
        });

```

### Sorting

Methods that support server side sorting take object with properties `sort` and `order` as a parameter. These methods' parameters interfaces extend [`Sortable`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/master/lib/web-api/lists.ts) interface. Both `sort` and `order` parameters are optional but you obviously cannot use `order` parameter without using `sort` parameter. Available `Sort` values are dependent on individual API. `Order` can be `asc` for ascending which is also default or `desc` for descending. These parameters must be defined as array of strings. 

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .list({
            pageNumber: 0,
            pageSize: 10,
            sort: ['type'],
            order: ['desc']
        })
        .then(function(response) {
            // ...
        });

```

You can use multiple values for sorting.

```javascript

    CSNetbankingSDK
        .getClient()
        .accounts
        .list({
            pageNumber: 0,
            pageSize: 10,
            sort: [
                'type',
                'id',
            ],
            types: [
                'desc',
                'asc'
            ]
        })
        .then(function(response) {
            // ...
        });

```

## Functionality

Netbanking SDK provides the following functionality:

- [**Accounts**](./accounts.md) - List all of user's accounts, get detail of an individual account and additional information about it.
- [**AuthorizationLimits**](./authorization-limits.md) - Return payment limits for all authorization methods and channels
- [**AuthorizationToken**](./authorization-token.md) - Invalidate user's token
- [**Budgets**](./budgets.md) - List watched categories of transactions and create new ones.
- [**Bundles**](./bundles.md) - Combine multiple payment orders into a bundle that can be signed at once.
- [**Cards**](./cards.md) - List all of user's cards, get detail of an individual card and additional information about it.
- [**Contacts**](./contacts.md) - List user's contact infomation (addresses, phone nubers, e-mails)
- [**Contracts**](./contracts.md) - List and manipulate with contracts of the user. These include:
    - savings
    - insurances
    - pensions
    - iBod program
- [**Goals**](./goals.md) - List & change saving goals (currently one only) of current user
- [**Messages**](./messages.md) - Get & manage all messages for current user generated by bank itself.
- [**Orders**](./payments.md) -  Get list of payment orders for accounts for the current user, create domestic payment orders and get infomation about user's limits.
- [**Securities**](./securities.md) - List securities accounts for current user. Securities account represents virtual account which holds securities titles and its shares (funds, bonds, etc.). Change settings or make notes about transactions.
- [**Services**](./services.md) - Possibly empty list of services for current user.
- [**Settings**](./settings.md) - View and modify user settings.
- [**PhoneNumbers**](./phone-numbers.md) - User's phone book
- [**Plugins**](./plugins.md) - Enable or disable plugins.
- [**Profile**](./profile.md) - Get detail of the current user and information about his last logins.
- [**Promotions**](./promotions) - Get list of available promotions for the current user.
- [**Templates**](./templates.md) - List of payment templates for current user.

## Demo
Check out the [AngularJS demo application](https://github.com/Ceskasporiteln/csas-sdk-demo-js) for usage demonstration.

##Further documentation
Please see the documented [TypeScript definition file](../dist/cs-netbanking-sdk.sfx.d.ts) for detailed description of the functionalities provided by this SDK.

This SDK communicates with Netbanking API. You can have a look at its [documentation](http://docs.netbankingv3.apiary.io/).