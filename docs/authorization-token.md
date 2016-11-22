# Authorization Token

This guide shows how to invalidate authorization token.

[AuthorizationTokenResource](../lib/authorization-token/authorization-token.ts)

```javascript

    // Get AuthorizationTokenResource
    CSNetbankingSDK
            .getClient()
            .authorizationToken

```

## 1. Invalidate authorization token

You can invalidate authorization token by calling the `invalidate` method on [AuthorizationTokenResource](../lib/authorization-token/authorization-token.ts).

```javascript

    // Invalidate token
    CSNetbankingSDK
            .getClient()
            .authorizationtoken
            .invalidate()
            .then(...)
            .catch(...)

```