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

##Usage

Go to [profile.md](./profile.md) to see guide that walks you through getting detail of the current user and information about his last logins.

Then you can see [accounts.md](./accounts.md) for guide that walks you through listing all current user's accounts and all the information and actions of about them.

After that in [cards.md](./cards.md) is guide that walks you through listing all current user's cards and all the information and actions of about them.

Finally see guide that walks you through listing all current user's payments and actions of payments in [payments.md](./payments.md).

## Demo
Check out the [AngularJS demo application](https://github.com/Ceskasporiteln/csas-sdk-demo-js) for usage demonstration.

##Further documentation
Please see the documented [TypeScript definition file](../dist/cs-netbanking-sdk.sfx.d.ts) for detailed description of the functionalities provided by this SDK.

This SDK communicates with Netbanking API. You can have a look at its [documentation](http://docs.netbankingv3.apiary.io/).