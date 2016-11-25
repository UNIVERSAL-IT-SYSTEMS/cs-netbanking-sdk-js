var CSNetbankingSDK =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var accounts_1 = __webpack_require__(2);
	var profile_1 = __webpack_require__(13);
	var cards_1 = __webpack_require__(15);
	var orders_1 = __webpack_require__(23);
	var securities_1 = __webpack_require__(28);
	var settings_1 = __webpack_require__(30);
	var contacts_1 = __webpack_require__(31);
	var plugins_1 = __webpack_require__(32);
	var contracts_1 = __webpack_require__(33);
	var services_1 = __webpack_require__(49);
	var messages_1 = __webpack_require__(50);
	var templates_1 = __webpack_require__(53);
	var phone_numbers_1 = __webpack_require__(54);
	var budgets_1 = __webpack_require__(55);
	var goals_1 = __webpack_require__(56);
	var promotions_1 = __webpack_require__(57);
	var authorization_limits_1 = __webpack_require__(58);
	var authorization_token_1 = __webpack_require__(59);
	var bundles_1 = __webpack_require__(60);
	var sharedClient = null;
	/*+
	 * Returns the singleton NetbankingClient
	 */
	function getClient() {
	    if (sharedClient === null) {
	        return new NetbankingClient(CSCoreSDK.config.copy(), CSCoreSDK.sharedContext);
	    }
	    return sharedClient;
	}
	exports.getClient = getClient;
	/**
	 * Netbanking client
	 */
	var NetbankingClient = (function (_super) {
	    __extends(NetbankingClient, _super);
	    /**
	     * Creates new instance of NetbankingClient
	     *
	     * @param config WebApiConfiguration object that configures this client
	     * @param context WebApiContext object that allows for data sharing between clients
	     */
	    function NetbankingClient(config, context) {
	        _super.call(this, config, '/api/v3/netbanking/my');
	        this.sharedContext = context;
	    }
	    Object.defineProperty(NetbankingClient.prototype, "accounts", {
	        /**
	         * List all accounts and get other information like balance, services, statements etc.
	         */
	        get: function () {
	            return new accounts_1.AccountsResource(this.getPath() + '/accounts', this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "profile", {
	        /**
	        * Get information about the current user's profile and past logins.
	        */
	        get: function () {
	            return new profile_1.ProfileResource(this.getPath() + '/profile', this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "cards", {
	        /**
	        * List all cards and other information like delivery, transactions, limits etc.
	        */
	        get: function () {
	            return new cards_1.CardsResource(this.getPath() + '/cards', this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "orders", {
	        /**
	        * List, update and get payments, booking date or create and update domestic payments.
	        */
	        get: function () {
	            return new orders_1.OrdersResource(this.getPath() + '/orders', this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "securities", {
	        get: function () {
	            return new securities_1.SecuritiesResource(this.getPath() + '/securities', this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "settings", {
	        get: function () {
	            return new settings_1.SettingsResource(this.getPath() + "/settings", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "contacts", {
	        get: function () {
	            return new contacts_1.ContactsResource(this.getPath() + "/contacts", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "plugins", {
	        get: function () {
	            return new plugins_1.PluginsResource(this.getPath() + "/plugins", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "contracts", {
	        get: function () {
	            return new contracts_1.ContractsResource(this.getPath() + "/contracts", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "services", {
	        get: function () {
	            return new services_1.ServicesResource(this.getPath() + "/services", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "messages", {
	        get: function () {
	            return new messages_1.MessagesResource(this.getPath() + "/messages", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "templates", {
	        get: function () {
	            return new templates_1.TemplatesResource(this.getPath() + "/templates", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "phoneNumbers", {
	        get: function () {
	            return new phone_numbers_1.PhoneNumbersResource(this.getPath() + "/phone-numbers", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "budgets", {
	        get: function () {
	            return new budgets_1.BudgetsResource(this.getPath() + "/budgets", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "goals", {
	        get: function () {
	            return new goals_1.GoalsResource(this.getPath() + "/goals", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "promotions", {
	        get: function () {
	            return new promotions_1.PromotionsResource(this.getPath() + "/promotions", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "authorizationLimits", {
	        get: function () {
	            return new authorization_limits_1.AuthorizationLimitsResource(this.getPath() + "/authorizationLimits", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "authorizationToken", {
	        get: function () {
	            return new authorization_token_1.AuthorizationTokenResource(this.getPath() + "/auth/token/invalidate", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "bundles", {
	        get: function () {
	            return new bundles_1.BundlesResource(this.getPath() + "/bundles", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return NetbankingClient;
	}(CSCoreSDK.WebApiClient));
	exports.NetbankingClient = NetbankingClient;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = CSCoreSDK;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var balance_1 = __webpack_require__(3);
	var services_1 = __webpack_require__(4);
	var reservations_1 = __webpack_require__(5);
	var repayments_1 = __webpack_require__(6);
	var statements_1 = __webpack_require__(7);
	var subAccounts_1 = __webpack_require__(8);
	var transactions_1 = __webpack_require__(9);
	var transfer_1 = __webpack_require__(10);
	var standing_orders_1 = __webpack_require__(11);
	var direct_debits_1 = __webpack_require__(12);
	/**
	* List all accounts and get individual account instance resource
	*/
	var AccountsResource = (function (_super) {
	    __extends(AccountsResource, _super);
	    function AccountsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * List all accounts
	         */
	        this.list = function (params) {
	            // transform "sort" and "order" parameters to comma separated list from array
	            CSCoreSDK.EntityUtils.transformArrayParamsToString(params, ['sort', 'order']);
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'accounts', params, function (response) {
	                response.items.forEach(function (item) {
	                    // add convenient methods
	                    resourcifyListing(item, _this.withId(item.id), true);
	                    // transform ISO dates to native Date objects
	                    transformResponse(item);
	                });
	                return response;
	            });
	        };
	        /**
	        * Get the detail of the account with a given id
	        */
	        this.withId = function (id) {
	            return new AccountResource(id, _this.getPath(), _this._client);
	        };
	    }
	    return AccountsResource;
	}(CSCoreSDK.Resource));
	exports.AccountsResource = AccountsResource;
	/**
	* Get detail of the individual account and additional information about it
	*/
	var AccountResource = (function (_super) {
	    __extends(AccountResource, _super);
	    function AccountResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Get account detail
	        */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                // add convenienxce methods
	                resourcifyListing(response, _this, false);
	                // transform ISO dates to native Date objects
	                transformResponse(response);
	                return response;
	            });
	        };
	        /**
	        * Update account's settings.
	        */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                // add convenience methods
	                resourcifyListing(response, _this, false);
	                // transform ISO dates to native Date objects
	                transformResponse(response);
	                return response;
	            });
	        };
	    }
	    Object.defineProperty(AccountResource.prototype, "balance", {
	        /**
	        * Get information about the account's balance
	        */
	        get: function () {
	            return new balance_1.AccountBalanceResource(this.getPath() + '/balance', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "services", {
	        /**
	        * Get information about the account's services
	        */
	        get: function () {
	            return new services_1.AccountServicesResource(this.getPath() + '/services', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "reservations", {
	        /**
	        * Get information about the account's reservations
	        */
	        get: function () {
	            return new reservations_1.AccountReservationsResource(this.getPath() + '/reservations', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "repayments", {
	        /**
	        * Get information about the account's repayments
	        */
	        get: function () {
	            return new repayments_1.AccountRepaymentsResource(this.getPath() + '/repayments', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "statements", {
	        /**
	        * Get information about the account's statements
	        */
	        get: function () {
	            return new statements_1.AccountStatementsResource(this.getPath() + '/statements', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "subAccounts", {
	        /**
	        * Get information about the account's subaccounts
	        */
	        get: function () {
	            return new subAccounts_1.SubAccountsResource(this.getPath() + '/subaccounts', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "transactions", {
	        /**
	        * Get information about the account's transactions
	        */
	        get: function () {
	            return new transactions_1.AccountTransactionsResource(this.getPath() + '/transactions', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "transfer", {
	        /**
	        * Revolve a loan
	        */
	        get: function () {
	            return new transfer_1.AccountTransferResource(this.getPath() + '/transfer', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "standingOrders", {
	        get: function () {
	            return new standing_orders_1.AccountStandingOrdersResource(this.getPath() + '/standingorders', this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "directDebits", {
	        get: function () {
	            return new direct_debits_1.AccountDirectDebitsResource(this.getPath() + '/directdebits', this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return AccountResource;
	}(CSCoreSDK.InstanceResource));
	exports.AccountResource = AccountResource;
	function resourcifyListing(accountListing, account, isFromList) {
	    if (isFromList) {
	        accountListing.get = account.get;
	    }
	    accountListing.update = account.update;
	    accountListing.services = account.services;
	    accountListing.transactions = account.transactions;
	    accountListing.reservations = account.reservations;
	    accountListing.transfer = account.transfer;
	    accountListing.statements = account.statements;
	    accountListing.repayments = account.repayments;
	    accountListing.standingOrders = account.standingOrders;
	    accountListing.directDebits = account.directDebits;
	}
	function transformResponse(accountListing) {
	    if (accountListing.saving) {
	        CSCoreSDK.EntityUtils.addDatesFromISO('nextProlongation', accountListing.saving);
	    }
	    if (accountListing.loan) {
	        CSCoreSDK.EntityUtils.addDatesFromISO(['maturityDate', 'drawdownToDate', 'installmentDay', 'nextRateDate'], accountListing.loan);
	    }
	    if (accountListing.subaccounts) {
	        CSCoreSDK.EntityUtils.addDatesToItems('overdraftDueDate', accountListing, 'subaccounts');
	    }
	    CSCoreSDK.EntityUtils.addDatesFromISO('overdraftDueDate', accountListing);
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	* Get information about the account's balance
	*/
	var AccountBalanceResource = (function (_super) {
	    __extends(AccountBalanceResource, _super);
	    function AccountBalanceResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Fetches the balance and returns them in a promise
	        */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null);
	        };
	    }
	    return AccountBalanceResource;
	}(CSCoreSDK.Resource));
	exports.AccountBalanceResource = AccountBalanceResource;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	* Get information about the account's services
	*/
	var AccountServicesResource = (function (_super) {
	    __extends(AccountServicesResource, _super);
	    function AccountServicesResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	        * Fetches the services and returns them in a promise
	        */
	        this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'services', params, function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesToItems(['dateFrom', 'dateTo'], response);
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return AccountServicesResource;
	}(CSCoreSDK.Resource));
	exports.AccountServicesResource = AccountServicesResource;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	* Get information about the account's reservations
	*/
	var AccountReservationsResource = (function (_super) {
	    __extends(AccountReservationsResource, _super);
	    function AccountReservationsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Fetches the reservations and returns them in a promise
	        */
	        this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'reservations', params, function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesToItems(['creationDate', 'expirationDate'], response);
	                return response;
	            });
	        };
	    }
	    return AccountReservationsResource;
	}(CSCoreSDK.Resource));
	exports.AccountReservationsResource = AccountReservationsResource;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	* Get information about the account's repayments
	*/
	var AccountRepaymentsResource = (function (_super) {
	    __extends(AccountRepaymentsResource, _super);
	    function AccountRepaymentsResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	        * Fetches the repayments and returns them in a promise
	        */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'repayments', null).then(function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesToItems('repaymentDate', response);
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return AccountRepaymentsResource;
	}(CSCoreSDK.Resource));
	exports.AccountRepaymentsResource = AccountRepaymentsResource;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	* Get information about the account's statements
	*/
	var AccountStatementsResource = (function (_super) {
	    __extends(AccountStatementsResource, _super);
	    function AccountStatementsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Fetches the statements and returns them in a promise
	        */
	        this.list = function (params) {
	            // transform "sort" and "order" parameters to comma separated list from array
	            CSCoreSDK.EntityUtils.transformArrayParamsToString(params, ['sort', 'order']);
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'statements', params, function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesToItems('statementDate', response);
	                return response;
	            });
	        };
	        /**
	        * Downloads statements file
	        */
	        this.download = function (params) {
	            return CSCoreSDK.ResourceUtils.CallDownload(_this, 'signed/download', 'POST', params);
	        };
	    }
	    return AccountStatementsResource;
	}(CSCoreSDK.Resource));
	exports.AccountStatementsResource = AccountStatementsResource;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	* Get individual SubAccount resource
	*/
	var SubAccountsResource = (function (_super) {
	    __extends(SubAccountsResource, _super);
	    function SubAccountsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Returns individual SubAccount resource with a given id
	        */
	        this.withId = function (id) {
	            return new SubAccountResource(id, _this.getPath(), _this._client);
	        };
	    }
	    return SubAccountsResource;
	}(CSCoreSDK.Resource));
	exports.SubAccountsResource = SubAccountsResource;
	/**
	* Get information about the subaccount
	*/
	var SubAccountResource = (function (_super) {
	    __extends(SubAccountResource, _super);
	    function SubAccountResource() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(SubAccountResource.prototype, "statements", {
	        /**
	        * Get information about the subaccount's statements
	        */
	        get: function () {
	            return new SubAccountStatementsResource(this.getPath() + '/statements', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return SubAccountResource;
	}(CSCoreSDK.InstanceResource));
	exports.SubAccountResource = SubAccountResource;
	/**
	* List all subaccount's statements
	*/
	var SubAccountStatementsResource = (function (_super) {
	    __extends(SubAccountStatementsResource, _super);
	    function SubAccountStatementsResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	        * Returns all subaccount's statements in a promise
	        */
	        this.list = function (params) {
	            // transform "sort" and "order" parameters to comma separated list from array
	            CSCoreSDK.EntityUtils.transformArrayParamsToString(params, ['sort', 'order']);
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'statements', params, function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesToItems('statementDate', response);
	                return response;
	            });
	        };
	        /**
	        * Downloads statements file
	        */
	        this.download = function (params) {
	            return CSCoreSDK.ResourceUtils.CallDownload(_this, 'download', 'POST', params);
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return SubAccountStatementsResource;
	}(CSCoreSDK.Resource));
	exports.SubAccountStatementsResource = SubAccountStatementsResource;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	* Get individual AccountsTransactionsResource
	*/
	var AccountTransactionsResource = (function (_super) {
	    __extends(AccountTransactionsResource, _super);
	    function AccountTransactionsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Returns individual AccountsTransactionResource with a given id
	        */
	        this.withId = function (id) {
	            return new AccountTransactionResource(id, _this.getPath(), _this._client);
	        };
	        /**
	        * Exports transaction history into signed pdf
	        */
	        this.export = function (params) {
	            // transform "fields" parameter to comma separated list from array
	            CSCoreSDK.EntityUtils.transformArrayParamsToString(params, 'fields');
	            // transform Date objects to ISO strings
	            CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);
	            // insert 'cz' resource into the resource's path once because the api requires it in some resources
	            var path = _this.getPath().replace('/my', '/cz/my');
	            return _this._client.callApi(path + "/export", 'POST', params, null, null, 'arraybuffer');
	        };
	    }
	    return AccountTransactionsResource;
	}(CSCoreSDK.Resource));
	exports.AccountTransactionsResource = AccountTransactionsResource;
	/**
	* Allows to add or change a client's personal transaction note and mark the transaction as favorite/important for one specific transaction on selected account.
	*/
	var AccountTransactionResource = (function (_super) {
	    __extends(AccountTransactionResource, _super);
	    function AccountTransactionResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Adds, changes of marks transaction
	        */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload);
	        };
	    }
	    return AccountTransactionResource;
	}(CSCoreSDK.InstanceResource));
	exports.AccountTransactionResource = AccountTransactionResource;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	* Revolve a loan
	*/
	var AccountTransferResource = (function (_super) {
	    __extends(AccountTransferResource, _super);
	    function AccountTransferResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	        * Revolves the loan. Currently only REVOLVING_LOAN subtype is supported.
	        */
	        this.update = function (payload) {
	            // transform Date objects to ISO strings
	            CSCoreSDK.EntityUtils.transformDatesToSimpleISO('transferDate', payload);
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                // Remove signInfo from response and add SigningObject with key signing
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return AccountTransferResource;
	}(CSCoreSDK.Resource));
	exports.AccountTransferResource = AccountTransferResource;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var AccountStandingOrdersResource = (function (_super) {
	    __extends(AccountStandingOrdersResource, _super);
	    function AccountStandingOrdersResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns list of actual standing/sweep orders for accounts of the current user.
	         */
	        this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'standingOrders', params, function (response) {
	                response.items.forEach(function (item) {
	                    addDatesToStandingOrder(item);
	                    resourcifyStandingOrder(item, _this.withId(item.number));
	                });
	                return response;
	            });
	        };
	        /**
	         * Get the resource of standing order with a given id
	         */
	        this.withId = function (id) {
	            return new AccountStandingOrderResource(id, _this.getPath(), _this.getClient());
	        };
	        /**
	         * Resource for creating standing/sweep order. Once order has been signed new payments are generated and executed according its settings.
	         */
	        this.create = function (payload) {
	            CSCoreSDK.EntityUtils.transformDatesToSimpleISO(['nextExecutionDate', 'lastExecutionDate', 'startDate'], payload);
	            return CSCoreSDK.ResourceUtils.CallCreate(_this, payload).then(function (response) {
	                addDatesToStandingOrder(response);
	                resourcifyStandingOrder(response, _this.withId(response.number));
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	    }
	    return AccountStandingOrdersResource;
	}(CSCoreSDK.Resource));
	exports.AccountStandingOrdersResource = AccountStandingOrdersResource;
	var AccountStandingOrderResource = (function (_super) {
	    __extends(AccountStandingOrderResource, _super);
	    function AccountStandingOrderResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns detail of actual standing/sweep orders identified by its number.
	         */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                addDatesToStandingOrder(response);
	                resourcifyStandingOrder(response, _this);
	                return response;
	            });
	        };
	        /**
	         * This call removes existing standing/sweep order. No more payments for the order are executed after the change has been signed.
	         */
	        this.delete = function () {
	            return CSCoreSDK.ResourceUtils.CallDelete(_this, null).then(function (response) {
	                addDatesToStandingOrder(response);
	                resourcifyStandingOrder(response, _this);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	    }
	    return AccountStandingOrderResource;
	}(CSCoreSDK.InstanceResource));
	exports.AccountStandingOrderResource = AccountStandingOrderResource;
	function addDatesToStandingOrder(item) {
	    CSCoreSDK.EntityUtils.addDatesFromISO(['startDate', 'realExecutionDate', 'nextExecutionDate', 'lastExecutionDate'], item);
	    if (item.break) {
	        CSCoreSDK.EntityUtils.addDatesFromISO(['validFromDate', 'validToDate'], item.break);
	    }
	    if (item.scheduledExecutionDates && Array.isArray(item.scheduledExecutionDates)) {
	        var datesArr = item.scheduledExecutionDates.map(function (x) { return new Date(CSCoreSDK.EntityUtils.parseISODate(x)); });
	        item.scheduledExecutionDates = datesArr;
	    }
	}
	function resourcifyStandingOrder(orderListing, orderReference) {
	    orderListing.get = orderReference.get;
	    orderListing.delete = orderReference.delete;
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var AccountDirectDebitsResource = (function (_super) {
	    __extends(AccountDirectDebitsResource, _super);
	    function AccountDirectDebitsResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Resource Direct Debit List represents collection of all direct debit approvals entered by user for the specified user
	         */
	        this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'directDebits', params, function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['startDate', 'endDate', 'versionValidityDate'], response);
	                return response;
	            });
	        };
	        /**
	         * Get the resource of direct debit with a given id
	         */
	        this.withId = function (id) {
	            return new AccountDirectDebitResource(id, _this.getPath(), _this.getClient());
	        };
	        /**
	         * Resource for creating (or allowing) direct debit on certain account. Once signed it can be used by receiver party.
	         */
	        this.create = function (payload) {
	            CSCoreSDK.EntityUtils.transformDatesToSimpleISO(['startDate', 'endDate'], payload);
	            return CSCoreSDK.ResourceUtils.CallCreate(_this, payload).then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesFromISO(['startDate', 'endDate', 'versionValidityDate'], response);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return AccountDirectDebitsResource;
	}(CSCoreSDK.Resource));
	exports.AccountDirectDebitsResource = AccountDirectDebitsResource;
	var AccountDirectDebitResource = (function (_super) {
	    __extends(AccountDirectDebitResource, _super);
	    function AccountDirectDebitResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Get the single direct debits detail.
	         */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesFromISO(['startDate', 'endDate', 'versionValidityDate'], response);
	                return response;
	            });
	        };
	        /**
	         * Resource for deleting direct debit (permission) on certain account. Once signed no more transfers can be made by receiver party.
	         */
	        this.delete = function () {
	            return CSCoreSDK.ResourceUtils.CallDelete(_this, null).then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesFromISO(['startDate', 'endDate', 'versionValidityDate'], response);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	    }
	    return AccountDirectDebitResource;
	}(CSCoreSDK.InstanceResource));
	exports.AccountDirectDebitResource = AccountDirectDebitResource;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var lastLogins_1 = __webpack_require__(14);
	/**
	* Get information about the profile and past logins.
	*/
	var ProfileResource = (function (_super) {
	    __extends(ProfileResource, _super);
	    function ProfileResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns information about the profile
	         */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (profile) {
	                if (profile.lastlogin) {
	                    // transform ISO dates to native Date objects
	                    CSCoreSDK.EntityUtils.addDatesFromISO('lastlogin', profile);
	                }
	                return profile;
	            });
	        };
	    }
	    Object.defineProperty(ProfileResource.prototype, "lastLogins", {
	        /**
	         * Returns LastLoginsResource for listing past logins
	         */
	        get: function () {
	            return new lastLogins_1.LastLoginsResource(this.getPath() + '/logininfo', this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ProfileResource;
	}(CSCoreSDK.Resource));
	exports.ProfileResource = ProfileResource;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * List all past logins
	 */
	var LastLoginsResource = (function (_super) {
	    __extends(LastLoginsResource, _super);
	    function LastLoginsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns promise with a list of past logins
	         */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'lastlogin').then(function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesToItems('lastlogin', response);
	                return response;
	            });
	        };
	    }
	    return LastLoginsResource;
	}(CSCoreSDK.Resource));
	exports.LastLoginsResource = LastLoginsResource;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var delivery_1 = __webpack_require__(16);
	var transactions_1 = __webpack_require__(17);
	var actions_1 = __webpack_require__(18);
	var limits_1 = __webpack_require__(19);
	var secure3D_1 = __webpack_require__(20);
	var transfer_1 = __webpack_require__(21);
	var statements_1 = __webpack_require__(22);
	/**
	* Represents list of payment cards (either debet or credit) for current user. Every card was issued for current user or belongs to one of his accounts.
	*/
	var CardsResource = (function (_super) {
	    __extends(CardsResource, _super);
	    function CardsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * List all cards
	        */
	        this.list = function (params) {
	            // transform "sort" and "order" parameters to comma separated list from array
	            CSCoreSDK.EntityUtils.transformArrayParamsToString(params, ['sort', 'order']);
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'cards', params, function (response) {
	                response.items.forEach(function (item) {
	                    // add convenient methods to items in the list
	                    resourcifyListing(item, _this.withId(item.id), true);
	                    // transform ISO dates to native Date objects
	                    transformResponse(item);
	                });
	                return response;
	            });
	        };
	        /**
	        * Get a resource for card with a given id
	        */
	        this.withId = function (id) {
	            return new CardResource(id, _this.getPath(), _this.getClient());
	        };
	    }
	    return CardsResource;
	}(CSCoreSDK.Resource));
	exports.CardsResource = CardsResource;
	var CardResource = (function (_super) {
	    __extends(CardResource, _super);
	    function CardResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Get detail of the card
	        */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (card) {
	                // add convenient methods to items in the list
	                resourcifyListing(card, _this, false);
	                // transform ISO dates to native Date objects
	                transformResponse(card);
	                return card;
	            });
	        };
	        /**
	        * Update card's alias
	        */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (card) {
	                // add convenient methods to items in the list
	                resourcifyListing(card, _this, false);
	                // transform ISO dates to native Date objects
	                transformResponse(card);
	                return card;
	            });
	        };
	    }
	    Object.defineProperty(CardResource.prototype, "delivery", {
	        /**
	        * Get current delivery settings
	        */
	        get: function () {
	            return new delivery_1.CardDeliveryResource(this.getPath() + '/delivery', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CardResource.prototype, "transactions", {
	        /**
	        * Allows to add or change a client's personal note and mark/star the card transaction as favorite/important for one specific transaction
	        */
	        get: function () {
	            return new transactions_1.CardTransactionsResource(this.getPath() + '/transactions', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CardResource.prototype, "actions", {
	        /**
	        * Issue various actions on a single card. Currently supported actions are:
	        * reissue pin, lock card, unlock card, activate card, set automatic card replacement on, set automatic card replacement off, replacement card request
	        */
	        get: function () {
	            return new actions_1.CardActionsResource(this.getPath() + '/states', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CardResource.prototype, "limits", {
	        /**
	        * Get information about different limits
	        */
	        get: function () {
	            return new limits_1.CardLimitsResource(this.getPath() + '/card-limits', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CardResource.prototype, "secure3d", {
	        /**
	        * Get the 3D secure online shopping status
	        */
	        get: function () {
	            return new secure3D_1.CardSecure3DResource(this.getPath() + '/secure-online-shopping', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CardResource.prototype, "transfer", {
	        /**
	        * Resource for paying up credit card debt
	        */
	        get: function () {
	            return new transfer_1.CardTransferResource(this.getPath() + '/transfer', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CardResource.prototype, "accounts", {
	        /**
	        * Account resource for listing statements
	        */
	        get: function () {
	            return new statements_1.CardAccountsResource(this.getPath() + '/mainaccount', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return CardResource;
	}(CSCoreSDK.InstanceResource));
	exports.CardResource = CardResource;
	function resourcifyListing(itemListing, itemResource, isFromList) {
	    if (isFromList) {
	        itemListing.get = itemResource.get;
	    }
	    itemListing.update = itemResource.update;
	    itemListing.delivery = itemResource.delivery;
	    itemListing.transactions = itemResource.transactions;
	    itemListing.actions = itemResource.actions;
	    itemListing.limits = itemResource.limits;
	    itemListing.secure3d = itemResource.secure3d;
	    itemListing.transfer = itemResource.transfer;
	    itemListing.accounts = itemResource.accounts;
	}
	function transformResponse(item) {
	    CSCoreSDK.EntityUtils.addDatesFromISO(['expiryDate', 'validFromDate'], item);
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Get current delivery settings
	 */
	// export class CardDeliveryResource extends CSCoreSDK.Resource
	// implements CSCoreSDK.GetEnabled<DeliveryListing>, CSCoreSDK.UpdateEnabled<ChangeDeliverySettingsRequest, ChangeDeliverySettingsResponse> {
	var CardDeliveryResource = (function (_super) {
	    __extends(CardDeliveryResource, _super);
	    function CardDeliveryResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns current delivery settings
	         */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null);
	        };
	        /**
	         * Change current delivery settings
	         */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload);
	        };
	    }
	    return CardDeliveryResource;
	}(CSCoreSDK.Resource));
	exports.CardDeliveryResource = CardDeliveryResource;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	* Allows to add or change a client's personal note and mark/star the card transaction as favorite/important for one specific transaction
	*/
	var CardTransactionsResource = (function (_super) {
	    __extends(CardTransactionsResource, _super);
	    function CardTransactionsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns CardTransactionResource for a given id
	         */
	        this.withId = function (id) {
	            return new CardTransactionResource(id, _this.getPath(), _this._client);
	        };
	        /**
	         * Export transactions to PDF
	         */
	        this.export = function (params) {
	            // transform "fields" parameter to comma separated list from array
	            CSCoreSDK.EntityUtils.transformArrayParamsToString(params, 'fields');
	            // transform Date objects to ISO strings
	            CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);
	            // insert 'cz' resource into the resource's path once because the api requires it in some resources
	            var path = _this.getPath().replace('/my', '/cz/my');
	            return _this._client.callApi(path + "/export", 'POST', params, null, null, 'arraybuffer');
	        };
	    }
	    return CardTransactionsResource;
	}(CSCoreSDK.Resource));
	exports.CardTransactionsResource = CardTransactionsResource;
	/**
	 * Add or change a client's personal note and mark/star the card transaction as favorite/important
	 */
	var CardTransactionResource = (function (_super) {
	    __extends(CardTransactionResource, _super);
	    function CardTransactionResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Adds, changes of marks transaction
	        */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload);
	        };
	    }
	    return CardTransactionResource;
	}(CSCoreSDK.InstanceResource));
	exports.CardTransactionResource = CardTransactionResource;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Issue various actions on a single card.
	 */
	var CardActionsResource = (function (_super) {
	    __extends(CardActionsResource, _super);
	    function CardActionsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Issues various actions on a single card
	         */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                // Remove signInfo from response and add SigningObject with key signing
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	    }
	    return CardActionsResource;
	}(CSCoreSDK.Resource));
	exports.CardActionsResource = CardActionsResource;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	* Get information about different limits
	*/
	var CardLimitsResource = (function (_super) {
	    __extends(CardLimitsResource, _super);
	    function CardLimitsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * List all limits
	         */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'limits').then(function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesToItems('temporaryLimitExpiration', response);
	                return response;
	            });
	        };
	        /**
	         * Update individual limits
	         */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesToItems('temporaryLimitExpiration', response, 'limits');
	                // Remove signInfo from response and add SigningObject with key signing
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	    }
	    return CardLimitsResource;
	}(CSCoreSDK.Resource));
	exports.CardLimitsResource = CardLimitsResource;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Get the 3D secure online shopping status
	 */
	var CardSecure3DResource = (function (_super) {
	    __extends(CardSecure3DResource, _super);
	    function CardSecure3DResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns 3D secure online shopping status
	         */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null);
	        };
	    }
	    return CardSecure3DResource;
	}(CSCoreSDK.Resource));
	exports.CardSecure3DResource = CardSecure3DResource;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Resource for paying up credit card debt
	 */
	var CardTransferResource = (function (_super) {
	    __extends(CardTransferResource, _super);
	    function CardTransferResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Pays up the credit card debt and returns sign info
	         */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                // Remove signInfo from response and add SigningObject with key signing
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	    }
	    return CardTransferResource;
	}(CSCoreSDK.Resource));
	exports.CardTransferResource = CardTransferResource;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Account resource for listing statements
	 */
	var CardAccountsResource = (function (_super) {
	    __extends(CardAccountsResource, _super);
	    function CardAccountsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns CardAccountResource for an account with a given id
	         */
	        this.withId = function (id) {
	            return new CardAccountResource(id, _this.getPath(), _this._client);
	        };
	    }
	    return CardAccountsResource;
	}(CSCoreSDK.Resource));
	exports.CardAccountsResource = CardAccountsResource;
	/**
	 * Indidiual account resource with a given id
	 */
	var CardAccountResource = (function (_super) {
	    __extends(CardAccountResource, _super);
	    function CardAccountResource() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(CardAccountResource.prototype, "statements", {
	        /**
	         * Get statements of the account
	         */
	        get: function () {
	            return new CardStatementsResource(this.getPath() + '/statements', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return CardAccountResource;
	}(CSCoreSDK.InstanceResource));
	exports.CardAccountResource = CardAccountResource;
	/**
	 * Get statements for an account
	 */
	var CardStatementsResource = (function (_super) {
	    __extends(CardStatementsResource, _super);
	    function CardStatementsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * List all statements
	         */
	        this.list = function (params) {
	            // transform "sort" and "order" parameters to comma separated list from array
	            CSCoreSDK.EntityUtils.transformArrayParamsToString(params, ['sort', 'order']);
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'statements', params, function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesToItems('statementDate', response);
	                return response;
	            });
	        };
	        /**
	         * Download PDF with statements
	         */
	        this.download = function (params) {
	            return CSCoreSDK.ResourceUtils.CallDownload(_this, 'signed/download', 'POST', params);
	        };
	    }
	    return CardStatementsResource;
	}(CSCoreSDK.Resource));
	exports.CardStatementsResource = CardStatementsResource;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var bookingDate_1 = __webpack_require__(24);
	var domestic_1 = __webpack_require__(25);
	var limits_1 = __webpack_require__(26);
	var mobile_1 = __webpack_require__(27);
	/**
	* Get information about payments orders
	*/
	var OrdersResource = (function (_super) {
	    __extends(OrdersResource, _super);
	    function OrdersResource() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(OrdersResource.prototype, "payments", {
	        /**
	        * Returns PaymentsResource for listing, deleting and accessing other information about payments
	        */
	        get: function () {
	            return new PaymentsResource(this.getPath() + '/payments', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return OrdersResource;
	}(CSCoreSDK.Resource));
	exports.OrdersResource = OrdersResource;
	/**
	* List payments, get individual payment and other resources
	*/
	var PaymentsResource = (function (_super) {
	    __extends(PaymentsResource, _super);
	    function PaymentsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * List all payments
	        */
	        this.list = function (params) {
	            // transform "sort" and "order" parameters to comma separated list from array
	            CSCoreSDK.EntityUtils.transformArrayParamsToString(params, ['sort', 'order']);
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'order', params, function (response) {
	                response.items.forEach(function (item) {
	                    // transform ISO dates to native Date objects
	                    CSCoreSDK.EntityUtils.addDatesFromISO(['cz-orderingDate', 'executionDate', 'modificationDate', 'transferDate'], item);
	                    // Remove signInfo from response and add SigningObject with key signing
	                    CSCoreSDK.SigningUtils.createSigningObject(item, _this.getClient(), _this.getClient().getPath() + "/orders/payments/" + item.id);
	                    // add convenient get and delete methods for fetching order's detail and removing order
	                    resourcifyListing(item, _this.withId(item.id));
	                });
	                return response;
	            });
	        };
	        /**
	        * Get individual payment with a given id
	        */
	        this.withId = function (id) {
	            return new PaymentResource(id, _this.getPath(), _this._client);
	        };
	    }
	    Object.defineProperty(PaymentsResource.prototype, "bookingDate", {
	        /**
	        * Get currently available booking date
	        */
	        get: function () {
	            return new bookingDate_1.PaymentBookingDateResource(this.getPath() + '/bookingdate', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PaymentsResource.prototype, "domestic", {
	        /**
	        * Create domestic payment order
	        */
	        get: function () {
	            return new domestic_1.PaymentsDomesticResource(this.getPath() + '/domestic', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PaymentsResource.prototype, "limits", {
	        /**
	        * Get remaining amounts for payment orders
	        */
	        get: function () {
	            return new limits_1.PaymentLimitsResource(this.getPath() + '/limits', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PaymentsResource.prototype, "mobile", {
	        /**
	        * Recharging the credit available on prepaid cards provided by Vodafone, T-Mobile or O2.
	        */
	        get: function () {
	            return new mobile_1.PaymentMobileResource(this.getPath() + '/mobile', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return PaymentsResource;
	}(CSCoreSDK.Resource));
	exports.PaymentsResource = PaymentsResource;
	/**
	* Individual Payment order resource
	*/
	var PaymentResource = (function (_super) {
	    __extends(PaymentResource, _super);
	    function PaymentResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Get detail of the payment
	        */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (payment) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesFromISO(['cz-orderingDate', 'executionDate', 'modificationDate', 'transferDate'], payment);
	                // Remove signInfo from response and add SigningObject with key signing
	                CSCoreSDK.SigningUtils.createSigningObject(payment, _this.getClient(), _this.getClient().getPath() + "/orders/payments/" + payment.id);
	                return payment;
	            });
	        };
	        /**
	        * Remove payment
	        */
	        this.delete = function () {
	            return CSCoreSDK.ResourceUtils.CallDelete(_this, null);
	        };
	    }
	    return PaymentResource;
	}(CSCoreSDK.InstanceResource));
	exports.PaymentResource = PaymentResource;
	function resourcifyListing(paymentListing, paymentResource) {
	    paymentListing.get = paymentResource.get;
	    paymentListing.delete = paymentResource.delete;
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	* Get currently available booking date
	*/
	var PaymentBookingDateResource = (function (_super) {
	    __extends(PaymentBookingDateResource, _super);
	    function PaymentBookingDateResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Returns current available booking date based on the provided account and optional payment order category parameters
	        */
	        this.update = function (payload) {
	            // make copy of payload
	            payload = JSON.parse(JSON.stringify(payload));
	            // get account's ID from passed object
	            var params = {
	                accountId: payload.accountId
	            };
	            delete payload.accountId;
	            return CSCoreSDK.ResourceUtils.CallApiWithSuffix(_this, null, "PUT", params, payload).then(function (bookingDate) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesFromISO('bookingDate', bookingDate);
	                return bookingDate;
	            });
	        };
	    }
	    return PaymentBookingDateResource;
	}(CSCoreSDK.Resource));
	exports.PaymentBookingDateResource = PaymentBookingDateResource;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	* Create domestic payment order
	*/
	var PaymentsDomesticResource = (function (_super) {
	    __extends(PaymentsDomesticResource, _super);
	    function PaymentsDomesticResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Creates domestic payment order and returns it in promise
	        */
	        this.create = function (payload) {
	            // transform Date object to ISO strings
	            CSCoreSDK.EntityUtils.transformDatesToISO('transferDate', payload);
	            return CSCoreSDK.ResourceUtils.CallCreate(_this, payload).then(function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesFromISO(['cz-orderingDate', 'executionDate', 'modificationDate', 'transferDate'], response);
	                // Remove signInfo from response and add SigningObject with key signing
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getClient().getPath() + "/orders/payments/" + response.id);
	                return response;
	            });
	        };
	        /**
	        * Returns PaymentDomesticResource resource for updating domestic payment
	        */
	        this.withId = function (id) {
	            return new PaymentDomesticResource(id, _this.getPath(), _this.getClient());
	        };
	    }
	    return PaymentsDomesticResource;
	}(CSCoreSDK.Resource));
	exports.PaymentsDomesticResource = PaymentsDomesticResource;
	/**
	* Update domestic payment
	*/
	var PaymentDomesticResource = (function (_super) {
	    __extends(PaymentDomesticResource, _super);
	    function PaymentDomesticResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Updates domestic payment and returns it in promise
	        */
	        this.update = function (payload) {
	            // add ID to payload from resource id property
	            payload.id = _this._id;
	            // transform Date object to ISO strings
	            CSCoreSDK.EntityUtils.transformDatesToISO('transferDate', payload);
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesFromISO(['cz-orderingDate', 'executionDate', 'modificationDate', 'transferDate'], response);
	                // Remove signInfo from response and add SigningObject with key signing
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getClient().getPath() + "/orders/payments/" + response.id);
	                return response;
	            });
	        };
	    }
	    return PaymentDomesticResource;
	}(CSCoreSDK.InstanceResource));
	exports.PaymentDomesticResource = PaymentDomesticResource;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	* Get remaining amounts for payment orders
	*/
	var PaymentLimitsResource = (function (_super) {
	    __extends(PaymentLimitsResource, _super);
	    function PaymentLimitsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * List all limits for payment orders
	        */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'remainingLimits', null);
	        };
	    }
	    return PaymentLimitsResource;
	}(CSCoreSDK.Resource));
	exports.PaymentLimitsResource = PaymentLimitsResource;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	/**
	* Recharging the credit available on prepaid cards provided by Vodafone, T-Mobile or O2.
	*/
	var PaymentMobileResource = (function (_super) {
	    __extends(PaymentMobileResource, _super);
	    function PaymentMobileResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	        * Recharge the credit on prepaid card
	        */
	        this.create = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallCreate(_this, payload).then(function (response) {
	                // Remove signInfo from response and add SigningObject with key signing
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return PaymentMobileResource;
	}(CSCoreSDK.Resource));
	exports.PaymentMobileResource = PaymentMobileResource;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var transactions_1 = __webpack_require__(29);
	var SecuritiesResource = (function (_super) {
	    __extends(SecuritiesResource, _super);
	    function SecuritiesResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns list of securities accounts for current user. Securities account represents virtual account which holds securities titles and its shares (funds, bonds, etc.).
	         */
	        this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'securitiesAccounts', params, function (response) {
	                transformDatesInSubSecAccounts(response);
	                response.items.forEach(function (sec) {
	                    resourcifySecurity(sec, _this.withId(sec.id));
	                });
	                return response;
	            });
	        };
	        /**
	         * Get resource of security with a given id
	         */
	        this.withId = function (id) {
	            return new SecurityResource(id, _this.getPath(), _this.getClient());
	        };
	    }
	    return SecuritiesResource;
	}(CSCoreSDK.Resource));
	exports.SecuritiesResource = SecuritiesResource;
	var SecurityResource = (function (_super) {
	    __extends(SecurityResource, _super);
	    function SecurityResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Get a single securities account with all its details. Securities account represents virtual account which holds securities titles and its shares (funds, bonds, etc.).
	         */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                transformDatesInSubSecAccounts(response);
	                resourcifySecurity(response, _this);
	                return response;
	            });
	        };
	        /**
	         * Allows to change a limited set of securities account-settings of one specific contract. Currently only the field alias can be changed. Change only to alias field must not be signed, but response is ready also for signing process.
	         */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                transformDatesInSubSecAccounts(response);
	                resourcifySecurity(response, _this);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	    }
	    Object.defineProperty(SecurityResource.prototype, "transactions", {
	        /**
	         * Returns security transactions resource
	         */
	        get: function () {
	            return new transactions_1.SecurityTransactionsResource(this.getPath() + "/transactions", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return SecurityResource;
	}(CSCoreSDK.InstanceResource));
	exports.SecurityResource = SecurityResource;
	function transformDatesInSubSecAccounts(response) {
	    if (response.subSecAccounts && Array.isArray(response.subSecAccounts)) {
	        response.subSecAccounts.forEach(function (acc) {
	            CSCoreSDK.EntityUtils.addDatesFromISO('lastPriceDate', acc);
	        });
	    }
	}
	function resourcifySecurity(security, securityReference) {
	    security.transactions = securityReference.transactions;
	    security.get = securityReference.get;
	    security.update = securityReference.update;
	}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var SecurityTransactionsResource = (function (_super) {
	    __extends(SecurityTransactionsResource, _super);
	    function SecurityTransactionsResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Get resource of security transaction with a given id
	         */
	        this.withId = function (id) {
	            return new SecurityTransactionResource(id, _this.getPath(), _this.getClient());
	        };
	        /**
	         * Export transaction history into signed pdf.
	         */
	        this.export = function (params) {
	            // transform "fields" parameter to comma separated list from array
	            CSCoreSDK.EntityUtils.transformArrayParamsToString(params, 'fields');
	            // transform Date objects to ISO strings
	            CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);
	            return _this._client.callApi(_this.getPath() + "/export", 'POST', params, null, null, 'arraybuffer');
	        };
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return SecurityTransactionsResource;
	}(CSCoreSDK.Resource));
	exports.SecurityTransactionsResource = SecurityTransactionsResource;
	var SecurityTransactionResource = (function (_super) {
	    __extends(SecurityTransactionResource, _super);
	    function SecurityTransactionResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Allows to add or change a client's personal note and mark/star the transaction as favorite/important for one specific transaction on selected product.
	         */
	        this.update = function (payload) {
	            payload.id = _this._id;
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	    }
	    return SecurityTransactionResource;
	}(CSCoreSDK.InstanceResource));
	exports.SecurityTransactionResource = SecurityTransactionResource;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var SettingsResource = (function (_super) {
	    __extends(SettingsResource, _super);
	    function SettingsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns basic user settings.
	         */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null);
	        };
	        /**
	         * Change user settings. Currently only language can be changed by this endpoint.
	         */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	    }
	    return SettingsResource;
	}(CSCoreSDK.Resource));
	exports.SettingsResource = SettingsResource;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var ContactsResource = (function (_super) {
	    __extends(ContactsResource, _super);
	    function ContactsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Resource represents list of contact information for current user. It can contain addresses, phones and email addresses.
	         */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'contacts');
	        };
	        /**
	         * Get the resource of contact with a given id
	         */
	        this.withId = function (id) {
	            return new ContactResource(id, _this.getPath(), _this.getClient());
	        };
	    }
	    return ContactsResource;
	}(CSCoreSDK.Resource));
	exports.ContactsResource = ContactsResource;
	var ContactResource = (function (_super) {
	    __extends(ContactResource, _super);
	    function ContactResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Resource represents one specific contact information identified by its id. It can be address, phone or email address.
	         */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null);
	        };
	    }
	    return ContactResource;
	}(CSCoreSDK.InstanceResource));
	exports.ContactResource = ContactResource;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var PluginsResource = (function (_super) {
	    __extends(PluginsResource, _super);
	    function PluginsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns list of available plugins for current user. Plugin is application functionality which can be enabled/disabled by user.
	         */
	        this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'plugins', params, function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['validUntil', 'dateOfActivation'], response);
	                return response;
	            });
	        };
	        /**
	         * Returns resource of plugin with a given id
	         */
	        this.withId = function (id) {
	            return new PluginResource(id, _this.getPath(), _this.getClient());
	        };
	    }
	    return PluginsResource;
	}(CSCoreSDK.Resource));
	exports.PluginsResource = PluginsResource;
	var PluginResource = (function (_super) {
	    __extends(PluginResource, _super);
	    function PluginResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Activation and deactivation of the specific plugin. You can also change settlement account for given plugin and current user.
	         */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesFromISO(['validUntil', 'dateOfActivation'], response);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	    }
	    return PluginResource;
	}(CSCoreSDK.InstanceResource));
	exports.PluginResource = PluginResource;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var buildings_1 = __webpack_require__(34);
	var pensions_1 = __webpack_require__(37);
	var insurances_1 = __webpack_require__(38);
	var loyalty_1 = __webpack_require__(48);
	var ContractsResource = (function (_super) {
	    __extends(ContractsResource, _super);
	    function ContractsResource() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(ContractsResource.prototype, "buildings", {
	        /**
	         * Get buildings contracts resource
	         */
	        get: function () {
	            return new buildings_1.BuildingsContractsResource(this.getPath() + "/buildings", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ContractsResource.prototype, "pensions", {
	        /**
	         * Get pensions contracts resource
	         */
	        get: function () {
	            return new pensions_1.PensionsContractsResource(this.getPath() + "/pensions", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ContractsResource.prototype, "insurances", {
	        /**
	         * Get insurances contracts resource
	         */
	        get: function () {
	            return new insurances_1.InsurancesContractsResource(this.getPath() + "/insurances", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ContractsResource.prototype, "loyalty", {
	        /**
	         * Get loyalty contracts resource
	         */
	        get: function () {
	            return new loyalty_1.LoyaltyContractsResource(this.getPath() + "/loyalty", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ContractsResource;
	}(CSCoreSDK.Resource));
	exports.ContractsResource = ContractsResource;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var services_1 = __webpack_require__(35);
	var transactions_1 = __webpack_require__(36);
	var BuildingsContractsResource = (function (_super) {
	    __extends(BuildingsContractsResource, _super);
	    function BuildingsContractsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Resource represents list of building savings for current user. It contains building savings and loans from building savings as well.
	         */
	        this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'buildings', params, function (response) {
	                response.items.forEach(function (item) {
	                    resourcifyBuildingsContracts(item, _this.withId(item.id));
	                    transformDates(item);
	                });
	                return response;
	            });
	        };
	        /**
	         * Get the resource of buildings contract with a given id
	         */
	        this.withId = function (id) {
	            return new BuildingsContractResource(id, _this.getPath(), _this.getClient());
	        };
	    }
	    return BuildingsContractsResource;
	}(CSCoreSDK.Resource));
	exports.BuildingsContractsResource = BuildingsContractsResource;
	var BuildingsContractResource = (function (_super) {
	    __extends(BuildingsContractResource, _super);
	    function BuildingsContractResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Resource represents one building saving product identified by it's identifier. It can be building saving or loan from building saving.
	         */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                resourcifyBuildingsContracts(response, _this);
	                transformDates(response);
	                return response;
	            });
	        };
	        /**
	         * Allows to change a limited set of building savings contract-settings of one specific contract. Currently only the field alias can be changed. Change only to alias field must not be signed, but response is ready also for signing process.
	         */
	        this.update = function (payload) {
	            payload.id = _this._id;
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                resourcifyBuildingsContracts(response, _this);
	                transformDates(response);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	    }
	    Object.defineProperty(BuildingsContractResource.prototype, "services", {
	        /**
	         * Get buildings contracts services resource
	         */
	        get: function () {
	            return new services_1.BuildingsContractsServicesResource(this.getPath() + "/services", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BuildingsContractResource.prototype, "transactions", {
	        /**
	         * Get buildings contracts transactions resource
	         */
	        get: function () {
	            return new transactions_1.ContractsTransactionsResource(this.getPath().replace('/my', '/cz/my') + "/transactions", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return BuildingsContractResource;
	}(CSCoreSDK.InstanceResource));
	exports.BuildingsContractResource = BuildingsContractResource;
	function resourcifyBuildingsContracts(contract, contractReference) {
	    contract.get = contractReference.get;
	    contract.update = contractReference.update;
	    contract.services = contractReference.services;
	    contract.transactions = contractReference.transactions;
	}
	function transformDates(contract) {
	    if (contract.saving) {
	        CSCoreSDK.EntityUtils.addDatesFromISO('expiryDate', contract.saving);
	    }
	    if (contract.loan) {
	        CSCoreSDK.EntityUtils.addDatesFromISO(['interestRateFromDate', 'interestRateToDate'], contract.saving);
	    }
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var BuildingsContractsServicesResource = (function (_super) {
	    __extends(BuildingsContractsServicesResource, _super);
	    function BuildingsContractsServicesResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Returns list of services which are connected or arranged for building saving product instance.
	         */
	        this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'services', params, function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['dateFrom', 'dateTo'], response);
	                return response;
	            });
	        };
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return BuildingsContractsServicesResource;
	}(CSCoreSDK.Resource));
	exports.BuildingsContractsServicesResource = BuildingsContractsServicesResource;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var ContractsTransactionsResource = (function (_super) {
	    __extends(ContractsTransactionsResource, _super);
	    function ContractsTransactionsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Get contract transaction resource with a given id
	         */
	        this.withId = function (id) {
	            return new ContractsTransactionResource(id, _this.getPath(), _this.getClient());
	        };
	        /**
	         * Export transaction history into signed pdf.
	         */
	        this.export = function (params) {
	            // transform "fields" parameter to comma separated list from array
	            CSCoreSDK.EntityUtils.transformArrayParamsToString(params, 'fields');
	            // transform Date objects to ISO strings
	            CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);
	            return _this._client.callApi(_this.getPath() + "/export", 'POST', params, null, null, 'arraybuffer');
	        };
	    }
	    return ContractsTransactionsResource;
	}(CSCoreSDK.Resource));
	exports.ContractsTransactionsResource = ContractsTransactionsResource;
	var ContractsTransactionResource = (function (_super) {
	    __extends(ContractsTransactionResource, _super);
	    function ContractsTransactionResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Allows to add or change a client's personal note and mark/star the transaction as favorite/important for one specific transaction on selected product.
	         */
	        this.update = function (payload) {
	            payload.id = _this._id;
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	    }
	    return ContractsTransactionResource;
	}(CSCoreSDK.InstanceResource));
	exports.ContractsTransactionResource = ContractsTransactionResource;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var transactions_1 = __webpack_require__(36);
	var PensionsContractsResource = (function (_super) {
	    __extends(PensionsContractsResource, _super);
	    function PensionsContractsResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Returns list of pension products which belongs to current user. This includes Pension Savings, Supplementary Pension Insurance and Supplementary Pension Savings.
	         */
	        this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'pensions', params, function (response) {
	                response.items.forEach(function (item) {
	                    transformDates(item);
	                    resourcifyPension(item, _this.withId(item.id));
	                });
	                return response;
	            });
	        };
	        /**
	         * Get the resource of pension contract with a given id
	         */
	        this.withId = function (id) {
	            return new PensionsContractResource(id, _this.getPath(), _this.getClient());
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return PensionsContractsResource;
	}(CSCoreSDK.Resource));
	exports.PensionsContractsResource = PensionsContractsResource;
	var PensionsContractResource = (function (_super) {
	    __extends(PensionsContractResource, _super);
	    function PensionsContractResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns detail of pension product which belongs to current user. This can be Pension Saving, Supplementary Pension Insurance and Supplementary Pension Saving.
	         */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                transformDates(response);
	                resourcifyPension(response, _this);
	                return response;
	            });
	        };
	        /**
	         * Allows to change a limited set of pension contract-settings of one specific contract. Currently only the field alias can be changed. Change only to alias field must not be signed, but response is ready also for signing process.
	         */
	        this.update = function (payload) {
	            payload.id = _this._id;
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                transformDates(response);
	                resourcifyPension(response, _this);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	    }
	    Object.defineProperty(PensionsContractResource.prototype, "transactions", {
	        /**
	         * Returns transactions resource for pension contract
	         */
	        get: function () {
	            return new transactions_1.ContractsTransactionsResource(this.getPath() + "/transactions", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return PensionsContractResource;
	}(CSCoreSDK.InstanceResource));
	exports.PensionsContractResource = PensionsContractResource;
	function transformDates(item) {
	    CSCoreSDK.EntityUtils.addDatesFromISO(['signingDate', 'validFrom', 'validTo'], item);
	    if (item.productAccount) {
	        CSCoreSDK.EntityUtils.addDatesFromISO('date', item.productAccount);
	    }
	    if (Array.isArray(item.beneficiaries)) {
	        item.beneficiaries.forEach(function (x) {
	            CSCoreSDK.EntityUtils.addDatesFromISO('birthDate', x);
	        });
	    }
	}
	function resourcifyPension(pension, pensionReference) {
	    pension.get = pensionReference.get;
	    pension.update = pensionReference.update;
	    pension.transactions = pensionReference.transactions;
	}


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var funds_1 = __webpack_require__(39);
	var beneficiaries_1 = __webpack_require__(40);
	var insurees_1 = __webpack_require__(41);
	var payments_1 = __webpack_require__(42);
	var services_1 = __webpack_require__(43);
	var events_1 = __webpack_require__(44);
	var tax_benefits_1 = __webpack_require__(45);
	var strategies_1 = __webpack_require__(46);
	var transfer_1 = __webpack_require__(47);
	var InsurancesContractsResource = (function (_super) {
	    __extends(InsurancesContractsResource, _super);
	    function InsurancesContractsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns list of life insurances for current user.
	         */
	        this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'insurances', params, function (response) {
	                response.items.forEach(function (item) {
	                    transformDates(item);
	                    resourcifyInsurance(item, _this.withId(item.id));
	                });
	                return response;
	            });
	        };
	        /**
	         * Get the resource of insurance contracts with a given id
	         */
	        this.withId = function (id) {
	            return new InsurancesContractResource(id, _this.getPath(), _this.getClient());
	        };
	    }
	    return InsurancesContractsResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractsResource = InsurancesContractsResource;
	var InsurancesContractResource = (function (_super) {
	    __extends(InsurancesContractResource, _super);
	    function InsurancesContractResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns detail of the life insurance
	         */
	        this.get = function () {
	            return _this._client.callApi(_this.getPath().replace('/my', '/cz/my') + "/detail", 'GET').then(function (response) {
	                transformDates(response);
	                resourcifyInsurance(response, _this);
	                return response;
	            });
	        };
	        /**
	         * Allows to change a limited set of insurance settings of one specific contract. Currently only the field alias can be changed. Change only to alias field must not be signed, but response is ready also for signing process.
	         */
	        this.update = function (payload) {
	            payload.id = _this._id;
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                transformDates(response);
	                resourcifyInsurance(response, _this);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	    }
	    Object.defineProperty(InsurancesContractResource.prototype, "funds", {
	        /**
	         * Returns funds resource for insurance contract
	         */
	        get: function () {
	            return new funds_1.InsurancesContractFundsResource(this.getPath() + "/funds", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InsurancesContractResource.prototype, "beneficiaries", {
	        /**
	         * Returns beneficiaries resource for insurance contract
	         */
	        get: function () {
	            return new beneficiaries_1.InsurancesContractBeneficiariesResource(this.getPath() + "/beneficiaries", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InsurancesContractResource.prototype, "insurees", {
	        /**
	         * Returns insurees resource for insurance contract
	         */
	        get: function () {
	            return new insurees_1.InsurancesContractInsureesResource(this.getPath() + "/insurees", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InsurancesContractResource.prototype, "payments", {
	        /**
	         * Returns payments resource for insurance contract
	         */
	        get: function () {
	            return new payments_1.InsurancesContractPaymentsResource(this.getPath() + "/payments", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InsurancesContractResource.prototype, "services", {
	        /**
	         * Returns services resource for insurance contract
	         */
	        get: function () {
	            return new services_1.InsurancesContractServicesResource(this.getPath() + "/services", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InsurancesContractResource.prototype, "events", {
	        /**
	         * Returns events resource for insurance contract
	         */
	        get: function () {
	            return new events_1.InsurancesContractEventsResource(this.getPath() + "/events", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InsurancesContractResource.prototype, "taxBenefits", {
	        /**
	         * Returns taxBenefits resource for insurance contract
	         */
	        get: function () {
	            return new tax_benefits_1.InsurancesContractTaxBenefitsResource(this.getPath() + "/taxBenefits", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InsurancesContractResource.prototype, "strategies", {
	        /**
	         * Returns strategies resource for insurance contract
	         */
	        get: function () {
	            return new strategies_1.InsurancesContractStrategiesResource(this.getPath() + "/strategies", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InsurancesContractResource.prototype, "transfer", {
	        /**
	         * Returns transfer resource for insurance contract
	         */
	        get: function () {
	            return new transfer_1.InsurancesContractTransferResource(this.getPath() + "/transfer", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return InsurancesContractResource;
	}(CSCoreSDK.InstanceResource));
	exports.InsurancesContractResource = InsurancesContractResource;
	function transformDates(item) {
	    if (item.life) {
	        CSCoreSDK.EntityUtils.addDatesFromISO(['contractEndDate', 'contractStartDate', 'contractTerminationDate', 'lastPremiumDate', 'premiumLastPaid'], item.life);
	    }
	}
	function resourcifyInsurance(insurance, insuranceReference) {
	    insurance.get = insuranceReference.get;
	    insurance.update = insuranceReference.update;
	    insurance.funds = insuranceReference.funds;
	    insurance.beneficiaries = insuranceReference.beneficiaries;
	    insurance.insurees = insuranceReference.insurees;
	    insurance.payments = insuranceReference.payments;
	    insurance.services = insuranceReference.services;
	    insurance.events = insuranceReference.events;
	    insurance.taxBenefits = insuranceReference.taxBenefits;
	    insurance.strategies = insuranceReference.strategies;
	    insurance.transfer = insuranceReference.transfer;
	}


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var InsurancesContractFundsResource = (function (_super) {
	    __extends(InsurancesContractFundsResource, _super);
	    function InsurancesContractFundsResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Returns detail of distribution of capital value into funds.
	         */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'funds', null);
	        };
	        /**
	         * Change the distribution of capital value into funds.
	         */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return InsurancesContractFundsResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractFundsResource = InsurancesContractFundsResource;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var InsurancesContractBeneficiariesResource = (function (_super) {
	    __extends(InsurancesContractBeneficiariesResource, _super);
	    function InsurancesContractBeneficiariesResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Returns list of beneficiaries related to the insurance contract.
	         */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'beneficiaries', null).then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['birthdate'], response);
	                return response;
	            });
	        };
	        /**
	         * Change beneficiaries and distribution of insurance among beneficiaries.
	         */
	        this.update = function (payload) {
	            if (payload && Array.isArray(payload.beneficiaries)) {
	                payload.beneficiaries.forEach(function (x) {
	                    CSCoreSDK.EntityUtils.transformDatesToSimpleISO(['birthdate'], x);
	                });
	            }
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['birthdate'], response, 'beneficiaries');
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return InsurancesContractBeneficiariesResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractBeneficiariesResource = InsurancesContractBeneficiariesResource;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var InsurancesContractInsureesResource = (function (_super) {
	    __extends(InsurancesContractInsureesResource, _super);
	    function InsurancesContractInsureesResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Returns list of insurees related to the insurance contract.
	         */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'insurees');
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return InsurancesContractInsureesResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractInsureesResource = InsurancesContractInsureesResource;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var InsurancesContractPaymentsResource = (function (_super) {
	    __extends(InsurancesContractPaymentsResource, _super);
	    function InsurancesContractPaymentsResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Returns list of life insurance payments. List contains one upcoming payment and payments history for 2 years.
	         */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'payments').then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['transactionDate', 'instructionFrom', 'instructionTo'], response);
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return InsurancesContractPaymentsResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractPaymentsResource = InsurancesContractPaymentsResource;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var InsurancesContractServicesResource = (function (_super) {
	    __extends(InsurancesContractServicesResource, _super);
	    function InsurancesContractServicesResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Returns list of services for the life insurance
	         */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'services').then(function (response) {
	                response.items.forEach(function (x) {
	                    transformDates(x);
	                });
	                return response;
	            });
	        };
	        /**
	         * Allows activation of risk sports insurance.
	         */
	        this.activateRiskSports = function (payload) {
	            CSCoreSDK.EntityUtils.transformDatesToSimpleISO(['dateFrom', 'dateTo'], payload);
	            return CSCoreSDK.ResourceUtils.CallUpdateWithSuffix(_this, 'riskSportsActivation', payload).then(function (response) {
	                transformDates(response);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        /**
	         * Allows deactivation of risk sports insurance.
	         */
	        this.deactivateRiskSports = function (payload) {
	            CSCoreSDK.EntityUtils.transformDatesToSimpleISO(['dateFrom', 'dateTo'], payload);
	            return CSCoreSDK.ResourceUtils.CallUpdateWithSuffix(_this, 'riskSportsDeactivation', payload).then(function (response) {
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return InsurancesContractServicesResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractServicesResource = InsurancesContractServicesResource;
	function transformDates(response) {
	    CSCoreSDK.EntityUtils.addDatesFromISO(['dateFrom', 'dateTo'], response);
	}


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var InsurancesContractEventsResource = (function (_super) {
	    __extends(InsurancesContractEventsResource, _super);
	    function InsurancesContractEventsResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Returns list of events for the life insurance
	         */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'events').then(function (response) {
	                response.items.forEach(function (item) {
	                    CSCoreSDK.EntityUtils.addDatesFromISO(['substateDate', 'processingDate', 'creationDate'], item);
	                    if (item.indemnities && Array.isArray(item.indemnities)) {
	                        item.indemnities.forEach(function (indemnity) {
	                            CSCoreSDK.EntityUtils.addDatesFromISO('paymentDate', indemnity);
	                        });
	                    }
	                });
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return InsurancesContractEventsResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractEventsResource = InsurancesContractEventsResource;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var InsurancesContractTaxBenefitsResource = (function (_super) {
	    __extends(InsurancesContractTaxBenefitsResource, _super);
	    function InsurancesContractTaxBenefitsResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Returns tax benefits for the life insurance
	         */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null);
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return InsurancesContractTaxBenefitsResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractTaxBenefitsResource = InsurancesContractTaxBenefitsResource;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var InsurancesContractStrategiesResource = (function (_super) {
	    __extends(InsurancesContractStrategiesResource, _super);
	    function InsurancesContractStrategiesResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Returns list of strategies with corresponsing funds allocation for the life insurance
	         */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'strategies');
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return InsurancesContractStrategiesResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractStrategiesResource = InsurancesContractStrategiesResource;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var InsurancesContractTransferResource = (function (_super) {
	    __extends(InsurancesContractTransferResource, _super);
	    function InsurancesContractTransferResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Creates insurance transfer - premium payment, extra deposit or recommended deposit.
	         */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return InsurancesContractTransferResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractTransferResource = InsurancesContractTransferResource;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var LoyaltyContractsResource = (function (_super) {
	    __extends(LoyaltyContractsResource, _super);
	    function LoyaltyContractsResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Get data about iBod account of the current client.
	         */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesFromISO('exportDate', response);
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return LoyaltyContractsResource;
	}(CSCoreSDK.Resource));
	exports.LoyaltyContractsResource = LoyaltyContractsResource;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var ServicesResource = (function (_super) {
	    __extends(ServicesResource, _super);
	    function ServicesResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Returns possibly empty list of services for current user. This resource represents only services which are not bound to any product.
	         */
	        this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'services', params, function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['dateFrom', 'dateTo'], response);
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return ServicesResource;
	}(CSCoreSDK.Resource));
	exports.ServicesResource = ServicesResource;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var mandatory_1 = __webpack_require__(51);
	var attachments_1 = __webpack_require__(52);
	var MessagesResource = (function (_super) {
	    __extends(MessagesResource, _super);
	    function MessagesResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Get all messages for current user generated by bank itself. Message can be read or unread, mandatory and non-mandatory. This call might return different messages based on appId of the caller (for example, some messages might be specific to an application).
	         */
	        this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'messages', params, function (response) {
	                response.items.forEach(function (item) {
	                    transformDates(item);
	                    resourcifyMessages(item, _this.withId(item.id));
	                });
	                return response;
	            });
	        };
	        /**
	         * Get the resource of message with a given id
	         */
	        this.withId = function (id) {
	            return new MessageResource(id, _this.getPath(), _this.getClient());
	        };
	    }
	    Object.defineProperty(MessagesResource.prototype, "mandatory", {
	        /**
	         * Get messages mandatory resource
	         */
	        get: function () {
	            return new mandatory_1.MessagesMandatoryResource(this.getPath() + "/mandatory", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return MessagesResource;
	}(CSCoreSDK.Resource));
	exports.MessagesResource = MessagesResource;
	var MessageResource = (function (_super) {
	    __extends(MessageResource, _super);
	    function MessageResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Get one specific messages for current user generated by bank itself. Message can be read or unread, mandatory and non-mandatory.
	         */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                transformDates(response);
	                resourcifyMessages(response, _this);
	                return response;
	            });
	        };
	        /**
	         * After message has been read by user it should be marked accordingly by this endpoint.
	         */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload);
	        };
	        /**
	         * Resource for deleting message by its identifier. Only read messages can be deleted.
	         */
	        this.delete = function () {
	            return CSCoreSDK.ResourceUtils.CallDelete(_this, null);
	        };
	    }
	    Object.defineProperty(MessageResource.prototype, "attachments", {
	        /**
	         * Get messages attachments resource
	         */
	        get: function () {
	            return new attachments_1.MessageAttachmentsResource(this.getPath() + "/attachments", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return MessageResource;
	}(CSCoreSDK.InstanceResource));
	exports.MessageResource = MessageResource;
	function transformDates(item) {
	    CSCoreSDK.EntityUtils.addDatesFromISO(['date'], item);
	}
	function resourcifyMessages(message, messageReference) {
	    message.get = messageReference.get;
	    message.update = messageReference.update;
	    message.delete = messageReference.delete;
	    // Convenience download
	}


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var MessagesMandatoryResource = (function (_super) {
	    __extends(MessagesMandatoryResource, _super);
	    function MessagesMandatoryResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns all mandatory messages. This call might return different messages based on appId of the caller (for example, some messages might be specific to an application). Which messages can be seen by which application can be configured on the presto server side.
	         */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'messages').then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['date'], response);
	                return response;
	            });
	        };
	    }
	    return MessagesMandatoryResource;
	}(CSCoreSDK.Resource));
	exports.MessagesMandatoryResource = MessagesMandatoryResource;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var MessageAttachmentsResource = (function (_super) {
	    __extends(MessageAttachmentsResource, _super);
	    function MessageAttachmentsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Get the resource of attachments
	         */
	        this.withId = function (id) {
	            return new MessageAttachmentResource(id, _this.getPath(), _this.getClient());
	        };
	    }
	    return MessageAttachmentsResource;
	}(CSCoreSDK.Resource));
	exports.MessageAttachmentsResource = MessageAttachmentsResource;
	var MessageAttachmentResource = (function (_super) {
	    __extends(MessageAttachmentResource, _super);
	    function MessageAttachmentResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Downloads attachment file. The binary representation of an attachment file, with a “Content-Disposition” header of type attachment (including the filename), in order to instruct the browser to open a save dialog.
	         */
	        this.download = function () {
	            return CSCoreSDK.ResourceUtils.CallDownload(_this, null, 'POST');
	        };
	    }
	    return MessageAttachmentResource;
	}(CSCoreSDK.InstanceResource));
	exports.MessageAttachmentResource = MessageAttachmentResource;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var TemplatesResource = (function (_super) {
	    __extends(TemplatesResource, _super);
	    function TemplatesResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * List of payment templates for current user.
	         */
	        this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'templates', params, function (response) {
	                response.items.forEach(function (item) {
	                    resourcifyTemplates(item, _this.withId(item.id));
	                });
	                return response;
	            });
	        };
	        /**
	         * Get resource for template with a given id
	         */
	        this.withId = function (id) {
	            return new TemplateResource(id, _this.getPath(), _this.getClient());
	        };
	    }
	    return TemplatesResource;
	}(CSCoreSDK.Resource));
	exports.TemplatesResource = TemplatesResource;
	var TemplateResource = (function (_super) {
	    __extends(TemplateResource, _super);
	    function TemplateResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Get payment template detail
	         */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                resourcifyTemplates(response, _this);
	                return response;
	            });
	        };
	    }
	    return TemplateResource;
	}(CSCoreSDK.InstanceResource));
	exports.TemplateResource = TemplateResource;
	function resourcifyTemplates(template, templateReference) {
	    template.get = templateReference.get;
	}


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var PhoneNumbersResource = (function (_super) {
	    __extends(PhoneNumbersResource, _super);
	    function PhoneNumbersResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Returns list of phone numbers
	         */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'phoneNumbers').then(function (response) {
	                response.items.forEach(function (x) {
	                    resourcifyPhoneNumbers(x, _this.withId(x.id));
	                });
	                return response;
	            });
	        };
	        /**
	         * Creates new phone number
	         */
	        this.create = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallCreate(_this, payload).then(function (response) {
	                resourcifyPhoneNumbers(response, _this.withId(response.id));
	                return response;
	            });
	        };
	        /**
	         * Get single phone number with a given id
	         */
	        this.withId = function (id) {
	            return new PhoneNumberResource(id, _this.getPath(), _this.getClient());
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return PhoneNumbersResource;
	}(CSCoreSDK.Resource));
	exports.PhoneNumbersResource = PhoneNumbersResource;
	var PhoneNumberResource = (function (_super) {
	    __extends(PhoneNumberResource, _super);
	    function PhoneNumberResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Updates phone number
	         */
	        this.update = function (payload) {
	            payload.id = _this._id;
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                resourcifyPhoneNumbers(response, _this);
	                return response;
	            });
	        };
	        /**
	         * Deletes phone number
	         */
	        this.delete = function () {
	            return CSCoreSDK.ResourceUtils.CallDelete(_this, null);
	        };
	    }
	    return PhoneNumberResource;
	}(CSCoreSDK.InstanceResource));
	exports.PhoneNumberResource = PhoneNumberResource;
	function resourcifyPhoneNumbers(phoneNumber, phoneNumberReference) {
	    phoneNumber.update = phoneNumberReference.update;
	    phoneNumber.delete = phoneNumberReference.delete;
	}


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var BudgetsResource = (function (_super) {
	    __extends(BudgetsResource, _super);
	    function BudgetsResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Returns list of user's tracked categories and its limits.
	         */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'budgets');
	        };
	        /**
	         * Set new value of tracked categories.
	         */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload);
	        };
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return BudgetsResource;
	}(CSCoreSDK.Resource));
	exports.BudgetsResource = BudgetsResource;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var GoalsResource = (function (_super) {
	    __extends(GoalsResource, _super);
	    function GoalsResource(basePath, client) {
	        var _this = this;
	        _super.call(this, basePath, client);
	        /**
	         * Returns list of user's saving goals except of completed ones. In price, only CZK currency is supported. If user has never set any goal, the response is empty.
	         */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'goals').then(function (response) {
	                response.items.forEach(function (item) {
	                    transformDates(item);
	                });
	                return response;
	            });
	        };
	        /**
	         * Set new value of goals. In price, only CZK currency is supported. If completed flag is not present, false value is supposed. All goals of given client are replaced - old ones (except of completed) are deleted and these new specified are inserted.
	         */
	        this.update = function (payload) {
	            if (Array.isArray(payload.goals)) {
	                payload.goals.forEach(function (goal) {
	                    if (goal.deadline && Object.prototype.toString.call(goal.deadline) === '[object Date]') {
	                        goal.deadline = goal.deadline.getTime();
	                    }
	                });
	            }
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                response.goals.forEach(function (item) {
	                    transformDates(item);
	                });
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return GoalsResource;
	}(CSCoreSDK.Resource));
	exports.GoalsResource = GoalsResource;
	function transformDates(item) {
	    if (item.deadline) {
	        item.deadline = new Date(item.deadline);
	    }
	}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var PromotionsResource = (function (_super) {
	    __extends(PromotionsResource, _super);
	    function PromotionsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns promotion list for the current user
	         */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'promotions');
	        };
	        /**
	         * Hide specified promotion
	         */
	        this.create = function (payload) {
	            return _this._client.callApi(_this.getPath().replace('promotions', 'actions'), 'POST', null, payload);
	        };
	    }
	    return PromotionsResource;
	}(CSCoreSDK.Resource));
	exports.PromotionsResource = PromotionsResource;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var AuthorizationLimitsResource = (function (_super) {
	    __extends(AuthorizationLimitsResource, _super);
	    function AuthorizationLimitsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Return all user local specific payment order entry limits for for all user active authorization methods and channels/applications used in country.
	         */
	        this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'limits', params).then(function (response) {
	                response.items.forEach(function (x) {
	                    resourcifyLimits(x, _this.withId(x.id));
	                });
	                return response;
	            });
	        };
	        /**
	         * Get the resource of authorization limit with a given id
	         */
	        this.withId = function (id) {
	            return new AuthorizationLimitResource(id, _this.getPath(), _this.getClient());
	        };
	    }
	    return AuthorizationLimitsResource;
	}(CSCoreSDK.Resource));
	exports.AuthorizationLimitsResource = AuthorizationLimitsResource;
	var AuthorizationLimitResource = (function (_super) {
	    __extends(AuthorizationLimitResource, _super);
	    function AuthorizationLimitResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Return local specific payment order entry limits valid for combination of user, authorization method and used channel/application. For example user could define different limits for TAC authorization via George and mobile applications.
	         */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                resourcifyLimits(response, _this);
	                return response;
	            });
	        };
	    }
	    return AuthorizationLimitResource;
	}(CSCoreSDK.InstanceResource));
	exports.AuthorizationLimitResource = AuthorizationLimitResource;
	function resourcifyLimits(limit, limitReference) {
	    limit.get = limitReference.get;
	}


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var AuthorizationTokenResource = (function (_super) {
	    __extends(AuthorizationTokenResource, _super);
	    function AuthorizationTokenResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Invalidate authorization token.
	         */
	        this.delete = function () {
	            return _this._client.callApi(_this.getPath().replace('/my', ''), 'DELETE');
	        };
	    }
	    return AuthorizationTokenResource;
	}(CSCoreSDK.Resource));
	exports.AuthorizationTokenResource = AuthorizationTokenResource;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var BundlesResource = (function (_super) {
	    __extends(BundlesResource, _super);
	    function BundlesResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        this.create = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallCreate(_this, payload).then(function (response) {
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath() + "/" + response.id);
	                return response;
	            });
	        };
	    }
	    return BundlesResource;
	}(CSCoreSDK.Resource));
	exports.BundlesResource = BundlesResource;


/***/ }
/******/ ]);
//# sourceMappingURL=cs-netbanking-sdk.sfx.js.map