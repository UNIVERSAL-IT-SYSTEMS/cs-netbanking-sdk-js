# Budgets

This guide walks you through retrieving current user's accounts budgets.

[BudgetsResource](../lib/budgets/budgets.ts)


```javascript

    // Get BudgetsResource
    CSNetbankingSDK
            .getClient()
            .budgets

```

## 1. List all of current users budgets

You can list all of current users budgets by calling the `list` method on [BudgetsResource](../lib/budgets/budgets.ts). 

```javascript

    // List all budgets
    CSNetbankingSDK
            .getClient()
            .budgets
            .list()
            .then(...)
            .catch(...)

```

## 2. Update current users budgets

You can update current users budget by calling the `update` method on [BudgetsResource](../lib/budgets/budgets.ts). For payload properties please see [BudgetsUpdateRequest](../lib/budgets/budgets.ts) and check also the response [BudgetsListResponse](../lib/budgets/budgets.ts).

```javascript

    // Update budgets
    CSNetbankingSDK
            .getClient()
            .budgets
            .update(BudgetsUpdateRequest request)
            .then(...)
            .catch(...)

```