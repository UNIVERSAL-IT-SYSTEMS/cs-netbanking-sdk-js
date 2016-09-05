# Promotions

This guide walks you through listing promotions and hiding them.

## List promotions

List all 

You can list all promotions by calling the `list` method on `PromotionsResource` For complete response see `PromotionList` also in [`promotions.ts`](../lib/promotions/promotions.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .promotions
        .list()
        .then(function(promotions) {
            var promotion = promotions.items[0];
            console.log(promotion.displayType.titleText); // Plugin Mobilní Platby
        });

```

## Hide promotion

Hide promotion by getting the `PromotionsResource` and calling the `create` method on it. The method takes object as a parameter. See `CreatePromotionRequest` interface for all properties and `CreatePromotionResponse` interface for full response in [`promotions.ts`](../lib/promotions/promotions.ts). Once order has been signed new payments are generated and executed according its settings.

```javascript

    CSNetbankingSDK
        .getClient()
        .promotions
        .create({
            promotionId: '218',
            executedAction: {
                actionId: 'HIDE',
                actionType: 'HIDE'
            }
        })
        .then(function(response) {
            console.log(response.infoItems[0].infoValue); // successfully executed
        });

```