# Contracts

This guide walks you through retrieving current user's accounts contracts. Four contract groups are available:

- Buildings
- Insurances
- Loyalty
- Pensions

[ContractsResource](../lib/contracts/building/buildings.ts)

```javascript

    // Get ContractsResource
    CSNetbankingSDK
        .getClient()
        .contracts

```

## A. Buildings

### 1. List all building contracts
You can list all of current users building contracts by calling the `list` method on [BuildingsContractsResource](../lib/contracts/building/buildings.ts). 

```javascript

    // List all building contracts
    CSNetbankingSDK
        .getClient()
        .contracts
        .buildings
        .list(parameters: BuildingsContractsParameters)
        .then(...)
        .catch(...)

```

### 2. Get individual current users building contract

You can get detail of the individual current users building contract by calling the `withId` method on [BuildingsContractsResource](../lib/contracts/building/buildings.ts) with id as a parameter and then calling the get method. For complete response see [BuildingsContract](../lib/contracts/building/buildings.ts).

```javascript

    // Get building contract detail
    CSNetbankingSDK
        .getClient()
        .contracts
        .buildings
        .withId(id: string)
        .get()
        .then(...)
        .catch(...)

```

### 3. Update current users building contract

You can update current users building contract by calling the `withId` method on [BuildingsContractsResource](../lib/contracts/building/buildings.ts) with id as a parameter and then calling the update method and giving it payload in object as a parameter. For payload properties please see [BuildingsContractUpdateRequest](../lib/contracts/building/buildings.ts) and check also the response [BuildingsContractUpdateResponse](../lib/contracts/building/buildings.ts).

```javascript

    // Get building contract detail
    CSNetbankingSDK
        .getClient()
        .contracts
        .buildings
        .withId(id: string)
        .update(payload: BuildingsContractUpdateRequest)
        .then(...)
        .catch(...)

```

### 4. List building contracts services

List building contract services by getting the [BuildingsContractsServicesResource](../lib/contracts/buildings/services.ts) and then calling the `list` method. The method takes object with properties as a parameter. Services resource supports pagination.

```javascript

    // Get building contract detail
    CSNetbankingSDK
        .getClient()
        .contracts
        .buildings
        .withId(id: string)
        .services
        .list(parameters: ServiceParameters)
        .then(...)
        .catch(...)

```

### 5. Add or change note and mark buildings transaction

Add, change or mark transaction by calling the `update` method on [ContractsTransactionsResource](../lib/contracts/transactions.ts) and passing it object with options as a parameter. For payload properties please see [TransactionUpdateRequest](../lib/contracts/transactions.ts) and check also the response [TransactionUpdateResponse](../lib/contracts/transactions.ts).

```javascript

    // Building contract transaction update
    CSNetbankingSDK
        .getClient()
        .contracts
        .buildings
        .withId(id: string)
        .transactions
        .withId(id: string)
        .update(payload: TransactionUpdateRequest)
        .then(...)
        .catch(...)

```


### 6. Export buildings transactions history

Export transaction history into signed PDF by calling the `export` method on [ContractsTransactionsResource](../lib/contracts/transactions.ts) and passing it object with options as a parameter. See [ExportTransactionsParameters](../lib/common.ts).

```javascript

    // Export building contract transactions history
    CSNetbankingSDK
        .getClient()
        .contracts
        .buildings
        .withId(id: string)
        .transactions
        .export(parameters: ExportTransactionsParameters)
        .then(...)
        .catch(...)

```

## B. Insurances

### 1. List all insurance contracts
You can list all of current users insurance contracts by calling the `list` method on [InsurancesContractsResource](../lib/contracts/insurances/insurances.ts). 

```javascript

    // List all insurance contracts
    CSNetbankingSDK
        .getClient()
        .contracts
        .insurances
        .list(parameters: InsurancesParameters)
        .then(...)
        .catch(...)

```

### 2. Get individual current users insurance contract

You can get detail of the individual current users insurance contract by calling the `withId` method on [InsurancesContractsResource](../lib/contracts/insurances/insurances.ts) with id as a parameter and then calling the get method. For complete response see [Insurance](../lib/contracts/insurances/insurances.ts).

```javascript

    // Insurance contract detail
    CSNetbankingSDK
        .getClient()
        .contracts
        .insurances
        .withId(id: string)
        .get()
        .then(...)
        .catch(...)

```

### 3. Update current users insurance contract

You can update current users insurance contract by calling the `withId` method on [InsurancesContractsResource](../lib/contracts/insurances/insurances.ts) with id as a parameter and then calling the update method and giving it payload in object as a parameter. For payload properties please see [InsuranceUpdateRequest](../lib/contracts/insurances/insurances.ts) and check also the response [InsuranceUpdateResponse](../lib/contracts/insurances/insurances.ts).

```javascript

     // Insurance contract update
    CSNetbankingSDK
        .getClient()
        .contracts
        .insurances
        .withId(id: string)
        .update(InsuranceUpdateRequest request)
        .then(...)
        .catch(...)

```

### 5. List insurance contract funds

You can list all of current users insurance contract funds by calling the `list` method on [InsurancesContractFundsResource](../lib/contracts/insurances/funds.ts). 

```javascript

    // Insurance contract funds list
    CSNetbankingSDK
        .getClient()
        .contracts
        .insurances
        .withId(id: string)
        .funds
        .list()
        .then(...)
        .catch(...)

```

### 6. Update insurance contract funds

You can update current users insurance contract funds by calling the `update` method on [InsurancesContractFundsResource](../lib/contracts/insurances/funds.ts) and giving it payload in object as a parameter. For payload properties please see [FundsUpdateRequest](../lib/contracts/insurances/funds.ts) and check also the response [FundsUpdateResponse](../lib/contracts/insurances/funds.ts).

```javascript

    // Update insurance contract funds
    CSNetbankingSDK
        .getClient()
        .contracts
        .insurances
        .withId(id: string)
        .funds
        .update(FundsUpdateRequest request)
        .then(...)
        .catch(...)

```


### 7. List insurance contract beneficiaries

You can list all of current users insurance contract beneficiaries by calling the `list` method on [InsurancesContractBeneficiariesResource](../lib/contracts/insurances/beneficiaries.ts). 

```javascript

    // Insurance contract beneficiaries list
    CSNetbankingSDK
        .getClient()
        .contracts
        .insurances
        .withId(id: string)
        .beneficiaries
        .list()
        .then(...)
        .catch(...)

```


### 8. Update insurance contract beneficiaries

You can update current users insurance contract beneficiaries by calling the `update` method on [InsurancesContractBeneficiariesResource](../lib/contracts/insurances/beneficiaries.ts) and giving it payload in object as a parameter. For payload properties please see [InsuranceBeneficiariesUpdateRequest](../lib/contracts/insurances/beneficiaries.ts) and check also the response [InsuranceBeneficiariesUpdateResponse](../lib/contracts/insurances/beneficiaries.ts).

```javascript

    // Update insurance contract beneficiaries
    CSNetbankingSDK
        .getClient()
        .contracts
        .insurances
        .withId(id: string)
        .beneficiaries
        .update(InsuranceBeneficiariesUpdateRequest request)
        .then(...)
        .catch(...)

```

### 9. List insurance contract insurees

You can list all of current users insurance contract insurees by calling the `list` method on [InsurancesContractInsureesResource](../lib/contracts/insurances/insurees.ts). 

```javascript

    // Insurance contract insurees list
    CSNetbankingSDK
        .getClient()
        .contracts
        .insurances
        .withId(id: string)
        .insurees
        .list()
        .then(...)
        .catch(...)

```

### 10. List insurance contract payments

You can list all of current users insurance contract payments by calling the `list` method on [InsurancesContractPaymentsResource](../lib/contracts/insurances/payments.ts). 

```javascript

    // Insurance contract payments list
    CSNetbankingSDK
        .getClient()
        .contracts
        .insurances
        .withId(id: string)
        .payments
        .list()
        .then(...)
        .catch(...)

```

### 11. List insurance contract services

You can list all of current users insurance contract services by calling the `list` method on [InsurancesContractServicesResource](../lib/contracts/insurances/services.ts). 

```javascript

    // Insurance contract services list
    CSNetbankingSDK
        .getClient()
        .contracts
        .insurances
        .withId(id: string)
        .services
        .list()
        .then(...)
        .catch(...)

```

### 12. Activate risk sports insurance service

You can activate current users risk sport insurance contract by calling the `activateRiskSports` method on [InsurancesContractServicesResource](../lib/contracts/insurances/services.ts) and giving it payload in object as a parameter. For payload properties please see [RiskSportsUpdateRequest](../lib/contracts/insurances/services.ts) and check also the response [ActivateRiskSportsResponse](../lib/contracts/insurances/services.ts).

```javascript

    // Risk sport insurance contract activation
    CSNetbankingSDK
        .getClient()
        .contracts
        .insurances
        .withId(id: string)
        .services
        .activateRiskSports(payload: RiskSportsUpdateRequest)
        .then(...)
        .catch(...)

```

### 13. Deactivate risk sports insurance service

You can deactivate current users risk sport insurance contract by calling the `deactivateRiskSports` method on [InsurancesContractServicesResource](../lib/contracts/insurances/services.ts) and giving it payload in object as a parameter. For payload properties please see [RiskSportsUpdateRequest](../lib/contracts/insurances/services.ts) and check also the response [DeactivateRiskSportsResponse](../lib/contracts/insurances/services.ts).

```javascript

    // Risk sport insurance contract activation
    CSNetbankingSDK
        .getClient()
        .contracts
        .insurances
        .withId(id: string)
        .services
        .deactivateRiskSports(payload: RiskSportsUpdateRequest)
        .then(...)
        .catch(...)

```

### 14. List insurance contract events

You can list all of current users insurance contract events by calling the `list` method on [InsurancesContractEventsResource](../lib/contracts/insurances/events.ts). 

```javascript

    // Insurance contract events list
    CSNetbankingSDK
        .getClient()
        .contracts
        .insurances
        .withId(id: string)
        .events
        .list()
        .then(...)
        .catch(...)

```

### 15. Get insurance contract tax benefits

You can get insurance contract tax benefits by calling the `get` method on [InsurancesContractTaxBenefitsResource](../lib/contracts/insurances/tax-benefits.ts). For complete response see [TaxBenefit](../lib/contracts/insurances/tax-benefits.ts).

```javascript

    // Insurance contract tax benefit
    CSNetbankingSDK
        .getClient()
        .contracts
        .insurances
        .withId(id: string)
        .taxBenefits
        .get()
        .then(...)
        .catch(...)

```

### 16. List insurance contract strategies

You can list all of current users insurance contract strategies by calling the `list` method on [InsurancesContractStrategiesResource](../lib/contracts/insurances/strategies.ts). 

```javascript

    // Insurance contract strategies list
    CSNetbankingSDK
        .getClient()
        .contracts
        .insurances
        .withId(id: string)
        .strategies
        .list()
        .then(...)
        .catch(...)

```

### 17. Update insurance contract transfer

You can update current users insurance contract transfer by calling the `update` method on [InsurancesContractTransferResource](../lib/contracts/insurances/transfer.ts) and giving it payload in object as a parameter. For payload properties please see [InsuranceTransferUpdateRequest](../lib/contracts/insurances/transfer.ts) and check also the response [InsuranceTransferUpdateResponse](../lib/contracts/insurances/transfer.ts).

```javascript

    // Update insurance contract transfer
    CSNetbankingSDK
        .getClient()
        .contracts
        .insurances
        .withId(id: string)
        .transfer
        .update(payload: InsuranceTransferUpdateRequest)
        .then(...)
        .catch(...)

```

## C. Loyalty

### 1. Get individual current users insurance contract

You can get detail of the individual current users insurance contract by calling the `get` method on [LoyaltyContractsResource](../lib/contracts/loyalty/loyalty.ts). For complete response see [Loyalty](../lib/contracts/loyalty/loyalty.ts).

```javascript

    // Insurance contract detail
    CSNetbankingSDK
        .getClient()
        .contracts
        .loyalty
        .get()
        .then(...)
        .catch(...)

```

## D. Pensions

### 1. List all pensions contracts
You can list all of current users pension contracts by calling the `list` method on [PensionsContractsResource](../lib/contracts/pensions/pensions.ts). 

```javascript

    // List all pensions contracts
    CSNetbankingSDK
        .getClient()
        .contracts
        .pensions
        .list(parameters: PensionParameters)
        .then(...)
        .catch(...)

```

### 2. Get individual current users pension contract

You can get detail of the individual current users building contract by calling the `withId` method on [PensionsContractsResource](../lib/contracts/pensions/pensions.ts) with id as a parameter and then calling the get method. For complete response see [Pension](../lib/contracts/pensions/pensions.ts).

```javascript

    // Pension contract detail
    CSNetbankingSDK
        .getClient()
        .contracts
        .pensions
        .withId(id: string)
        .get()
        .then(...)
        .catch(...)

```

### 3. Update current users pension contract

You can update current users building contract by calling the `withId` method on [PensionsContractsResource](../lib/contracts/pensions/pensions.ts) with id as a parameter and then calling the update method and giving it payload in object as a parameter. For payload properties please see [PensionUpdateRequest](../lib/contracts/pensions/pensions.ts) and check also the response [PensionUpdateResponse](../lib/contracts/pensions/pensions.ts).

```javascript

    // Pension contract update
    CSNetbankingSDK
        .getClient()
        .contracts
        .pensions
        .withId(id: string)
        .update(payload: PensionUpdateRequest)
        .then(...)
        .catch(...)

```

### 4. Add or change note and mark pensions transaction

Add, change or mark transaction by calling the `update` method on [ContractsTransactionsResource](../lib/contracts/transactions.ts) and passing it object with options as a parameter. For payload properties please see [TransactionUpdateRequest](../lib/contracts/transactions.ts) and check also the response [TransactionUpdateResponse](../lib/contracts/transactions.ts).

```javascript

    // Building contract transaction update
    CSNetbankingSDK
        .getClient()
        .contracts
        .pensions
        .withId(id: string)
        .transactions
        .withId(id: string)
        .update(TransactionUpdateRequest request)
        .then(...)
        .catch(...)

```

### 5. Export pensions transactions history

Export transaction history into signed PDF by calling the `export` method on [ContractsTransactionsResource](../lib/contracts/transactions.ts) and passing it object with options as a parameter. See [ExportTransactionsParameters](../lib/contracts/transactions.ts).

```javascript

    // Building contract transaction update
    CSNetbankingSDK
        .getClient()
        .contracts
        .pensions
        .withId(id: string)
        .transactions
        .export(parameters: ExportTransactionsParameters)
        .then(...)
        .catch(...)

```