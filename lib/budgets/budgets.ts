import * as CSCoreSDK from 'cs-core-sdk';
import { Amount } from '../common';

export class BudgetsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.ListEnabled<Budget> {

  constructor(basePath: string, client: CSCoreSDK.WebApiClient) {
    super(basePath, client);

    this._path = this.getPath().replace('/my', '/cz/my');
  }

  /**
   * Returns list of user's tracked categories and its limits.
   */
  list = (): Promise<BudgetList> => {
    return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'budgets');
  }

  /**
   * Set new value of tracked categories.
   */
  update = (payload: UpdateBudgets): Promise<UpdateBudgets> => {
    return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
  }
}

export interface BudgetList extends CSCoreSDK.ListResponse<Budget> { }

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
}

export interface UpdateBudgets {
  budgets: [Budget];
}