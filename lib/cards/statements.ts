/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {StatementList, Statement, NetbankingParameters, DownloadStatementParameters} from '../common';

/**
 * Account resource for listing statements
 */
export class CardAccountsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<CardAccountResource> {
    
    /**
     * Returns CardAccountResource for an account with a given id
     */ 
    withId = (id: string): CardAccountResource => {
        return new CardAccountResource(id, this.getPath(), this._client);
    }
} 

/**
 * Indidiual account resource with a given id
 */
export class CardAccountResource extends CSCoreSDK.InstanceResource {
    
    /**
     * Get statements of the account
     */ 
    get statements() {
        return new CardStatementsResource(this.getPath() + '/statements', this._client); 
    }
}

/**
 * Get statements for an account
 */ 
export class CardStatementsResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<Statement> {
    
    /**
     * List all statements
     */ 
    list = (params?: NetbankingParameters) : Promise<StatementList> => {
        
        // transform "sort" and "order" parameters to comma separated list from array
        CSCoreSDK.EntityUtils.transformArrayParamsToString(params, ['sort', 'order']);
        
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'statements', params, response => {
            
            // transform ISO dates to native Date objects
            CSCoreSDK.EntityUtils.addDatesToItems('statementDate', response)
            
            return response;
        });
    }
    
    /**
     * Download PDF with statements
     */ 
    download = (params: DownloadStatementParameters) => {
        return CSCoreSDK.ResourceUtils.CallApiWithSuffix(this, 'signed/download', 'POST', params);
    }
}