import * as CSCoreSDK from 'cs-core-sdk';

/** 
 * List all past logins
 * @class LastLoginsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.ListEnabled<LastLoginInfo>}
 */
export class LastLoginsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.ListEnabled<LastLoginInfo> {

  /** 
   * Returns promise with a list of past logins
   * @returns {Promise<LastLoginList>}
   */
  list = (): Promise<LastLoginList> => {
    return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'lastlogin').then(response => {

      // transform ISO dates to native Date objects
      CSCoreSDK.EntityUtils.addDatesToItems('lastlogin', response);

      return response;
    });
  }
}

/**
 * @interface LastLoginList
 * @extends {CSCoreSDK.ListResponse<LastLoginInfo>}
 */
export interface LastLoginList extends CSCoreSDK.ListResponse<LastLoginInfo> { }

/**
 * @interface LastLoginInfo
 */
export interface LastLoginInfo {

  /**
  * Channel of the last login. 
  */
  channel: string;

  /**
  * Date of the last login.
  */
  lastlogin: Date;
}