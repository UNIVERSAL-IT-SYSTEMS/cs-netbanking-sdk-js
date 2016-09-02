# Settings

This guide walks you through retrieving user's settings and updating it.

## Get user's settings

Get user's settings by calling the `get` method on `SettingsResource`. For complete response see `Settings` interface in [`settings.ts`](../lib/settings/settings.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .settings
        .get()
        .then(function(settings) {
            console.log(settings.language); // cs
        });

```

## Update user's settings

Update user's settings by getting the `SettingsResource` and then calling the `update` method on it. The method takes object with properties as a parameter. For all supported parameters see `Settings` interface and `SignableSettings` interface for full response in [`settings.ts`](../lib/settings/settings.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .settings
        .update({
            language: 'en'
        })
        .then(function(settings) {
            console.log(settings.language); // en
        });

```