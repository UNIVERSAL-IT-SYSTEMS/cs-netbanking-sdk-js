import {Signed} from '../accounts/accounts'

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

export interface ChangeDeliverySettingsResponse extends DeliveryListing {
    signInfo: Signed
}

export interface ChangeDeliverySettingsRequest {
    cardDeliveryMode: string,
    confirmations: [Confirmation]
}