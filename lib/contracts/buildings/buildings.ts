/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {BuildingsContractsServicesResource} from './services';
import {ContractsTransactionsResource} from '../transactions';
import {AccountNumber, Amount, Signable} from '../../common'; 

export class BuildingsContractsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<BuildingsContractResource>, CSCoreSDK.PaginatedListEnabled<BuildingsContract> {

    /**
     * Resource represents list of building savings for current user. It contains building savings and loans from building savings as well.
     */
    list = (params?: BuildingsContractsParameters): Promise<BuildingsContractList> => {
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'buildings', params, response => {

            response.items.forEach(item => {

                resourcifyBuildingsContracts(<BuildingsContract>item, this.withId((<BuildingsContract>item).id));
                transformDates(item);
            });

            return response;
        });
    } 

    /**
     * Get the resource of buildings contract with a given id
     */
    withId = (id: string): BuildingsContractResource => {
        return new BuildingsContractResource(id, this.getPath(), this.getClient());
    }
}

export class BuildingsContractResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.GetEnabled<BuildingsContract>, CSCoreSDK.UpdateEnabled<UpdateBuildingsContractRequest, UpdateBuildingsContractResponse> {

    /**
     * Resource represents one building saving product identified by it's identifier. It can be building saving or loan from building saving.
     */
    get = (): Promise<BuildingsContract> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null).then(response => {
            resourcifyBuildingsContracts(<BuildingsContract>response, this);
            transformDates(response);

            return response;
        });
    }

    /**
     * Allows to change a limited set of building savings contract-settings of one specific contract. Currently only the field alias can be changed. Change only to alias field must not be signed, but response is ready also for signing process.
     */
    update = (payload: UpdateBuildingsContractRequest): Promise<UpdateBuildingsContractResponse> => {
        (<any>payload).id = this._id;

        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload).then(response => {
            resourcifyBuildingsContracts(<BuildingsContract>response, this);
            transformDates(response);
            CSCoreSDK.SigningUtils.createSigningObject(response, this.getClient(), this.getPath());

            return response;
        });
    }

    /**
     * Get buildings contracts services resource
     */
    get services(): BuildingsContractsServicesResource {
        return new BuildingsContractsServicesResource(`${this.getPath()}/services`, this.getClient());
    }

    /**
     * Get buildings contracts transactions resource
     */
    get transactions(): ContractsTransactionsResource {
        return new ContractsTransactionsResource(`${this.getPath().replace('/my', '/cz/my')}/transactions`, this.getClient());
    }
}

function resourcifyBuildingsContracts(contract: BuildingsContract, contractReference: BuildingsContractResource) {
    contract.get = contractReference.get;
    contract.update = contractReference.update;
    contract.services = contractReference.services;
    contract.transactions = contractReference.transactions;    
}

function transformDates(contract) {
    if(contract.saving) {
        CSCoreSDK.EntityUtils.addDatesFromISO('expiryDate', contract.saving);
    }

    if(contract.loan) {
        CSCoreSDK.EntityUtils.addDatesFromISO(['interestRateFromDate', 'interestRateToDate'], contract.saving);
    }
}

export interface BuildingsContractList extends CSCoreSDK.PaginatedListResponse<BuildingsContract> {}

export interface BuildingsContract extends UpdateBuildingsContractRequest {

    /**
     * Building saving identifier.
     */
    id: string;

    /**
     * Building saving account number.
     */
    accountno: AccountNumber;

    /**
     * Type of the account. Possible values are BUILD_SAVING and BUILD_LOAN.
     */
    type: string;

    /**
     * Product code.
     */
    product: string;

    /**
     * Product name.
     */
    productI18N: string;

    /**
     * Building savings account balance. For loans outstanding debt is served
     */
    balance: Amount;

    /**
     * Status of the contract. Possible values are ACTIVE and CLOSED.
     */
    status: string;

    /**
     * Debtor. Will only by set for loans.
     */
    // TODO
    contractHolders?: any;

    /**
     * Basic credit interest rate, used for building saving deposits. Value in percentage, e.g. 1,5 will be displayed as 1,5%.
     */
    creditInterestRate?: number;  

    /**
     * Basic debit interest rate, used for building loan. Value in percentage, e.g. 9,5 will be displayed as 9,5%.
     */
    debitInterestRate?: number;

    saving?: {

        /**
         * Target amount. Will not be set for loans.
         */
        targetAmount?: Amount;

        /**
         * Agreed monthly savings amount for building savings. Will not be set for loans.
         */
        agreedMonthlySavings?: Amount;

        /**
         * Notice period expiry date. Not set for loans.
         */
        expiryDate?: Date;

        /**
         * Remaining deposit to be paid to Building Savings till the end of this year to get annual maximal bonus.
         */
        bonusBearingDepositToPay?: Amount; 
    }


    loan?: {

        /**
         * Total contracted building loan amount.
         */
        loanAmount?: Amount;

        /**
         * Installment part of the loan monthly repayment.
         */
        loanInstallment: Amount;

        /**
         * Saving part of the loan monthly repayment.
         */
        additionalSavings?: Amount;

        /**
         * Insurance part of the loan monthly repayment.
         */
        paymentInsurance?: Amount;

        /**
         * Current interest rate is valid from this date. Filled only for loans.
         */
        interestRateFromDate?: Date;

        /**
         * Current interest rate is valid to this date. Filled only for loans in case of variable interest rate. If interest rate is fixed, this field is empty.
         */
        interestRateToDate?: Date;
    }

    /**
     * List of flags.
     */
    flags?: [string];

    /**
     * Convenience get method for fetching contracts detail 
     */
    get: () => Promise<BuildingsContract>;

    /**
     * Convenience update method for updating contract
     */
    update: (payload: UpdateBuildingsContractRequest) => Promise<UpdateBuildingsContractResponse>;

    /**
     * Convenience getter for contracts services
     */
    services: BuildingsContractsServicesResource;

    /**
     * Convenience getter for contracts transactions
     */
    transactions: ContractsTransactionsResource;
}

export interface BuildingsContractsParameters extends CSCoreSDK.Paginated {}

export interface UpdateBuildingsContractRequest {

    /**
     * User-specific alias of the contract. Max. 50 characters.
     */
    alias?: string;
}

export interface UpdateBuildingsContractResponse extends BuildingsContract, Signable {}

