# Templates

This guide walks you through listing all templates and retrieving template detail.

## List all templates

List all templates by calling the `list` method on `TemplatesResource`. The method takes object with properties such as `pageSize` as a parameter. See all parameters in `TemplatesParameters` interface in [`templates.ts`](../lib/templates/templates.ts) file. For complete response see `TemplateList` in [`templates.ts`](../lib/templates/templates.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .templates
        .list({
            pageNumber: 0,
            pageSize: 10
        })
        .then(function(templates) {
            var template = templates.items[0];
            console.log(templates.name); // Marek Nový
        }); 


```

## Get template detail

Get template detail by calling the `withId` method on `TemplateResource` with `id` as a parameter and then calling the `get` method. For complete response see `Template` interface in [`templates.ts`](../lib/templates/templates.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .templates
        .withId('template_0-124-100')
        .get()
        .then(function(template) {
            console.log(template.name); // Marek Nový
        });

```