/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount} from '../common';

/**
* Get information about the account's repayments
*/
export class AccountsRepaymentsResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<Repayment> {
    
    /**
    * Fetches the repayments and returns them in a promise
    */
    list = (): Promise<RepaymentList> => {
        
        // insert 'cz' resource into the resource's path because the api requires it in some resources
        this._path = this.getPath().replace('/my', '/cz/my');
        
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'repayments', null).then(response => {
            
            // transform ISO dates to native Date objects
            CSCoreSDK.EntityUtils.addDatesToItems('repaymentDate', response)

            return response;
        });
    }
}

export interface RepaymentList extends CSCoreSDK.PaginatedListResponse<Repayment> {}

export interface Repayment {
    
   /**
    * Date of the repayment.
    */
    repaymentDate: Date;
    
   /**
    * Repayment amount. What should be paid.
    */
    amount: Amount;
    
   /**
    * Actual paid amount.
    */
    paidAmount?: Amount;
}