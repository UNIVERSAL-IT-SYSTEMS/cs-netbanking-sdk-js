# Signing

Most of the create/update/delete active calls done by the user/application need to be signed by the client. User can use various authorization methods, to confirm his/hers intention to execute active operation and authorize it.

You can find possible signing authorization methods in the following list:

* __NO AUTHORIZATION__ - validation of user intent without additional security measure. This form of signing is usually done by clicking some button in the UI.
* __TAC__ - validation of user intent to execute order by one time password sent to user personal device via SMS
* __MOBILE CASE (NOT IMPLEMENTED YET)__ - validation of the user response using mobile application, this method have two forms (user can choose which he'll use)
    * __ONLINE__ - mobile application receives PUSH notification with relevant data for authorization and user just clicks confirmation button in mobile application (data are sent over internet to bank)
    * __QR__ - mobile application retrieves relevant data for authorization by reading QR code displayed in frontend application, generates onetime password and user enters this OTP into frontend application to authorize operation

The signing is done in the following steps:

## 1. Create signable order

You can sign any call that returns signable response. Responses that are signable implement [`Signable`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/signing-orders/lib/web-api/api-query.ts#L150) interface. Response that is signable has `signing` key that contains [`SigningObject`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/signing-orders/lib/signing/signing-object.ts). [`SigningObject`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/signing-orders/lib/signing/signing-object.ts) contains public `state` which shows the current state of the signing and `signId` which is an unique identifier of the signing process for that particular order. You can use function `isOpen()` to see if the object is ready to be signed.

```javascript

    // Change card's limits. The order is signable
    CSNetbankingSDK
        .getClient()
        .cards
        .withId('3FB37388FC58076DEAD3DE282E075592A299B596')
        .limits
        .update({
            limits: [
                {
                    limitType: "ATM",
                    limitPeriod: "5D",
                    limit: {
                        value: 1100000,
                        precision: 2,
                        currency: "CZK"
                    }
                }
            ]
        }).then(function(response) {
            var signingObject = response.signing;
        });

```

## 2. Get info
Before you can sign the order, you need to find out which authorization methods you can use to sign the object.

You have to call method `getInfo()` to get the necesarry information for the sgining on the [`SigningObject`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/signing-orders/lib/signing/signing-object.ts).This method returns promise with [`FilledSigningObject`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/signing-orders/lib/signing/filled-signing-object.ts).

```javascript

    // Call getInfo method on SigningObject
    signingObject
        .getInfo()
        .then(function(response) {

            var filledSigningObject = response;
        });

```

## 3. Start signing

[`FilledSigningObject`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/signing-orders/lib/signing/filled-signing-object.ts) extends [`SigningObject`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/signing-orders/lib/signing/signing-object.ts) so you get all of the methods and properties like `isOpen()` from it. In addition [`FilledSigningObject`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/signing-orders/lib/signing/filled-signing-object.ts) has `authorizationType` and `scenarios` properties.

Convenience methods are also available. For example `canBeSignedWith(authType)` which takes `authorizationType` and returns `true` or `false` based on whether or not passed `authorizationType` is available, `getPossibleAuthorizationTypes` method that returns all possible `authorizationTypes`.

The most important methods are `startSigningWithTac`, `startSigningWithCaseMobile` and `startSigningWithNoAuthorization` that return [`TacSigningProcess`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/signing-orders/lib/signing/signing-process.ts#L20), [`CaseMobileSigningProcess`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/signing-orders/lib/signing/signing-process.ts#L32) or [`NoAuthSigningProcess`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/signing-orders/lib/signing/signing-process.ts#L44) in Promise.

Call one of these methods to start signing.

```javascript

    // Start signing with tac
    filledSigningObject
        .startSigningWithTac()
        .then(function(response) {

            var tacSigningProcess = response;
        });

```

## 4. Finish signing

[`TacSigningProcess`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/signing-orders/lib/signing/signing-process.ts#L20), [`CaseMobileSigningProcess`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/signing-orders/lib/signing/signing-process.ts#L32) and [`NoAuthSigningProcess`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/signing-orders/lib/signing/signing-process.ts#L44) have two methods. First one is `cancel` that cancels the signing process and `finishSigning` which finishes the signing.

`TacSigningProcess'` and `CaseMobileSigningProcess'` `finishSigning` takes `oneTimePassword` as a parameter for authorization. All of the methods return updated [`SigningObject`](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/signing-orders/lib/signing/filled-signing-object.ts).

```javascript

    // Finish signing with 1234 as password
    tacSigningProcess
        .finishSigning('1234')
        .then(function(response) {
            var signingObject = response;
        });

```

If the call was successful then the `state` value should be either `DONE` or `OPEN`.

`OPEN` means that you need to sign the order by additional method. Call `.getInfo()` on the signing object to continue signing. `DONE` state indicates that the order was fully signed and no further signing is needed.

```javascript
    expect(signingObject.isDone()).toEqual(true);
```
