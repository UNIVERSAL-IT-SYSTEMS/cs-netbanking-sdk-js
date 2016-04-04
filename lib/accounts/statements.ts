/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {StatementsList, Statement, Parameters, DownloadStatementsParameters} from '../common';

/**
* Get information about the account's statements
*/
export class AccountsStatementsResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<Statement> {
    
    /**
    * Fetches the statements and returns them in a promise
    */
    list = (params?: Parameters) : Promise<StatementsList> => {
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'statements', params, response => {
            
            // transform ISO dates to native Date objects
            CSCoreSDK.EntityUtils.addDatesToItems('statementDate', response);
            
            return response;
        });
    }
    
    /**
    * Downloads statements file
    */
    download = (params: DownloadStatementsParameters): Promise<any> => {
        return this._client.callApi(this._path + '/signed/download', "POST", params, null, null);
    }
}