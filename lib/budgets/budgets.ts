/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount} from '../common';

export class BudgetsResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<Budget> {

    list = (): Promise<BudgetList> => {
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'budgets');
    }

    update = (payload: UpdateBudgets): Promise<UpdateBudgets> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
    }
}

export interface BudgetList extends CSCoreSDK.ListResponse<Budget> {}

export interface Budget {

    category: {

        /**
         * Unique id of watched main category of client transactions. Possible values are NON_REGULAR_INCOME, UNCATEGORIZED_INCOME, TRAVEL_HOLIDAYS, HEALTH, LEISURE, COMMUNICATION, CAR, FOOD, EDUCATION, 
         * REGULAR_INCOME, ONLINE_SHOPPING, OTHER_EXPENSES, CLOTHING, UNCATEGORIZED_EXPENSE, FEES, SAVINGS_INVESTMENT, TRANSPORT, ALIMONY_POCKET_MONEY, TAXES, WITHDRAWAL, LIVING_AND_ENERGY.
         */
        id: string;

        /**
         * Category level. Currently only "mainCategory" is supported.
         */
        level: string;
    }

    /**
     * financial limit of the watched category per a given period.
     */
    budget?: Amount;

    /**
     * Convenience method for updating budgets
     */
    update: (payload: UpdateBudgets) => Promise<UpdateBudgets>;
}

export interface UpdateBudgets {
    budgets: [Budget];
}