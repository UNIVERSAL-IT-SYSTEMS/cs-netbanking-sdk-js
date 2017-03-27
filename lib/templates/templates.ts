import * as CSCoreSDK from 'cs-core-sdk';
import { AccountNumber } from '../common';

/**
 * @class TemplateResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.PaginatedListEnabled<Template>}
 * @implements {CSCoreSDK.HasInstanceResource<TemplateResource>}
 */
export class TemplatesResource extends CSCoreSDK.Resource
  implements CSCoreSDK.PaginatedListEnabled<Template>, CSCoreSDK.HasInstanceResource<TemplateResource> {

  /**
   * List of payment templates for current user.
   * @param {TemplatesParameters=} params
   * @returns {Promise<TemplateList>}
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
   * @param {string} id
   * @returns {TemplateResource}
   */
  withId = (id: string): TemplateResource => {
    return new TemplateResource(id, this.getPath(), this.getClient());
  }
}

/**
 * @class TemplateResource
 * @extends {CSCoreSDK.InstanceResource}
 * @implements {CSCoreSDK.GetEnabled<Template>}
 */
export class TemplateResource extends CSCoreSDK.InstanceResource
  implements CSCoreSDK.GetEnabled<Template> {

  /**
   * Get payment template detail
   * @returns {Promise<Template>}
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

/**
 * @interface TemplateList
 * @extends {CSCoreSDK.PaginatedListResponse<Template>}
 */
export interface TemplateList extends CSCoreSDK.PaginatedListResponse<Template> { }

/**
 * @interface Template
 */
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
   * @returns {Promise<Template>}
   */
  get: () => Promise<Template>;
}

/**
 * @interface TemplatesParameters
 * @extends {CSCoreSDK.Paginated}
 */
export interface TemplatesParameters extends CSCoreSDK.Paginated { }