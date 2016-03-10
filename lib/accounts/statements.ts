/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {StatementList, Statement, Parameters} from '../common';

/**
* Get information about the account's statements
*/
export class AccountsStatementsResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<Statement> {
    
    /**
    * Fetches the statements and returns them in a promise
    */
    list = (params?: Parameters) : Promise<StatementList> => {
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'statements', params, response => {
            
            // transform ISO dates to native Date objects
            response.items.forEach(item => {
                CSCoreSDK.EntityUtils.addDatesFromISO(['statementDate'], item);
            })
            
            return response;
        })
    }
}