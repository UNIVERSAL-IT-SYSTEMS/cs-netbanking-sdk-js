
import * as CSCoreSDK from 'cs-core-sdk';

export class ContactsResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<Contact>, CSCoreSDK.HasInstanceResource<ContactResource> {

    /**
     * Resource represents list of contact information for current user. It can contain addresses, phones and email addresses.
     */
    list = (): Promise<ContactList> => {
        return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, 'contacts');
    }

    /**
     * Get the resource of contact with a given id
     */
    withId = (id: string): ContactResource => {
        return new ContactResource(id, this.getPath(), this.getClient());
    }
}

export class ContactResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.GetEnabled<Contact> {

    /**
     * Resource represents one specific contact information identified by its id. It can be address, phone or email address.
     */
    get = (): Promise<Contact> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null);
    }
}

export interface ContactList extends CSCoreSDK.ListResponse<Contact> {}

export interface Contact {

    /**
     * Contact ID
     */
    id: string;

    /**
     * Type of contact. ENUM values: ADDRESS, PHONE, EMAIL, FAX.
     */
    type: string;

    /**
     * Contact flags
     */
    flags?: [string];

    /**
     * Contact address
     */
    address?: {

        /**
         * Address type. ENUM values: PERMANENT_RESIDENCE, SECONDARY_RESIDENCE, COMPANY_RESIDENCE, UNKNOWN
         */
        type: string;

        /**
         * Localized name of address type.
         */
        typeI18N: string;

        description?: string;

        street: string;

        streetNumber?: string | number;

        buildingApartment?: string | number;

        zipCode: string;

        city: string;

        country: string;
    }

    /**
     * Contact phone
     */
    phone?: {

        /**
         * Phone type. ENUM: PRIVATE, COMPANY, UNKNOWN
         */
        type: string;

        /**
         * Localized name of phone type.
         */
        typeI18N: string;

        /**
         * Country calling code as international phone number prefix. E.g.: "0043" or "+43", "00420" or "+420", "00421" or "+421"
         */
        countryCallingCode: string;

        /**
         * Phone number
         */
        phoneNumber: string;
    }

    /**
     * Primary contact email address
     */
    email?: {

        /**
         * Email type. ENUM values: PRIVATE, COMPANY, UNKNOWN
         */
        type: string;

        /**
         * Localized name of email type.
         */
        typeI18N: string;

        /**
         * Email
         */
        email: string;
    }
}