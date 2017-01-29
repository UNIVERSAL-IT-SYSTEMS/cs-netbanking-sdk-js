
import * as CSCoreSDK from 'cs-core-sdk';
import {AccountNumber} from '../common';

export class TemplatesResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<Template>, CSCoreSDK.HasInstanceResource<TemplateResource> {

    /**
     * List of payment templates for current user.
     */
    list = (params?: TemplatesParameters): Promise<TemplateList> => {
        return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'templates', params, response => {
            
            response.items.forEach(item => {
                resourcifyTemplates(<Template>item, this.withId((<Template>item).id));
            });

            return response;
        });
    }

    /**
     * Get resource for template with a given id 
     */
    withId = (id: string): TemplateResource => {
        return new TemplateResource(id, this.getPath(), this.getClient());
    }
}

export class TemplateResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.GetEnabled<Template> {

    /**
     * Get payment template detail
     */
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