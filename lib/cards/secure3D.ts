/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');

/**
 * Get the 3D secure online shopping status
 */
export class CardsSecure3DResource extends CSCoreSDK.Resource
implements CSCoreSDK.GetEnabled<SecureSettings> {
    
    /**
     * Returns 3D secure online shopping status
     */ 
    get = () : Promise<SecureSettings> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null);
    }
}

export interface SecureSettings {
    
    /**
    * 3D secure functionality status. Possible Values: OK, NOT_ACTIVATED
    */
    status?: string;
    
    /**
    * Personal Assurance Message (PAM) that user chose when activate 3D secure
    */
    pam?: string;
    
    /**
    * Phone (used for OTP authentification) number Id coming from Contacts
    */
    phoneNumber?: string;
    
    /**
    * 3D Secure language
    */
    language?: string;
}