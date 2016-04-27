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
	var profile_1 = __webpack_require__(11);
	var cards_1 = __webpack_require__(13);
	var orders_1 = __webpack_require__(21);
	var sharedClient = null;
	/*+
	 * Returns the singleton NetbankingClient
	 */
	function getClient() {
	    if (sharedClient === null) {
	        return new NetbankingClient(CSCoreSDK.config.copy(), CSCoreSDK._sharedContext);
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
	        _super.call(this, config, context, '/api/v3/netbanking/my');
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
	                // add convenience methods
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
	            return new subAccounts_1.AccountSubAccountsResource(this.getPath() + '/subaccounts', this._client);
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
	            return CSCoreSDK.ResourceUtils.CallApiWithSuffix(_this, 'signed/download', 'POST', params);
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
	var AccountSubAccountsResource = (function (_super) {
	    __extends(AccountSubAccountsResource, _super);
	    function AccountSubAccountsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Returns individual SubAccount resource with a given id
	        */
	        this.withId = function (id) {
	            return new SubAccountResource(id, _this.getPath(), _this._client);
	        };
	    }
	    return AccountSubAccountsResource;
	}(CSCoreSDK.Resource));
	exports.AccountSubAccountsResource = AccountSubAccountsResource;
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
	            return CSCoreSDK.ResourceUtils.CallApiWithSuffix(_this, 'download', 'POST', params);
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
	            return _this._client.callApi(path + "/export", 'POST', params, null, null);
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
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload);
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
	var lastLogins_1 = __webpack_require__(12);
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
	var delivery_1 = __webpack_require__(14);
	var transactions_1 = __webpack_require__(15);
	var actions_1 = __webpack_require__(16);
	var limits_1 = __webpack_require__(17);
	var secure3D_1 = __webpack_require__(18);
	var transfer_1 = __webpack_require__(19);
	var statements_1 = __webpack_require__(20);
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
	 * Get current delivery settings
	 */
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
	            return _this._client.callApi(path + "/export", 'POST', params, null, null);
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
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload);
	        };
	    }
	    return CardActionsResource;
	}(CSCoreSDK.Resource));
	exports.CardActionsResource = CardActionsResource;


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
	                return response;
	            });
	        };
	    }
	    return CardLimitsResource;
	}(CSCoreSDK.Resource));
	exports.CardLimitsResource = CardLimitsResource;


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
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload);
	        };
	    }
	    return CardTransferResource;
	}(CSCoreSDK.Resource));
	exports.CardTransferResource = CardTransferResource;


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
	            return CSCoreSDK.ResourceUtils.CallApiWithSuffix(_this, 'signed/download', 'POST', params);
	        };
	    }
	    return CardStatementsResource;
	}(CSCoreSDK.Resource));
	exports.CardStatementsResource = CardStatementsResource;


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
	var bookingDate_1 = __webpack_require__(22);
	var domestic_1 = __webpack_require__(23);
	var limits_1 = __webpack_require__(24);
	var mobile_1 = __webpack_require__(25);
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
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'order', params, function (response) {
	                response.items.forEach(function (item) {
	                    // transform ISO dates to native Date objects
	                    CSCoreSDK.EntityUtils.addDatesFromISO(['cz-orderingDate', 'executionDate', 'modificationDate', 'transferDate'], item);
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
	                return response;
	            });
	        };
	    }
	    return PaymentDomesticResource;
	}(CSCoreSDK.InstanceResource));
	exports.PaymentDomesticResource = PaymentDomesticResource;


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
	            return CSCoreSDK.ResourceUtils.CallCreate(_this, payload);
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        this._path = this.getPath().replace('/my', '/cz/my');
	    }
	    return PaymentMobileResource;
	}(CSCoreSDK.Resource));
	exports.PaymentMobileResource = PaymentMobileResource;


/***/ }
/******/ ]);
//# sourceMappingURL=cs-netbanking-sdk.sfx.js.map