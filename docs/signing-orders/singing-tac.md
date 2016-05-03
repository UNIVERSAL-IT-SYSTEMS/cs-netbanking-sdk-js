# Signing orders tac

Most of create/update/delete active calls done by the user/application need to be signed by using particular authorization method, to confirm user intention to execute active operation and authorize user with some security tools in the same time.

Following list enumerates some of the possible authorization methods used in FE:

* __NO AUTHORIZATION__ - validation of user response as confirmation (e.g. confirm button click)
* __TAC__ - validation of user response as randomly generated number/code sent to user personal device via SMS
* __MOBILE CASE__ - validation of the user response using mobile application, this method have three forms (user can choose which he'll use)
    * __ONLINE__ - mobile application receives PUSH notification with relevant data for authorization and user just clicks confirmation button in mobile application (data are sent over internet to bank)
    * __QR__ - mobile application retrieves relevant data for authorization by reading QR code displayed in frontend application, generates onetime password and user enters this OTP into frontend application to authorize operation

##1. Create signable order

Make call that returns signable response. Responses that are signable implement Signable interface. On the response you there is SigningObject with key signing. SigningObject contains public state and signId properties. There are also methods convenient methods like isDone, isCanceled and isOpen that return true or false based on the state. 

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

##2. Get info

The last method that SigningObject has is getInfo. Call this method to get additional information about the signing process. You get promise with FilledSigningObject in response.

```javascript
    
    // Call getInfo method on SigningObject
    signingObject
        .getInfo()
        .then(function(response) {
            
            var filledSigningObject = response; 
        });

```

##3. Start signing

FilledSigningObject extends SigningObject so you get all of the methods and properties like isDone from it. In addition FilledSigningObject has authorizationType and scenarios properties, convenience methods canBeSignedWith which takes authorizationType and returns true or false based on whether or not passed authorizationType is available, getPossibleAuthorizationTypes method that returns all possible authorizationTypes. The most important methods are startSigningWithTac, startSigningWithCaseMobile and startSigningWithNoAuthorization that return TacSigningProcess, CaseMobileSigningProcess or NoAuthSigningProcess in Promise.

```javascript

    // Start signing with tac
    filledSigningObject
        .startSigningWithTac()
        .then(function(response) {
            
            var tacSigningProcess = response;
        });

```

##4. Finish signing

TacSigningProcess, CaseMobileSigningProcess and NoAuthSigningProcess have two methods. First is cancel that cancels the signing process and finishSigning. TacSigningProcess' and CaseMobileSigningProcess' finishSigning takes oneTimePassword as a parameter for authorization. All of the methods return updated FilledSigningObject. If the call was successful then the state value should be DONE.

```javascript

    // Finish signing with 1234 as password
    tacSigningProcess
        .finishSigning('1234')
        .then(function(response) {
            var filledSigningObject = response; 
        });

```