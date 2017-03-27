import * as CSCoreSDK from 'cs-core-sdk';
import { Amount, AccountNumber } from '../common';

/**
 * @class PluginsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.PaginatedListEnabled<Plugin>}
 * @implements {CSCoreSDK.HasInstanceResource<PluginResource>}
 */
export class PluginsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.PaginatedListEnabled<Plugin>, CSCoreSDK.HasInstanceResource<PluginResource> {

  /**
   * Returns list of available plugins for current user. Plugin is application functionality which can be enabled/disabled by user.
   * @param {PluginsParameters} params
   * @returns {Promise<PluginList>}
   */
  list = (params: PluginsParameters): Promise<PluginList> => {
    return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'plugins', params, response => {

      CSCoreSDK.EntityUtils.addDatesToItems(['validUntil', 'dateOfActivation'], response);

      return response;
    });
  }

  /**
   * Returns resource of plugin with a given id
   * @param {string} id
   * @returns {PluginResource}
   */
  withId = (id: string): PluginResource => {
    return new PluginResource(id, this.getPath(), this.getClient());
  }
}

/**
 * @class PluginResource
 * @extends {CSCoreSDK.InstanceResource}
 * @implements {CSCoreSDK.UpdateEnabled<UpdatePluginRequest, SignablePlugin>}
 */
export class PluginResource extends CSCoreSDK.InstanceResource
  implements CSCoreSDK.UpdateEnabled<UpdatePluginRequest, SignablePlugin> {

  /**
   * Activation and deactivation of the specific plugin. You can also change settlement account for given plugin and current user.
   * @param {UpdatePluginRequest} payload
   * @returns {Promise<SignablePlugin>}
   */
  update = (payload: UpdatePluginRequest): Promise<SignablePlugin> => {
    return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {
      CSCoreSDK.EntityUtils.addDatesFromISO(['validUntil', 'dateOfActivation'], response);
      CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), this.getPath());

      return response;
    });
  }
}

/**
 * @interface PluginList
 * @extends {CSCoreSDK.PaginatedListResponse<Plugin>}
 */
export interface PluginList extends CSCoreSDK.PaginatedListResponse<Plugin> { }

/**
 * @interface Plugin
 * @extends {UpdatePluginRequest}
 */
export interface Plugin extends UpdatePluginRequest {

  /**
   * Localized name of the plugin.
   */
  name: string;

  /**
   * Date until plugin is valid.
   */
  validUntil: Date;

  /**
   * Date of activation of plugin for user.
   */
  dateOfActivation?: Date;

  standardFees?: [{

    /**
     * Time moment of changing the plugin fee. Possible values are IMMEDIATELY, ACCOUNT_STATEMENT, UNKNOWN.
     */
    timeOfCharging: string;

    /**
     * Frequency period of changing the plugin fee. Possible values are MONTHLY, NON_RECURRING, UNKNOWN.
     */
    periodOfCharging: string;

    /**
     * Fee amount defined for this plugin.
     */
    amount: Amount;
  }];
}

/**
 * @interface UpdatePluginRequest
 */
export interface UpdatePluginRequest {

  /**
   * Plugin unique identifier.
   */
  productCode: string;

  /**
   * User settlement account for charging fees.
   */
  settlementAccount?: AccountNumber;

  /**
   * Array of optional flag values.
   */
  flags?: [string];
}

/**
 * @interface PluginsParameters
 * @extends {CSCoreSDK.Paginated}
 */
export interface PluginsParameters extends CSCoreSDK.Paginated { }

/**
 * @interface SignablePlugin
 * @extends {Plugin}
 * @extends {CSCoreSDK.Signable}
 */
export interface SignablePlugin extends Plugin, CSCoreSDK.Signable { }