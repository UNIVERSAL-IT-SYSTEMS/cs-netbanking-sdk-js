/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount} from '../../common';

export class InsurancesContractFundsResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<Fund>, CSCoreSDK.UpdateEnabled<UpdateFundRequest, UpdateFundResponse> {

    constructor(basePath: string, client: CSCoreSDK.WebApiClient) {    
        super(basePath, client);
        
        // insert 'cz' resource into the resource's path because the api requires it in some resources
        this._path = this.getPath().replace('/my', '/cz/my');
    }

    /**
     * Returns detail of distribution of capital value into funds.
     */
    list = (): Promise<FundList> => {
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'funds', null);
    }

    /**
     * Change the distribution of capital value into funds.
     */
    update = (payload: UpdateFundRequest): Promise<UpdateFundResponse> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
    }
}

export interface FundList extends CSCoreSDK.PaginatedListResponse<Fund> {

    /**
     * Total invested amount into all funds in CZK.
     */
    totalInvestedAmount: Amount;

    /**
     * Shows, whether a investment program is active for life insurance product. The field can be either blank or filled with 2 values - INVESTMENT_MANAGEMENT or CONSEQ
     */
    investmentProgram?: string;

    /**
     * Array of flags for funds.
     */
    flags?: [string];
}

export interface Fund {

    /**
     * Unique code of fund.
     */
    code: string;

    /**
     * Name of fund.
     */
    name: string;

    /**
     * Current value invested into fund in CZK
     */
    investedAmount: Amount;

    /**
     * Current value invested into fund in %.
     */
    investedShare: number;

    /**
     * The rate at which the savings component of the premium will be invested in selected funds.Value in percentage, e.g. 63 will be displayed as 63 %.
     */
    allocation: number;
}

export interface UpdateFundRequest {

    funds: [{

        /**
         * Unique code of fund.
         */
        code: string;

        allocation: number;
    }];

    /**
     * Shows, whether an investment program is active for life insurance product. The field can be either blank or filled with 2 values - INVESTMENT_MANAGEMENT or CONSEQ
     */
    investmentProgram?: string;
}

export interface UpdateFundResponse extends UpdateFundRequest, CSCoreSDK.Signable {}