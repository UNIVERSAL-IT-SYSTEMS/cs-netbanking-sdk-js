/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {NetbankingEmptyResponse} from '../common';

export class AuthorizationTokenResource extends CSCoreSDK.Resource
implements CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse> {

    delete = (): Promise<NetbankingEmptyResponse> => {
        return this._client.callApi(this.getPath().replace('/my', ''), 'DELETE');
    }
}