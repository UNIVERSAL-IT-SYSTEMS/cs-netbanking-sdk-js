/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Signed} from '../common';

export interface DeliveryListing {
    cardDeliveryMode: string,
    branchId: string,
    address: Address 
}

export interface Address {
    street: string,
    streetNumber?: number,
    buildingApartment?: string,
    zipCode?: string,
    city: string,
    country: string,
    confirmations?: [Confirmation]
}

export interface Confirmation {
    email: string,
    language: string
}

export interface ChangeDeliverySettingsResponse extends DeliveryListing, Signed {}

export interface ChangeDeliverySettingsRequest extends CSCoreSDK.PaginatedListResponse<Confirmation> {
    cardDeliveryMode: string,
}