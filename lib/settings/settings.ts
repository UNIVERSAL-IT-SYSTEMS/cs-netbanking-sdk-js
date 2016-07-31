/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Signable} from '../common';

export class SettingsResource extends CSCoreSDK.Resource
implements CSCoreSDK.GetEnabled<Settings>, CSCoreSDK.UpdateEnabled<Settings, SignableSettings> {

    get = (): Promise<Settings> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null);
    }

    update = (payload: Settings): Promise<SignableSettings> => {
        return CSCoreSDK.ResourceUtils.CallUpdate(this, payload);
    }
}

export interface Settings {

    /**
     * Preferred language. Possible values are cs and en.
     */
    language: string;

    /**
     * List of flags.
     */
    flags?: [string];
}

export interface SignableSettings extends Signable {

    settings: Settings;
}