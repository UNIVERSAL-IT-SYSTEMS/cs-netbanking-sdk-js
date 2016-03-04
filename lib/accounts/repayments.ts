/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount} from '../common';

export interface RepaymentList extends CSCoreSDK.PaginatedListResponse<Repayment> {}

export interface Repayment {
    
   /**
    * Date of the repayment.
    */
    repaymentDate: Date,
    
   /**
    * Repayment amount. What should be paid.
    */
    amount: Amount,
    
   /**
    * Actual paid amount.
    */
    paidAmount?: Amount   
}