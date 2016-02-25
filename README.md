#CSNetbankingSDK
This SDK allows you to access information about Česká spořitelna a.s. transparent accounts [Transparent Accounts API](https://developers.csas.cz/html/devs/transparent-accounts.html).

#[CHANGELOG](CHANGELOG.md)

#Usage

If you just want to use the SDK, there are compiled files ready to be used in the [`/dist`](./dist) folder.

You can just copy these files directly from the repository or preferably, use `npm` to install it into your project:

```
npm instal git+ssh://git@github.com:Ceskasporiteln/cs-transparent-acc-sdk-js.git --save
```
**IMPORTANT!** You need to have your SSH keys registered with the GitHub since this repository is private.

##Usage in browser
For usage in browser, pickup the following files from the `/dist` folder:
* `cs-transparent-acc-sdk.sfx.js` - CSCoreSDK packaged for browsers
* `cs-transparent-acc-sdk.sfx.d.ts` - CSCoreSDK typings for browsers
* `cs-transparent-acc-sdk.sfx.js.map` - CSCoreSDK sourcemap for browsers


TransparentAcc SDK is dependent on the [CSCoreSDK](https://github.com/Ceskasporiteln/cs-core-sdk-js). 
You can find the appropriate verion of CSCoreSDK in `node_modeules` of Uniforms SDK if you installed it through `npm`.
Include the `cs-core-sdk.sfx.js` in your page **before** the `cs-uniforms-sdk.sfx.js`:

```html
  <script src="./node_modules/cs-transparent-acc-sdk/node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.js"></script>
  <script src="./node_modules/cs-transparent-acc-sdk/dist/cs-transparent-acc-sdk.sfx.js"></script>
```

The TransparentAcc SDK will be available in global variable `CSTransparentSDK`.

**IMPORTANT!** CSAS SDKs depend on a native ES6 Promise implementation to be [supported](http://caniuse.com/promises).
If your environment doesn't support ES6 Promises, you can [polyfill](https://github.com/jakearchibald/es6-promise).

##Usage in node
For usage in node, install it through `npm` (see above). You can then require it by:
```javascript
var CSTransparentAccSDK = require('cs-transparentAcc-sdk');
``` 


##Configuration
Before using any CSAS SDKs in your application, you need to initialize CSCoreSDK by providing it your WebApiKey.
```javascript
CSCoreSDK.useWebApiKey( "YourApiKey" )
//Get the uniforms client
var transparentAccountsClient = CSTransparentAccSDK.getClient();
```
**See [CoreSDK configuration guide](https://github.com/Ceskasporiteln/cs-core-sdk-js/blob/master/docs/configuration.md)** for all the available configuration options.

##Usage Guide
**See [Usage Guide](./docs/transparent-acc.md)** for usage instructions.

#Development
The SDK itself is written in **TypeScript**, packaged by **webpack**, tested by **jasmine** & **karma** and distributed thorugh **npm**. It uses **tsd** for TypeScript definitions.

In order to to develop upon this SDK, you will need the following **installed globally**:

* `node` & `npm`
* `webpack` - For packaging
* `karma` - For testing
* `tsd` - For downloading typescript definitions

##Setup
After cloning the repo, run the following command to initialize the repository for development:

```
npm install && tsd install
```

You can verify everything worked as expected by running:
```
npm test
```

##Directory structure
This project uses the following directory structure:

* `dist` - Packaged version of this SDK ready for use.
* `build` - Build artifacts (not checked in repository)
* `lib` - The SDK itself
* `spec` - Tests for the SDK
* `typings` - Typings used by the SDK
* `tooling` - Commands for building and packaging 

##Development commands

* `npm run clean` - cleans `build` and `dist` folders
* `npm run build` - performs `clean` and builds the SDK into `bulid` folder. It also generates `.d.ts` files using `generate-tsd` command.
* `npm run dist` - performs `build` command and copies the packaged SDK files into `dist` folder
* `npm run test` - performs `build` and runs tests in node and browser.
* `npm run test-browser` - performs tests only in browser
* `npm run test-node` - performs tests only in node
* `npm version [major|minor|patch]` - releases new version of the SDK. Requires write access to repository. See [npm-version](https://docs.npmjs.com/cli/version) for more details. 



#Contributing
Contributions are more than welcome!

Please read our [contribution guide](CONTRIBUTING.md) to learn how to contribute to this project.

#Terms and License
Please read our [terms](TERMS.md) and [license](LICENSE.md)
#Terms and License
Please read our [terms](TERMS.md) and [license](LICENSE.md)