# Profile

This guide walks you through retrieving current user's profile and information about their last logins.

## Get currrent user's profile detail

You can get current users profile detail by calling the `get` method on `ProfileResource`. For complete response with description please see `Profile` interface in [`profile.ts`](../lib/profile/profile.ts) interface.

```javascript

    CSNetbankingSDK
        .getClient()
        .profile
        .get()
        .then(function(profile) {
            console.log(profile.firstName); // Jan
        });

```

## List current user's last logins

You can list current user's last logins by calling the `list` method on `LastLoginResource`. For complete response with description please see `LastLoginsList` interface in [`lastLogin.ts`](../lib/profile/lastLogin.ts).

```javascript

    CSNetbankingSDK
        .getClient()
        .profile
        .LastLogin
        .list()
        .then(function(logins) {
           var login = logins.items[0];
           console.log(login.channel); // GEORGE 
        });

```