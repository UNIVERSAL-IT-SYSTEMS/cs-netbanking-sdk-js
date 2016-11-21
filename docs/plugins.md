# Plugins

This guide walks you through retrieving current user's plugins.

[PluginsResource](../plugins/plugins.ts)

```javascript

    // Get PluginsResource
    CSNetbankingSDK
            .getClient()
            .plugins

```

## 1. List all of current users plugins

You can list all of current users plugins by calling the `list` method on [PluginsResource](../plugins/plugins.ts). 

```javascript

    // List all plugins
    CSNetbankingSDK
            .getClient()
            .plugins
            .list(PluginsParameters parameters)
            .then(...)
            .catch(...)

```

## 2. Update plugin

Update plugin by getting the [PluginResource](../plugins/plugins.ts) and then calling the `update` method on it. The method takes object with properties as a parameter. Currently only alias can be changed. For all supported parameters see [PluginUpdateRequest](../plugins/plugins.ts) and [PluginUpdateResponse](../plugins/plugins.ts) for full response.

```javascript

    // Update plugin
    CSNetbankingSDK
            .getClient()
            .plugins
            .withId(string id)
            .update(PluginUpdateRequest request)
            .then(...)
            .catch(...)

```