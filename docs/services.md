# Services

This guide walks you through retrieving list of services for current user that are not bound to any product.

## List all services

List all services for current user by calling the `list` method on `ServicesResource`. The method takes object with properties such as `pageSize` or `sortBy` as a parameter. See all parameters in `ServiceParameters` interface in [`services.ts`](../lib/accounts/services.ts) file. For complete response see `ServiceList` in [`services.ts`](../lib/accounts/services.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .services
        .list({
            pageNumber: 0,
            pageSize: 10
        })
        .then(function(services) {
            var service = services.items[0];
            console.log(service.nameI18N); // SERVIS 24
        });

```