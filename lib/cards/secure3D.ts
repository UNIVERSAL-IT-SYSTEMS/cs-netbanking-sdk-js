import * as CSCoreSDK from 'cs-core-sdk';

/**
 * Get the 3D secure online shopping status
 * @class CardSecure3DResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.GetEnabled<SecureSettings>}
 */
export class CardSecure3DResource extends CSCoreSDK.Resource
  implements CSCoreSDK.GetEnabled<SecureSettings> {

  /**
   * Returns 3D secure online shopping status
   * @returns {Promise<SecureSettings>}
   */
  get = (): Promise<SecureSettings> => {
    return CSCoreSDK.ResourceUtils.CallGet(this, null);
  }
}

/**
 * @interface SecureSettings
 */
export interface SecureSettings {

  /**
  * 3D secure functionality status. Possible Values: OK, NOT_ACTIVATED
  */
  status?: string;

  /**
  * Personal Assurance Message (PAM) that user chose when activate 3D secure
  */
  pam?: string;

  /**
  * Phone (used for OTP authentification) number Id coming from Contacts
  */
  phoneNumber?: string;

  /**
  * 3D Secure language
  */
  language?: string;
}