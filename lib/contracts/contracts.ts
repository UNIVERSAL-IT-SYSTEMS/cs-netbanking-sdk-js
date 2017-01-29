
import * as CSCoreSDK from 'cs-core-sdk';
import {BuildingsContractsResource} from './buildings/buildings';
import {PensionsContractsResource} from './pensions/pensions';
import {InsurancesContractsResource} from './insurances/insurances';
import {LoyaltyContractsResource} from './loyalty/loyalty';

export class ContractsResource extends CSCoreSDK.Resource {

    /**
     * Get buildings contracts resource
     */
    get buildings(): BuildingsContractsResource {
        return new BuildingsContractsResource(`${this.getPath()}/buildings`, this.getClient());
    }

    /**
     * Get pensions contracts resource
     */
    get pensions(): PensionsContractsResource {
        return new PensionsContractsResource(`${this.getPath()}/pensions`, this.getClient());
    }

    /**
     * Get insurances contracts resource
     */
    get insurances(): InsurancesContractsResource {
        return new InsurancesContractsResource(`${this.getPath()}/insurances`, this.getClient());
    }

    /**
     * Get loyalty contracts resource
     */
    get loyalty(): LoyaltyContractsResource {
        return new LoyaltyContractsResource(`${this.getPath()}/loyalty`, this.getClient());
    }
}