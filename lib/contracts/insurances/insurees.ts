/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import * as CSCoreSDK from 'cs-core-sdk';
import {Address, Amount} from '../../common';

export class InsurancesContractInsureesResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<Insuree> {

    constructor(basePath: string, client: CSCoreSDK.WebApiClient) {    
        super(basePath, client);
        
        // insert 'cz' resource into the resource's path because the api requires it in some resources
        this._path = this.getPath().replace('/my', '/cz/my');
    }

    /**
     * Returns list of insurees related to the insurance contract.
     */
    list = (): Promise<InsureeList> => {
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'insurees');
    }
}

export interface InsureeList extends CSCoreSDK.ListResponse<Insuree> {}

export interface Insuree {

    /**
     * Unique ID of the person related to the insurance contract. ID is hashed combination of contract number and birthnumber of the person: contractNumber_birthnumber.
     */
    id: string;

    /**
     * Type of person related to the insurance contract. 3 possible values: POLICYHOLDER, INSURED_PERSON, CHILD.
     */
    type: string;

    /**
     * Name of the person related to the insurance contract.
     */
    name: string;

    /**
     * Contact address.
     */
    addresses: [Address];

    /**
     * Birthnumber of the person related to the insurance contract.
     */
    birthNumber: string;

    /**
     * Phone number of the person related to the insurance contract.
     */
    phoneNumber?: string;

    /**
     * Email address of the person related to the insurance contract.
     */
    email?: string;
    
    risks?: [{

        /**
         * Name of the active risk product.
         */
        productName?: string;

        /**
         * Group of the active risk product.
         */
        riskGroup?: string;

        /**
         * Amount that an ​insurance ​company will ​pay after making a ​claim.
         */
        insuredSum?: Amount;

        /**
         * Frequency in which insured sum may be paid.
         */
        frequency?: string;

        /**
         * Description of the insured risk.
         */
        explanation?: string;
    }];
}