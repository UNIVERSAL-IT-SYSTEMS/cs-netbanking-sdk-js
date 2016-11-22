/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Amount} from '../common';

export class AuthorizationLimitsResource extends CSCoreSDK.Resource
implements CSCoreSDK.ParametrizedListEnabled<AuthorizationLimitsParams, AuthorizationLimit>, CSCoreSDK.HasInstanceResource<AuthorizationLimitResource> {

    /**
     * Return all user local specific payment order entry limits for for all user active authorization methods and channels/applications used in country.
     */
    list = (params?: AuthorizationLimitsParams): Promise<AuthorizationLimitList> => {
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'limits', params).then(response => {

            response.items.forEach(x => {
                resourcifyLimits(<AuthorizationLimit>x, this.withId((<AuthorizationLimit>x).id));
            });

            return response;
        });
    }

    /**
     * Get the resource of authorization limit with a given id
     */
    withId = (id: string): AuthorizationLimitResource => {
        return new AuthorizationLimitResource(id, this.getPath(), this.getClient());
    }
}

export class AuthorizationLimitResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.GetEnabled<AuthorizationLimit> {

    /**
     * Return local specific payment order entry limits valid for combination of user, authorization method and used channel/application. For example user could define different limits for TAC authorization via George and mobile applications.
     */
    get = (): Promise<AuthorizationLimit> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null).then(response => {

            resourcifyLimits(<AuthorizationLimit>response, this);

            return response;
        });
    }
}

function resourcifyLimits(limit: AuthorizationLimit, limitReference: AuthorizationLimitResource) {
    limit.get = limitReference.get;
}

export interface AuthorizationLimitList extends CSCoreSDK.ListResponse<AuthorizationLimit> {}

export interface AuthorizationLimit {

    /**
     * Internal ID for limit definition for authorization type, channel, application. If internal ID doesn't exist, ID could be generated using authorizationType, channelId and applicationId values.
     */
    id: string;

    /**
     * Authorization method type for which is limit defined. ENUM: tac, tan, sms, gridCard, eok, displayCard, mToken other local authorization type has to be defined.
     */
    authorizationType: string;

    /**
     * ID of the channel for which is limit defined. ENUM: netBanking, mobileBanking, homeBanking, thirdParty, and unknown - limit valid for all channels, not particulary defined.
     */
    channelId: string;

    /**
     * ID of the application for which is limit defined. ENUM: George, InternetBanking and unknown - limit valid for all applications, not particulary defined.
     */
    applicationId: string;

    /**
     * Daily limit for particular authorization method (_embedded AMOUNT type)
     */
    dailyLimit?: Amount;

    /**
     * Transaction limit for particular authorization method.
     */
    transactionLimit?: Amount;

    /**
     * Maximal daily limit for authorization method defined by bank.
     */
    maxBankLimit?: Amount;

    /**
     * Convenience method for fetching authorization limit detail.
     */
    get: () => Promise<AuthorizationLimit>;
}

export interface AuthorizationLimitsParams {

    /**
     * Channel for which limits are requested. Example: George 
     */
    channel?: string;
}