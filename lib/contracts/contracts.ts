/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {BuildingsContractsResource} from './buildings/buildings';

export class ContractsResource extends CSCoreSDK.Resource {

    get buildings(): BuildingsContractsResource {
        return new BuildingsContractsResource(`${this.getPath()}/buildings`, this.getClient());
    }

}