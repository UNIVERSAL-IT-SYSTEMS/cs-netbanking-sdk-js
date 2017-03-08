import * as CSCoreSDK from 'cs-core-sdk';

/**
 * @class PromotionsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.ListEnabled<Promotion>}
 * @implements {CSCoreSDK.CreateEnabled<CreatePromotionRequest, CreatePromotionResponse>}
 */
export class PromotionsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.ListEnabled<Promotion>, CSCoreSDK.CreateEnabled<CreatePromotionRequest, CreatePromotionResponse>  {

  /**
   * Returns promotion list for the current user 
   * @returns {Promise<PromotionList>}
   */
  list = (): Promise<PromotionList> => {
    return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'promotions');
  }

  /**
   * Hide specified promotion
   * @param {CreatePromotionRequest} payload
   * @returns {Promise<CreatePromotionResponse>}
   */
  create = (payload: CreatePromotionRequest): Promise<CreatePromotionResponse> => {
    return this._client.callApi(this.getPath().replace('promotions', 'actions'), 'POST', null, payload);
  }
}

/**
 * @interface PromotionList
 * @extends {CSCoreSDK.ListResponse<Promotion>}
 */
export interface PromotionList extends CSCoreSDK.ListResponse<Promotion> { }

/**
 * @interface Promotion
 */
export interface Promotion {

  /**
   * Id of campaign
   */
  promotionId: string;

  displayType: {

    /**
     * Title of the promotion.
     */
    titleText?: string;

    /**
     * Additional - subline text for the title.
     */
    sublineText?: string;

    /**
     * The type of the layout for the campaign. Currently only these values are possible: OVERVIEW_CARD
     */
    displayType: string;

    /**
     * Type of the campaign, possible values are PRODUCT_PROMOTION, PLUGIN_PROMOTION, INFOCARD, SHADOWCARD
     */
    cardDesign: string;

    /**
     * relative path of url for the background picture published in WCM.
     */
    backgroundImage?: string;

    /**
     * relative path of url for the main picture published in WCM.
     */
    mainImage?: string;

    /**
     * Number of the row in the Overview screen, where the promotion should by displayed. Relevant only for displayType OVERVIEW_CARD
     */
    position: number;

    /**
     * Number of the column in the Overview screen, where the promotion should by displayed. Relevant only for displayType OVERVIEW_CARD
     */
    column: string;

    /**
     * Labeling of the main button. Can also be empty, if empty we don’t show a button. Max characters: 30 preliminary value can perhaps change later.
     */
    btnText?: string;

    /**
     * Key, describing the look of the main button. Must be one of the following values: DEFAULT BORDER PRIMARY SUCCESS INFO WARNING DANGER LINK, GREY
     */
    btnDesign?: string;
  }

  /**
   * Possible actions. Each action is represented by related button on the promotion card/message etc.
   */
  actions: [{

    /**
     * Technical identifier of the action
     */
    actionID: string;

    /**
     * Type of the action button. Possible values are SHOPPRODUCT, SHOWURL, HIDE
     */
    actionType: string;

    /**
     * Name of the window where the url should be opened. This element is mandatory only in case of actionType = SHOWURL. Can be empty then same window
     */
    target?: string;

    /**
     * Contains the URL of an external site to be called. This element is only mandatory if actionType = SHOWURL
     */
    url?: string;

    /**
     * Code of the product/plugin connected to the sales promotion. Possible values are Possible values are: RUFO_ORDER, RUFO_INCREASE, UFO_ORDER, UFO_INCREASE.
     */
    productCode?: string;

    /**
     * Element connected to this action. Application specific attribute.
     */
    element: string;
  }]
}

/**
 * @interface CreatePromotionRequest
 */
export interface CreatePromotionRequest {

  /**
   * Id of campaign
   */
  promotionId: string;

  executedAction: {

    actionId: string;

    actionType: string;
  };
}

/**
 * @interface CreatePromotionResponse
 */
export interface CreatePromotionResponse {

  infoItems?: [{

    infoName: string;

    infoValue: string;
  }];
}