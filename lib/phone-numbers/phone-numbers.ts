import * as CSCoreSDK from 'cs-core-sdk';
import { NetbankingEmptyResponse } from '../common';

/**
 * @class PhoneNumbersResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.ListEnabled<PhoneNumber>}
 * @implements {CSCoreSDK.CreateEnabled<PhoneNumberRequest, PhoneNumber>}
 * @implements {CSCoreSDK.HasInstanceResource<PhoneNumberResource>}
 */
export class PhoneNumbersResource extends CSCoreSDK.Resource
  implements CSCoreSDK.ListEnabled<PhoneNumber>, CSCoreSDK.CreateEnabled<PhoneNumberRequest, PhoneNumber>, CSCoreSDK.HasInstanceResource<PhoneNumberResource> {

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
   * Returns list of phone numbers
   * @returns {Promise<PhoneNumberList>}
   */
  list = (): Promise<PhoneNumberList> => {
    return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'phoneNumbers').then(response => {

      response.items.forEach(x => {
        resourcifyPhoneNumbers(<PhoneNumber>x, this.withId((<PhoneNumber>x).id));
      });

      return response;
    });
  }

  /**
   * Creates new phone number
   * @param {PhoneNumberRequest} payload
   * @returns {Promise<PhoneNumber>}
   */
  create = (payload: PhoneNumberRequest): Promise<PhoneNumber> => {
    return CSCoreSDK.ResourceUtils.CallCreate(this, payload).then(response => {
      resourcifyPhoneNumbers(<PhoneNumber>response, this.withId((<PhoneNumber>response).id));

      return response;
    });
  }

  /**
   * Get single phone number with a given id
   * @param {string} id
   * @returns {PhoneNumberResource}
   */
  withId = (id: string): PhoneNumberResource => {
    return new PhoneNumberResource(id, this.getPath(), this.getClient());
  }
}

/**
 * @class PhoneNumberResource
 * @extends {CSCoreSDK.InstanceResource}
 * @implements {CSCoreSDK.UpdateEnabled<PhoneNumberRequest, PhoneNumber>}
 * @implements {CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse>}
 */
export class PhoneNumberResource extends CSCoreSDK.InstanceResource
  implements CSCoreSDK.UpdateEnabled<PhoneNumberRequest, PhoneNumber>, CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse> {

  /**
   * Updates phone number
   * @param {PhoneNumberRequest} payload
   * @returns {Promise<PhoneNumber>}
   */
  update = (payload: PhoneNumberRequest): Promise<PhoneNumber> => {
    (<any>payload).id = this._id;
    return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {

      resourcifyPhoneNumbers(<PhoneNumber>response, this);

      return response;
    });
  }

  /**
   * Deletes phone number
   * @returns {Promise<NetbankingEmptyResponse>}
   */
  delete = (): Promise<NetbankingEmptyResponse> => {
    return CSCoreSDK.ResourceUtils.CallDelete(this, null);
  }
}

/**
 * @interface PhoneNumberList
 * @extends {CSCoreSDK.ListResponse<PhoneNumber>}
 */
export interface PhoneNumberList extends CSCoreSDK.ListResponse<PhoneNumber> { }

/**
 * @interface PhoneNumber
 * @extends {PhoneNumberRequest}
 */
export interface PhoneNumber extends PhoneNumberRequest {

  /**
   * Phone book entry identifier.
   */
  id: string;

  /**
   * Convenience method for updating Phone number
   * @param {PhoneNumberRequest} payload
   * @returns {Promise<PhoneNumber>}
   */
  update: (payload: PhoneNumberRequest) => Promise<PhoneNumber>;

  /**
   * Convenience method for deleting Phone number
   * @returns {Promise<NetbankingEmptyResponse>}
   */
  delete: () => Promise<NetbankingEmptyResponse>;
}

/**
 * @interface PhoneNumberRequest
 */
export interface PhoneNumberRequest {

  /**
   * Alias name of phone number entered by user for his better orientation in phone book.
   */
  alias?: string;

  /**
   * Phone number which will be saved in phone book. The value in the phone number field must be a 9-digit number that cannot have a leading zero.
   */
  phoneNumber: string;

  /**
   * Array of optional Flag values.
   */
  flags?: [string];
}

function resourcifyPhoneNumbers(phoneNumber: PhoneNumber, phoneNumberReference: PhoneNumberResource) {
  phoneNumber.update = phoneNumberReference.update;
  phoneNumber.delete = phoneNumberReference.delete;
}