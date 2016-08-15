/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {AccountNumber} from '../common';

export class TemplatesResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<Template>, CSCoreSDK.HasInstanceResource<TemplateResource> {

    list = (params?: TemplatesParameters): Promise<TemplateList> => {
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'templates', params, response => {
            
            response.items.forEach(item => {
                resourcifyTemplates(<Template>item, this.withId((<Template>item).id));
            });

            return response;
        });
    }

    withId = (id: string): TemplateResource => {
        return new TemplateResource(id, this.getPath(), this.getClient());
    }
}

export class TemplateResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.GetEnabled<Template> {

    get = (): Promise<Template> => {
        return CSCoreSDK.ResourceUtils.CallGet(this, null).then(response => {
            resourcifyTemplates(<Template>response, this);

            return response;
        });
    }
}

function resourcifyTemplates(template: Template, templateReference: TemplateResource) {
    template.get = templateReference.get;
}

export interface TemplateList extends CSCoreSDK.PaginatedListResponse<Template> {}

export interface Template {

    /**
     * template ID
     */
    id: string;

    /**
     * name defined by user
     */
    name?: string;

    /**
     * Order category. Possible values: DOMESTIC, INTERNATIONAL
     */
    orderCategory?: string;

    /**
     * Receiver account number.
     */
    receiver: AccountNumber;

    /**
     * Convenience method for fetching templates detail
     */
    get: () => Promise<Template>;
}

export interface TemplatesParameters extends CSCoreSDK.Paginated {}