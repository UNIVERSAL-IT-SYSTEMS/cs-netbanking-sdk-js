import * as CSCoreSDK from 'cs-core-sdk';
import { Signable } from '../common';

/**
 * @class SettingsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.GetEnabled<Settings>}
 * @implements {CSCoreSDK.UpdateEnabled<Settings, SignableSettings>}
 */
export class SettingsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.GetEnabled<Settings>, CSCoreSDK.UpdateEnabled<Settings, SignableSettings> {

  /**
   * Returns basic user settings.
   * @returns {Promise<Settings>}
   */
  get = (): Promise<Settings> => {
    return CSCoreSDK.ResourceUtils.CallGet(this, null);
  }

  /**
   * Change user settings. Currently only language can be changed by this endpoint.
   * @param {Settings} payload
   * @returns {Promise<SignableSettings>}
   */
  update = (payload: Settings): Promise<SignableSettings> => {
    return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {

      CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), this.getPath());

      return response;
    });
  }
}

/**
 * @interface Settings
 */
export interface Settings {

  /**
   * Preferred language. Possible values are cs and en.
   */
  language: string;

  /**
   * List of flags.
   */
  flags?: [string];
}

/**
 * @interface SignableSettings
 * @extends {CSCoreSDK.Signable}
 */
export interface SignableSettings extends CSCoreSDK.Signable {

  settings: Settings;
}