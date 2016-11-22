# Authorization Limits

This guide walks you through retrieving current user's authorization limits.

[AuthorizationLimitsResource](../lib/authorization-limits/authorization-limits.ts)

```javascript

    // Get AuthorizationLimitsResource
        CSNetbankingSDK
            .getClient()
            .authorizationLimits

```

## 1. List all of current users authorization limits

You can list all of current users authorization limits by calling the `list` method on [AuthorizationLimitsResource](../lib/authorization-limits/authorization-limits.ts). The method takes object with properties such as pageSize or sortBy as a parameter. See all parameters in [AuthorizationLimitsParameters](../lib/authorization-limits/authorization-limits.ts).

```javascript

    // List all budgets
    CSNetbankingSDK
            .getClient()
            .authorizationLimits
            .list(AuthorizationLimitsParams parameters?)
            .then(...)
            .catch(...)

```

## 2. Get individual current users authorization limit

You can get detail of the individual current users authorization limit by calling the `withId` method on [AuthorizationLimitsResource](../lib/authorization-limits/authorization-limits.ts) with id as a parameter and then calling the get method. For complete response see [AuthorizationLimit](../lib/authorization-limits/authorization-limits.ts).

```javascript

    // Get individual budget with a given id
    CSNetbankingSDK
            .getClient()
            .authorizationLimits
            .withId(string id)
            .get()
            .then(...)
            .catch(...)

```