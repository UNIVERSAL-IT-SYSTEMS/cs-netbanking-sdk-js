import * as CSCoreSDK from 'cs-core-sdk';
import { LastLoginsResource } from './lastLogins';

/**
 * Get information about the profile and past logins.
 * @class ProfileResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.GetEnabled<Profile>}
 */
export class ProfileResource extends CSCoreSDK.Resource
  implements CSCoreSDK.GetEnabled<Profile> {

  /** 
   * Returns information about the profile 
   * @returns {Promise<Profile>}
   */
  get = (): Promise<Profile> => {
    return CSCoreSDK.ResourceUtils.CallGet(this, null).then(profile => {

      if ((<Profile>profile).lastlogin) {

        // transform ISO dates to native Date objects
        CSCoreSDK.EntityUtils.addDatesFromISO('lastlogin', profile);
      }

      return profile;
    });
  }

  /** 
   * Returns LastLoginsResource for listing past logins
   * @returns {LastLoginsResource}
   */
  get lastLogins(): LastLoginsResource {
    return new LastLoginsResource(this.getPath() + '/logininfo', this.getClient());
  }
}

/**
 * @interface Profile
 */
export interface Profile {

  /**
  * user's first name
  */
  firstName: string;

  /**
  * user's last name
  */
  lastName: string;

  /**
  * user's name used for salutation
  */
  salutation?: string;

  /**
  * customer's id a.k.a cluid
  */
  customerId: string;

  /**
  * number of institute
  */
  institudeId: number;

  /**
  * Has the customer approved §107 telecommunication act. Possible values: ACCEPTED, NOT_ACCEPTED, UNKNOWN.
  */
  marketingInfoAcceptance: string;

  /**
  * user's gender. Possible values: MALE, FEMALE, UNKNOWN.
  */
  gender: string;

  /**
  * Date and time of the last login of customer. Common last login for all client applications - George, QC, etc.
  */
  lastlogin?: Date;
}