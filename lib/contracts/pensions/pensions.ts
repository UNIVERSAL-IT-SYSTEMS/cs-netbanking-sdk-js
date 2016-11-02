/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {ContractsTransactionsResource} from '../transactions';
import {Amount, Address, Signable} from '../../common';

export class PensionsContractsResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<Pension>, CSCoreSDK.HasInstanceResource<PensionsContractResource> {

    constructor(basePath: string, client: CSCoreSDK.WebApiClient) {    
        super(basePath, client);
        
        // insert 'cz' resource into the resource's path because the api requires it in some resources
        this._path = this.getPath().replace('/my', '/cz/my');
    }

    /**
     * Returns list of pension products which belongs to current user. This includes Pension Savings, Supplementary Pension Insurance and Supplementary Pension Savings.
     */
    list = (params?: PensionParameters): Promise<PensionList> => {
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'pensions', params, response => {

            response.items.forEach(item => {
                transformDates(item);
                resourcifyPension(<Pension>item, this.withId((<Pension>item).id));
            });

            return response;
        });
    }

    /**
     * Get the resource of pension contract with a given id
     */
    withId = (id: string): PensionsContractResource => {
        return new PensionsContractResource(id, this.getPath(), this.getClient());
    } 
}

export class PensionsContractResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.GetEnabled<Pension>, CSCoreSDK.UpdateEnabled<UpdatePensionRequest, UpdatePensionResponse> {

    /**
     * Returns detail of pension product which belongs to current user. This can be Pension Saving, Supplementary Pension Insurance and Supplementary Pension Saving.
     */
    get = (): Promise<Pension> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null).then(response => {
            transformDates(response);
            resourcifyPension(<Pension>response, this);

            return response;
        });
    }

    /**
     * Allows to change a limited set of pension contract-settings of one specific contract. Currently only the field alias can be changed. Change only to alias field must not be signed, but response is ready also for signing process.
     */
    update = (payload: UpdatePensionRequest): Promise<UpdatePensionResponse> => {
        (<any>payload).id = this._id;
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {
            transformDates(response);
            resourcifyPension(<Pension>response, this);
            CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), this.getPath());

            return response;
        });
    }

    /**
     * Returns transactions resource for pension contract
     */
    get transactions(): ContractsTransactionsResource {
        return new ContractsTransactionsResource(`${this.getPath()}/transactions`, this.getClient());
    }
}

function transformDates(item) {
    CSCoreSDK.EntityUtils.addDatesFromISO(['signingDate', 'validFrom', 'validTo'], item);
    if(item.productAccount) {
        CSCoreSDK.EntityUtils.addDatesFromISO('date', item.productAccount);
    }
    if(Array.isArray(item.beneficiaries)) {
        item.beneficiaries.forEach(x => {
            CSCoreSDK.EntityUtils.addDatesFromISO('birthDate', x);
        });
    }
}

function resourcifyPension(pension: Pension, pensionReference: PensionsContractResource) {
    pension.get = pensionReference.get;
    pension.update = pensionReference.update;
    pension.transactions = pensionReference.transactions;
}

export interface PensionList extends CSCoreSDK.PaginatedListResponse<Pension> {}

export interface Pension extends UpdatePensionRequest {

    /**
     * Product unique identifier.
     */
    id: string;
    
    /**
     * Name of the contract owner.
     */
    owner?: string;

    /**
     * Date when contract was signed.
     */
    signingDate?: Date;

    /**
     * First day of contract validity.
     */
    validFrom?: Date;

    /**
     * Last day of contract validity.
     */
    validTo?: Date;

    /**
     * Pension contract number.
     */
    agreementNumber: string;

    /**
     * Contract status. Possible values: ACTIVE, TERMINATED, PENSION_PAYMENT, INTERRUPTED, PAYMENTS_SUSPENDED, PAYMENTS_DEFFERED, SETTLED, REPEALED, NEGOTIATED.
     */
    status: string;

    productAccount: {


        /**
         * Account balance.
         */
        amount: Amount;

        /**
         * Date of the account balance validity.
         */
        date: Date;
    }

    /**
     * Localized product name.
     */
    productI18N: string;

    /**
     * Identification of the product type.
     */
    product: string;

    /**
     * Identification of the product group. Possible values are SUPPLEMENTARY_INSURANCE, PENSION_SAVINGS and SUPPLEMENTARY_SAVINGS.
     */
    subtype: string;

    /**
     * Birth number of the product owner.
     */
    birthNumber: string;

    /**
     * Amount of already paid benefits.
     */
    paidBenefits: Amount;

    strategy?: {

        /**
         * Conservative strategy share. Value in percentage, e.g. 0,5 will be displayed as 0,5 %.
         */
        conservative?: number;

        /**
         * Balanced strategy share. Value in percentage, e.g. 0,5 will be displayed as 0,5 %.
         */
        balanced?: number;

        /**
         * Dynamic strategy share. Value in percentage, e.g. 0,5 will be displayed as 0,5 %.
         */
        dynamic?: number;

        /**
         * State bonds strategy share. Value in percentage, e.g. 0,5 will be displayed as 0,5 %.
         */
        stateBonds?: number;
    }

    pensionAgreed?: {

        /**
         * Indication whether old-age pension has been agreed.
         */
        oldAge?: boolean;

        /**
         * Indication whether disability pension has been agreed.
         */
        disability?: boolean;

        /**
         * Indication whether early-retirement pension has been agreed.
         */
        earlyRetirement?: boolean;
    }

    savingTime?: {

        /**
         * Supplementary pension saving time.
         */
        supplementary?: number;

        /**
         * Old-age pension saving time.
         */
        oldAge?: number;

        /**
         * Early-retirement saving time.
         */
        earlyRetirement?: number;
    }

    contribution?: {

        /**
         * Indication whether employer contribution is set up.
         */
        employer: boolean;

        /**
         * Participant contribution value.
         */
        participantAmount: Amount;

        /**
         * Other person contribution value.
         */
        otherPersonAmount: Amount;
    }

    supplementary?: {

        /**
         * Email used for electronic communication.
         */
        email?: string;

        /**
         * Phone number used for sms communication.
         */
        sms?: string;

        /**
         * Indication whether maximum service is set up.
         */
        maxService?: boolean;

        /**
         * Indication whether optimum service is set up.
         */
        optService?: boolean;
    }

    
    beneficiaries?: {

        /**
         * Beneficiary name.
         */
        name: string;

        /**
         * Beneficiary birth date.
         */
        birthDate: Date;

        /**
         * Beneficiary birth number.
         */
        birthNumber: string;

        /**
         * Address where card should be sent.
         */
        address?: Address;

        /**
         * Beneficiary share. Value in percentage, e.g. 0,5 will be displayed as 0,5 %.
         */
        share: number;

        /**
         * Entitlement type. Possible values TAKEOVER.
         */
        entitlement?: string;
    }

    /**
     * Array of flags.
     */
    flags?: [string];

    /**
     * Convenience get method for fetching Pensions detail
     */
    get: () => Promise<Pension>;

    /**
     * Convenience update method for updating Pension
     */
    update: (payload: UpdatePensionRequest) => Promise<UpdatePensionResponse>;

    /**
     * Convenience getter for getting Pensions transactions resource
     */
    transactions: ContractsTransactionsResource;
}

export interface UpdatePensionRequest {

    /**
     * User defined account name. Max. 50 characters.
     */
    alias?: string;
}

export interface UpdatePensionResponse extends CSCoreSDK.Signable, Pension {}

export interface PensionParameters extends CSCoreSDK.Paginated {}