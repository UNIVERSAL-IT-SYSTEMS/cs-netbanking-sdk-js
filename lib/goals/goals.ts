import * as CSCoreSDK from 'cs-core-sdk';
import { Amount } from '../common';

/**
 * @class GoalsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.ListEnabled<Goal>}
 * @implements {CSCoreSDK.UpdateEnabled<UpdateGoal, UpdateGoal>}
 */
export class GoalsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.ListEnabled<Goal>, CSCoreSDK.UpdateEnabled<UpdateGoal, UpdateGoal> {

  /**
   * @param {string} basePath
   * @param {CSCoreSDK.WebApiClient} client 
   */
  constructor(basePath: string, client: CSCoreSDK.WebApiClient) {
    super(basePath, client);

    // insert 'cz' resource into the resource's path because the api requires it in some resources
    this._path = this.getPath().replace('/my', '/cz/my');
  }

  /**
   * Returns list of user's saving goals except of completed ones. In price, only CZK currency is supported. If user has never set any goal, the response is empty.
   * @returns {Promise<GoalList>}
   */
  list = (): Promise<GoalList> => {
    return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'goals').then(response => {

      response.items.forEach(item => {
        transformDates(item);
      });

      return response;
    });
  }

  /**
   * Set new value of goals. In price, only CZK currency is supported. If completed flag is not present, false value is supposed. All goals of given client are replaced - old ones (except of completed) are deleted and these new specified are inserted.
   * @param {UpdateGoal} payload
   * @returns {Promise<UpdateGoal>}
   */
  update = (payload: UpdateGoal): Promise<UpdateGoal> => {
    if (Array.isArray(payload.goals)) {
      payload.goals.forEach(goal => {
        if (goal.deadline && Object.prototype.toString.call(goal.deadline) === '[object Date]') {
          (<any>goal).deadline = goal.deadline.getTime();
        }
      });
    }
    return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {

      (<any>response).goals.forEach(item => {
        transformDates(item);
      });

      return response;
    });
  }
}

function transformDates(item) {
  if ((<Goal>item).deadline) {
    (<Goal>item).deadline = new Date((<any>item).deadline);
  }
}

/**
 * @interface GoalList
 * @extends {CSCoreSDK.ListResponse<Goal>}
 */
export interface GoalList extends CSCoreSDK.ListResponse<Goal> { }

/**
 * @interface Goal
 */
export interface Goal {

  /**
   * Saving goal name. Must be non-empty and unique among goals of one client.
   */
  name: string;

  /**
   * Price of the saving goal.
   */
  price: Amount;

  /**
   * Maximal date (deadline) of the saving goal completion.
   */
  deadline: Date;

  /**
   * Flag of the completed goal.
   */
  completed: boolean;
}

/**
 * @interface UpdateGoal
 */
export interface UpdateGoal {
  goals: [Goal]
}