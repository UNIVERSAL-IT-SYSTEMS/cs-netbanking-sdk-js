/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {StatementList, Statement, Parameters} from '../common';

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
    list = (params?: Parameters) : Promise<StatementList> => {
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'statements', params);
    }
    
    /**
     * Download PDF with statements
     */ 
    download = (params: DownloadStatementsParameters) => {
        // zkontrolovat, zřejmě nebude fungovat
        return CSCoreSDK.ResourceUtils.CallCreateWithSuffix(this, 'signed/download', params);
    }
}

export interface DownloadStatementsParameters {
    
    /**
     * Format of statements file. Example: PDF_A4.
     */ 
    format: string,
    
    /**
     * Statement identifier. Example: 201302520130621161819.
     */ 
    statementId: string
}