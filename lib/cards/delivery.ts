/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Signed} from '../common';

/**
 * Get current delivery settings
 */
export class CardDeliveryResource extends CSCoreSDK.Resource
implements CSCoreSDK.GetEnabled<DeliveryListing>, CSCoreSDK.UpdateEnabled<ChangeDeliverySettingsRequest, ChangeDeliverySettingsResponse> {
    
    /**
     * Returns current delivery settings  
     */ 
    get = () : Promise<DeliveryListing> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null);
    }
} 

export interface DeliveryListing {
    
    /**
    * Type of the delivery which should be set for this card. Possible values are BRANCH, OTHER_BRANCH, HOME, ADDRESS_ABROAD.
    */
    cardDeliveryMode: string,
    
    /**
    * Identification of the branch where card will be ready to takeover.
    */
    branchId: string,
    
    /**
    * Address where card should be sent.
    */
    address: Address 
}

export interface Address {
    
    /**
    * Street of the address.
    */
    street: string,
    
    /**
    * Number which is unique in street. Not all localities have streets.
    */
    streetNumber?: number,
    
    /**
    * Number which is unique in locality/town/village.
    */
    buildingApartment?: string,
    
    /**
    * Zip code of the address.
    */
    zipCode?: string,
    
    /**
    * City
    */
    city: string,
    
    /**
    * Address country.
    */
    country: string,
    
    /**
    * Information about the confirmation
    */
    confirmations?: [Confirmation]
}

export interface Confirmation {
    
    /**
    * Email
    */
    email: string,
    
    /**
    * Language
    */
    language: string
}

export interface ChangeDeliverySettingsResponse extends DeliveryListing, Signed {}

export interface ChangeDeliverySettingsRequest extends CSCoreSDK.PaginatedListResponse<Confirmation> {
    
    /**
    * Indicates how a client receives their card and pin. Possible values: BRANCH, HOME, OTHER_BRANCH, ADDRESS_ABROAD.
    */
    cardDeliveryMode: string,
}