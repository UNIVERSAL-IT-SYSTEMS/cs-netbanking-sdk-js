import * as CSCoreSDK from 'cs-core-sdk';
import { AccountNumber, Amount, NetbankingParameters, Symbols } from '../common';

/**
 * @class AccountStandingOrdersResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.PaginatedListEnabled<StandingOrder>}
 * @implements {CSCoreSDK.HasInstanceResource<AccountStandingOrderResource>}
 * @implements {CSCoreSDK.CreateEnabled<CreateStandingOrderRequest, StandingOrderResponse>}
 */
export class AccountStandingOrdersResource extends CSCoreSDK.Resource
  implements CSCoreSDK.PaginatedListEnabled<StandingOrder>, CSCoreSDK.HasInstanceResource<AccountStandingOrderResource>, CSCoreSDK.CreateEnabled<CreateStandingOrderRequest, StandingOrderResponse> {

  /**
   * Returns list of actual standing/sweep orders for accounts of the current user.
   * @param {NetbankingParameters} params
   * @returns {Promise<StandingOrderList>}
   */
  list = (params: NetbankingParameters): Promise<StandingOrderList> => {

    return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'standingOrders', params, response => {

      response.items.forEach(item => {
        addDatesToStandingOrder(item);
        resourcifyStandingOrder(<StandingOrder>item, this.withId((<StandingOrder>item).number));
      });

      return response;
    });
  }

  /**
   * Get the resource of standing order with a given id
   * @param {string} id
   * @returns {AccountStandingOrderResource}
   */
  withId = (id: string): AccountStandingOrderResource => {
    return new AccountStandingOrderResource(id, this.getPath(), this.getClient());
  }

  /**
   * Resource for creating standing/sweep order. Once order has been signed new payments are generated and executed according its settings.
   * @param {CreateStandingOrderRequest} payload
   * @returns {Promise<StandingOrderResponse>}
   */
  create = (payload: CreateStandingOrderRequest): Promise<StandingOrderResponse> => {

    CSCoreSDK.EntityUtils.transformDatesToSimpleISO(['nextExecutionDate', 'lastExecutionDate', 'startDate'], payload);

    return CSCoreSDK.ResourceUtils.CallCreate(this, payload).then(response => {
      addDatesToStandingOrder(response);
      resourcifyStandingOrder(<StandingOrder>response, this.withId((<StandingOrder>response).number));
      CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), this.getPath());

      return response;
    });
  }
}

/**
 * @class AccountStandingOrderResource
 * @extends {CSCoreSDK.InstanceResource}
 * @implements {CSCoreSDK.GetEnabled<StandingOrder>}
 * @implements {CSCoreSDK.DeleteEnabled<StandingOrderResponse>}
 */
export class AccountStandingOrderResource extends CSCoreSDK.InstanceResource
  implements CSCoreSDK.GetEnabled<StandingOrder>, CSCoreSDK.DeleteEnabled<StandingOrderResponse> {

  /**
   * Returns detail of actual standing/sweep orders identified by its number.
   * @returns {Promise<StandingOrder>}
   */
  get = (): Promise<StandingOrder> => {
    return CSCoreSDK.ResourceUtils.CallGet(this, null).then(response => {
      addDatesToStandingOrder(response);
      resourcifyStandingOrder(<StandingOrder>response, this);

      return response;
    });
  }

  /**
   * This call removes existing standing/sweep order. No more payments for the order are executed after the change has been signed.
   * @returns {Promise<StandingOrderResponse>}
   */
  delete = (): Promise<StandingOrderResponse> => {
    return CSCoreSDK.ResourceUtils.CallDelete(this, null).then(response => {
      addDatesToStandingOrder(response);
      resourcifyStandingOrder(<StandingOrder>response, this);
      CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), this.getPath());

      return response;
    });
  }
}

function addDatesToStandingOrder(item) {
  CSCoreSDK.EntityUtils.addDatesFromISO(['startDate', 'realExecutionDate', 'nextExecutionDate', 'lastExecutionDate'], item);
  if ((<StandingOrder>item).break) {
    CSCoreSDK.EntityUtils.addDatesFromISO(['validFromDate', 'validToDate'], (<StandingOrder>item).break);
  }
  if ((<StandingOrder>item).scheduledExecutionDates && Array.isArray((<StandingOrder>item).scheduledExecutionDates)) {
    var datesArr: any = (<StandingOrder>item).scheduledExecutionDates.map(x => new Date(CSCoreSDK.EntityUtils.parseISODate(x)));

    (<StandingOrder>item).scheduledExecutionDates = datesArr;
  }
}

function resourcifyStandingOrder(orderListing: StandingOrder, orderReference: AccountStandingOrderResource) {
  orderListing.get = orderReference.get;
  orderListing.delete = orderReference.delete;
}

/**
 * @interface StandingOrderList
 * @extends {CSCoreSDK.PaginatedListResponse<StandingOrder>}
 */
export interface StandingOrderList extends CSCoreSDK.PaginatedListResponse<StandingOrder> { }

/**
 * @interface StandingOrder
 * @extends {CreateStandingOrderRequest}
 */
export interface StandingOrder extends CreateStandingOrderRequest {

  /**
   * Standing order respectively sweep order identifier.
   */
  number: string;


  /**
   * Represents the status of the order. Only possible value so far is OK.
   */
  status: string;

  /**
   * Maximum number of iterations - processing of the standing order. Only applicable in combination with executionMode.
   */
  maxIterations: number;

  /**
   * Maximum amount to be transferred using the standing order. Only applicable in combination with executionMode.
   */
  maxAmount: Amount;

  /**
   * Date and time since the order is valid from.
   */
  startDate: Date | string;

  /**
   * Array of execution dates (DATEs) when payments will be executed from this standing order since today until today + 30 days.
   */
  scheduledExecutionDates?: [Date];

  /**
   * Date when the next order will be really executed taking into account weekends and holidays.
   */
  realExecutionDate?: Date;

  break?: {

    /**
     * Start date of break period. Standing order will not be processed from this date.
     */
    validFromDate: Date;

    /**
     * End date of break period. Standing order will not be processed to this date.
     */
    validToDate: Date;
  }

  /**
   * List of months where there is no payment (only applicable with interval IRREGULAR). Possible values: JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER
   */
  stoppages?: [string];

  /**
   * Array of optional Flag values to Standing Order. Possible flags: deletable.
   */
  flags?: [string];

  /**
   * Convience method for getting standing order detail
   * @returns {Promise<StandingOrder>}
   */
  get: () => Promise<StandingOrder>;

  /**
   * Conveinience method for deleting standing order
   * @returns {Promise<StandingOrderResponse>}
   */
  delete: () => Promise<StandingOrderResponse>;
}

/**
 * @interface StandingOrderResponse
 */
export interface StandingOrderResponse extends StandingOrder, CSCoreSDK.Signable { }

/**
 * @interface CreateStandingOrderRequest
 */
export interface CreateStandingOrderRequest {

  /**
   * Either STANDING_ORDER (there is fixed amount specified which is transferred in defined times) or SWEEP_ORDER (there is specified limit, amount over limit/to limit is transferred in defined times).
   */
  type: string;

  /**
   * Relevant only for sweep orders. Either SWEEP_OVER_LIMIT (amount over limit is transferred from account) or SWEEP_UNDER_LIMIT (amount to limit is transferred to account).
   */
  subtype?: string;

  /**
   * Alias name of standing order entered by user for his better orientation in standing order list.
   */
  alias?: string;

  /**
   * Name of the standing order receiver.
   */
  receiverName?: string;

  /**
   * Receiver account number. In case of SWEEP_UNDER_LIMIT this is actually sender.
   */
  receiver: AccountNumber;

  /**
   * Message for payee set during payment order creation. It is used to identify transaction on receiver side.
   */
  senderReference?: string;

  /**
   * The amount of the order in case of standing order. The limit amount in case of sweep order.
   */
  amount: Amount;

  /**
   * Date when the next order is set to be executed. This includes weekends and banking holidays.
   */
  nextExecutionDate?: Date | string;

  /**
   * Date when the last order will be processed. Only applicable in combination with executionMode .
   */
  lastExecutionDate?: Date | string;

  /**
   * The execution mode defines when or how standing/sweep order will be cancelled, processed the last time. Possible values: UNTIL_DATE (standing order is valid until specific date - field lastExecutionDate), UNTIL_CANCELLATION (standing order is valid forever and must be cancelled by client), AFTER_MAX_ITERATION_EXCEEDED (certain count of executions is specified - field maxIterations) or MAX_AMOUNT_EXCEEDED (maximum amount which can be transferred for this order is specified, if next iteration would exceed this amount it is not executed - field maxAmount).
   */
  executionMode: string;

  /**
   * The execution due mode defines how the date when order should be executed is specified. Possible values: DUE_DAY_OF_MONTH (specific number of day in the month is defined) or DUE_LAST_DAY_OF_MONTH (order is executed on last day of particular month).
   */
  executionDueMode: string;

  /**
   * Execution interval defines how often order is executed. Possible values: DAILY, WEEKLY, MONTHLY, BI_MONTHLY, QUARTERLY, HALFYEARLY, YEARLY, IRREGULAR.
   */
  executionInterval: string;

  /**
   * Value represents order number of the day within particular period when the standing order will be reqularly executed. Possible values: 1-7 (for WEEKLY interval), 1-28 for STANDING_ORDER, 1-27 for type SWEEP_ORDER (for MONTHLY, QUARTERLY, HALFYEARLY and YEARLY - for intervals longer then month also intervalDueMonth is applicable). Field is not relevant for other execution intervals.
   */
  intervalDueDay?: number;

  /**
   * Due date month in execution interval of standing order processing. Represents order number of the month in particular period. Possible values: 1-2 for BI_MONTHLY, 1-3 for QUARTERLY, 1-6 for HALFYEARLY, 1-12 for YEARLY. Field is not relevant for other execution intervals.
   */
  intervalDueMonth?: number;

  symbols?: Symbols;
}