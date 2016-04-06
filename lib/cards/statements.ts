/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {StatementsList, Statement, NetbankingParameters, DownloadStatementsParameters} from '../common';

/**
 * Account resource for listing statements
 */
export class CardsAccountsResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<CardsAccountResource> {
    
    /**
     * Returns CardAccountResource for an account with a given id
     */ 
    withId = (id: string): CardsAccountResource => {
        return new CardsAccountResource(id, this.getPath(), this._client);
    }
} 

/**
 * Indidiual account resource with a given id
 */
export class CardsAccountResource extends CSCoreSDK.InstanceResource {
    
    /**
     * Get statements of the account
     */ 
    get statements() {
        return new CardsStatementsResource(this.getPath() + '/statements', this._client); 
    }
}

/**
 * Get statements for an account
 */ 
export class CardsStatementsResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<Statement> {
    
    /**
     * List all statements
     */ 
    list = (params?: NetbankingParameters) : Promise<StatementsList> => {
        
        // transform "sort" and "order" parameters to comma separated list from array
        CSCoreSDK.EntityUtils.transformSortableParameters(params);
        
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'statements', params, response => {
            
            // transform ISO dates to native Date objects
            CSCoreSDK.EntityUtils.addDatesToItems('statementDate', response)
            
            return response;
        });
    }
    
    /**
     * Download PDF with statements
     */ 
    download = (params: DownloadStatementsParameters) => {
        return this._client.callApi(this._path + '/signed/download', 'POST', params, null, null);
    }
}