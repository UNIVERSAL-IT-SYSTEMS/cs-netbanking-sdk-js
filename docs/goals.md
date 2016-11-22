# Goals

This guide walks you through retrieving current user's accounts goals.

[GoalsResource](../lib/goals/goals.ts.ts)

```javascript

    // Get GoalsResource
    CSNetbankingSDK
            .getClient()
            .goals

```

## 1. List all of current users goals

You can list all of current users goals by calling the `list` method on [GoalsResource](../lib/goals/goals.ts). 

```javascript

    // List all goals
    CSNetbankingSDK
            .getClient()
            .goals
            .list()
            .then(...)
            .catch(...)

```

## 2. Update current users goals 

You can update current users goals by calling the `withId` method on [GoalsResource](../lib/goals/goals.ts) with id as a parameter and then calling the update method and giving it payload in object as a parameter. For payload properties please see [GoalsUpdateRequest](../lib/goals/goals.ts) and check also the response [GoalsListResponse](../lib/goals/goals.ts).

```javascript

    // Update goals
    CSNetbankingSDK
            .getClient()
            .goals
            .update(GoalsUpdateRequest request)
            .then(...)
            .catch(...)

```