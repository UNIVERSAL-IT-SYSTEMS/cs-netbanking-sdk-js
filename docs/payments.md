# Payments

This guide walks you through listing all payments, getting payment's detail, deleting payment, listing limits and retrieving current available booking date. You can also create and update domestic payment or recharge credit on prepaid cards. 

## 1. List all payment orders

List all payment orders by calling the `list` method on `PaymentsResource` resource. The method takes object with properties such as `pageSize` or `sortBy` as a parameter. See all supported parameters in `Parameters` interface in [`common.ts`](../lib/common.ts). For full response see `PaymentsList` interface in [`orders.ts`](../lib/orders/orders.ts).  

```javascript

    CSNetbankingSDK
        .getClient()
        .orders
        .payments
        .list({
            pageSize: 20,
            pageNumber: 0,
            sortBy: 'transferDate'
        })
        .then(function(payments) {
            var payment = payments.items[0];
            console.log(payment.orderCategory); // DOMESTIC
        });
    
```

## 2. Get payment's detail

Get payment's detail by calling the `withId` method on `PaymentsResource` resource and then calling the `get` method. See `Payment` interface in [`orders.ts`](../lib/orders.ts) for full response.

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

## 3. Delete payment

Delete payment by getting the `PaymentResource` resource and then calling the `delete` method.

```javascript

    CSNetbankingSDK
        .getClient()
        .orders
        .payments
        .withId('150506293532245')
        .delete();

```

## 4. Create domestic payment

Create domestic payment by getting the `PaymentsDomesticResource` resource and then calling the `create` method. The `create` method takes object with properties as a parameter. See `DomesticPaymentCreateRequest` interface for all supported parameters in and `DomesticPaymentResponse` interface for full response in [`domestic.ts`](../lib/orders/domestic.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .orders
        .payments
        .domestic
        .create({
            senderName: "Vrba",
            sender: {
                "cz-iban": "CZ1208000000002059930033",
                "cz-bic": "GIBACZPX"
            },
            receiverName: "Vojtíšková",
            receiver: {
                "cz-iban": "CZ5908000000002328489013"
            },
            amount: {
                "value": 110,
                "precision": 2,
                "currency": "CZK"
            }
        })
        .then(function(payment) {
            console.log(payment.receiverName); // Vojtíšková
        });

```

## 5. Update domestic payment

Update domestic payment by getting the `PaymentsDomesticResource` resource and then calling the `update` method. The `update` method takes object with options as a parameter. For all supported options see `DomesticPaymentUpdateRequest` interface and for full response see `DomesticPaymentResponse` interface in [`domestic.ts`](../lib/orders/domestic.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .orders
        .payments
        .domestic
        .withId('1154226597')
        .update({
            id: "1154226597",
            senderName: "Vrba",
            sender: {
                "cz-iban": "CZ1208000000002059930033",
                "cz-bic": "GIBACZPX"
            },
            receiverName: "Vojtíšková Alena",
            receiver: {
                "cz-iban": "CZ5908000000002328489013"
            },
            state: "open",
            stateOk: true,
            amount: {
                value: 110,
                precision: 2,
                currency: "CZK"
            }
        })
        .then(function(payment) {
            console.log(payment.senderName); // Vrba 
        });

```

## 6. Get remaining amounts for payments

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

## 7. Recharge the credit on prepaid card

Recharge the credit on prepaid card by getting the `PaymentsMobileResource` resource and calling the `create` method. The `create` method takes object with properties as a parameter. See `MobilePaymentsRequest` interface for all supported parameters and `MobilePaymentsResponse` interface for full response in [`mobile.ts`](../lib/orders/mobile.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .orders
        .payments
        .mobile
        .create({
            paymentType: 'VODAFONE_PAYMENT',
            phoneNumber: '777952341',
            sender: {
                iban: 'CZ1208000000002059930033',
                bic: 'GIBACZPX',
                number: '2059930033',
                bankCode: '0800',
                countryCode: 'CZ'
            },
            amount: {
                value: 3000,
                precision: 0,
                currency: 'CZK'
            },
            confirmationPhoneNumber: '777952341'
        })
        .then(function(response) {
            console.log(response.phoneNumber); // 777952341 
        });

```