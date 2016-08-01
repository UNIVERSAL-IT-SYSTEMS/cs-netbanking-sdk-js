/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {BuildingsContractsResource} from './buildings/buildings';
import {PensionsContractsResource} from './pensions/pensions';

export class ContractsResource extends CSCoreSDK.Resource {

    get buildings(): BuildingsContractsResource {
        return new BuildingsContractsResource(`${this.getPath()}/buildings`, this.getClient());
    }

    get pensions(): PensionsContractsResource {
        return new PensionsContractsResource(`${this.getPath()}/pensions`, this.getClient());
    }
}