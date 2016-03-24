/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {StatementList, Statement, Parameters} from '../common';

/**
* Get individual SubAccount resource
*/
export class AccountsSubAccountsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<SubAccountResource> {
    
    /**
    * Returns individual SubAccount resource with a given id
    */
    withId = (id: string|number) : SubAccountResource => {
        return new SubAccountResource(id, this.getPath(), this._client);
    }
}

/**
* Get information about the subaccount
*/
export class SubAccountResource extends CSCoreSDK.InstanceResource {
    
    /**
    * Get information about the subaccount's statements
    */
    get statements() {
        return new SubAccountStatementsResource(this.getPath() + '/statements', this._client);
    }
}

/**
* List all subaccount's statements
*/
export class SubAccountStatementsResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<Statement> {
    
    /**
    * Returns all subaccount's statements in a promise
    */
    list = (params?: Parameters): Promise<StatementList> => {
        this._path = this.getPath().replace('/my', '/cz/my');
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'statements', params, response => {
            
            // transform ISO dates to native Date objects
            CSCoreSDK.EntityUtils.addDatesToItems('statementDate', response);
            
            return response;
        });
    }
}