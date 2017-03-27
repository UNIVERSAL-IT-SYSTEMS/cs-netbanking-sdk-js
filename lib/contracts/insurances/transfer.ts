import * as CSCoreSDK from 'cs-core-sdk';
import { Amount, AccountNumber } from '../../common';

/**
 * @class InsurancesContractTransferResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.UpdateEnabled<UpdateContractTrasferRequest, UpdateContractTrasferResponse>}
 */
export class InsurancesContractTransferResource extends CSCoreSDK.Resource
  implements CSCoreSDK.UpdateEnabled<UpdateContractTrasferRequest, UpdateContractTrasferResponse> {

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
   * Creates insurance transfer - premium payment, extra deposit or recommended deposit.
   * @param {UpdateContractTrasferRequest} payload
   * @returns {Promise<UpdateContractTrasferResponse>}
   */
  update = (payload: UpdateContractTrasferRequest): Promise<UpdateContractTrasferResponse> => {
    return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {

      CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), this.getPath());

      return response;
    });
  }
}

/**
 * @interface UpdateContractTrasferRequest
 */
export interface UpdateContractTrasferRequest {

  /**
   * Type of the transfer. Possible values are PAY_PREMIUM, EXTRA_DEPOSIT, RECOMMENDED_DEPOSIT.
   */
  type: string;

  /**
   * Amount which should be transfered.
   */
  amount: Amount;

  /**
   * Sender account.
   */
  sender: AccountNumber;
}

/**
 * @interface UpdateContractTrasferResponse
 * @extends {CSCoreSDK.Signable}
 */
export interface UpdateContractTrasferResponse extends CSCoreSDK.Signable { }