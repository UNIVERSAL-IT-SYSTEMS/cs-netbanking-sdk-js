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
	         * List all accounts and get information about them.
	         */
	        get: function () {
	            return new accounts_1.AccountsResource(this.getPath() + '/accounts', this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "profile", {
	        /**
	        * Get information about the profile and past logins.
	        */
	        get: function () {
	            return new profile_1.ProfileResource(this.getPath() + '/profile', this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "cards", {
	        /**
	        * Represents list of payment cards (either debet or credit) for current user. Every card was issued for current user or belongs to one of his accounts.
	        */
	        get: function () {
	            return new cards_1.CardsResource(this.getPath() + '/cards', this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "orders", {
	        /**
	        * Get information about payments orders
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
	var transfers_1 = __webpack_require__(10);
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
	                    // add convenience methods
	                    resourcifyListing(item, _this.withId(item.id), true, false);
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
	                resourcifyListing(response, _this, false, false);
	                // transform ISO dates to native Date objects
	                transformResponse(response);
	                return response;
	            });
	        };
	        /**
	        * Update account's alias
	        */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                // add convenience methods
	                resourcifyListing(response, _this, false, true);
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
	            return new balance_1.AccountsBalanceResource(this.getPath() + '/balance', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "services", {
	        /**
	        * Get information about the account's services
	        */
	        get: function () {
	            return new services_1.AccountsServicesResource(this.getPath() + '/services', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "reservations", {
	        /**
	        * Get information about the account's reservations
	        */
	        get: function () {
	            return new reservations_1.AccountsReservationsResource(this.getPath() + '/reservations', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "repayments", {
	        /**
	        * Get information about the account's repayments
	        */
	        get: function () {
	            return new repayments_1.AccountsRepaymentsResource(this.getPath() + '/repayments', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "statements", {
	        /**
	        * Get information about the account's statements
	        */
	        get: function () {
	            return new statements_1.AccountsStatementsResource(this.getPath() + '/statements', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "subAccounts", {
	        /**
	        * Get information about the account's subaccounts
	        */
	        get: function () {
	            return new subAccounts_1.AccountsSubAccountsResource(this.getPath() + '/subaccounts', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "transactions", {
	        /**
	        * Get information about the account's transactions
	        */
	        get: function () {
	            return new transactions_1.AccountsTransactionsResource(this.getPath() + '/transactions', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "transfers", {
	        /**
	        * Revolve a loan
	        */
	        get: function () {
	            return new transfers_1.AccountsTransfersResource(this.getPath() + '/transfer', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return AccountResource;
	}(CSCoreSDK.InstanceResource));
	exports.AccountResource = AccountResource;
	function resourcifyListing(accountListing, account, isFromList, isFromUpdate) {
	    if (isFromList) {
	        accountListing.get = account.get;
	    }
	    if (!isFromUpdate) {
	        accountListing.update = account.update;
	    }
	    accountListing.update = account.update;
	    accountListing.services = account.services;
	    accountListing.transactions = account.transactions;
	    accountListing.reservations = account.reservations;
	    accountListing.transfers = account.transfers;
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
	var AccountsBalanceResource = (function (_super) {
	    __extends(AccountsBalanceResource, _super);
	    function AccountsBalanceResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Fetches the balance and returns them in a promise
	        */
	        this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null);
	        };
	    }
	    return AccountsBalanceResource;
	}(CSCoreSDK.Resource));
	exports.AccountsBalanceResource = AccountsBalanceResource;


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
	var AccountsServicesResource = (function (_super) {
	    __extends(AccountsServicesResource, _super);
	    function AccountsServicesResource() {
	        var _this = this;
	        _super.apply(this, arguments);
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
	    }
	    return AccountsServicesResource;
	}(CSCoreSDK.Resource));
	exports.AccountsServicesResource = AccountsServicesResource;


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
	var AccountsReservationsResource = (function (_super) {
	    __extends(AccountsReservationsResource, _super);
	    function AccountsReservationsResource() {
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
	    return AccountsReservationsResource;
	}(CSCoreSDK.Resource));
	exports.AccountsReservationsResource = AccountsReservationsResource;


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
	var AccountsRepaymentsResource = (function (_super) {
	    __extends(AccountsRepaymentsResource, _super);
	    function AccountsRepaymentsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
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
	    }
	    return AccountsRepaymentsResource;
	}(CSCoreSDK.Resource));
	exports.AccountsRepaymentsResource = AccountsRepaymentsResource;


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
	var AccountsStatementsResource = (function (_super) {
	    __extends(AccountsStatementsResource, _super);
	    function AccountsStatementsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Fetches the statements and returns them in a promise
	        */
	        this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'statements', params, function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesToItems('statementDate', response);
	                return response;
	            });
	        };
	    }
	    return AccountsStatementsResource;
	}(CSCoreSDK.Resource));
	exports.AccountsStatementsResource = AccountsStatementsResource;


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
	var AccountsSubAccountsResource = (function (_super) {
	    __extends(AccountsSubAccountsResource, _super);
	    function AccountsSubAccountsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Returns individual SubAccount resource with a given id
	        */
	        this.withId = function (id) {
	            return new SubAccountResource(id, _this.getPath(), _this._client);
	        };
	    }
	    return AccountsSubAccountsResource;
	}(CSCoreSDK.Resource));
	exports.AccountsSubAccountsResource = AccountsSubAccountsResource;
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
	    function SubAccountStatementsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
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
	var AccountsTransactionsResource = (function (_super) {
	    __extends(AccountsTransactionsResource, _super);
	    function AccountsTransactionsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Returns list of transactions
	        */
	        this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'transactions', params, function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['bookingDate', 'valuationDate', 'transactionDate'], response);
	                return response;
	            });
	        };
	        /**
	        * Returns individual AccountsTransactionResource with a given id
	        */
	        this.withId = function (id) {
	            return new AccountsTransactionResource(id, _this.getPath(), _this._client);
	        };
	        // nebude fungovat
	        this.export = function (params) {
	            return CSCoreSDK.ResourceUtils.CallCreateWithSuffix(_this, 'export', params);
	        };
	    }
	    return AccountsTransactionsResource;
	}(CSCoreSDK.Resource));
	exports.AccountsTransactionsResource = AccountsTransactionsResource;
	/**
	* Allows to add or change a client's personal transaction note and mark the transaction as favorite/important for one specific transaction on selected account.
	*/
	var AccountsTransactionResource = (function (_super) {
	    __extends(AccountsTransactionResource, _super);
	    function AccountsTransactionResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Adds, changes of marks transaction
	        */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload);
	        };
	    }
	    return AccountsTransactionResource;
	}(CSCoreSDK.InstanceResource));
	exports.AccountsTransactionResource = AccountsTransactionResource;


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
	var AccountsTransfersResource = (function (_super) {
	    __extends(AccountsTransfersResource, _super);
	    function AccountsTransfersResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Revolves the loan. Currently only REVOLVING_LOAN subtype is supported.
	        */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallCreate(_this, payload);
	        };
	    }
	    return AccountsTransfersResource;
	}(CSCoreSDK.Resource));
	exports.AccountsTransfersResource = AccountsTransfersResource;


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
	var lastLogin_1 = __webpack_require__(12);
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
	                    CSCoreSDK.EntityUtils.addDatesFromISO('lastlogin', profile);
	                }
	                return profile;
	            });
	        };
	    }
	    Object.defineProperty(ProfileResource.prototype, "lastLogin", {
	        /**
	         * Returns LastLoginResource for listing past logins
	         */
	        get: function () {
	            return new lastLogin_1.LastLoginResource(this.getPath() + '/logininfo', this.getClient());
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
	var LastLoginResource = (function (_super) {
	    __extends(LastLoginResource, _super);
	    function LastLoginResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Returns promise with a list of past logins
	         */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'lastlogin').then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems('lastlogin', response);
	                return response;
	            });
	        };
	    }
	    return LastLoginResource;
	}(CSCoreSDK.Resource));
	exports.LastLoginResource = LastLoginResource;


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
	var transfers_1 = __webpack_require__(19);
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
	                    transformResponse(item);
	                    // add convenience get method to fetch detail of the card
	                    resourcifyListing(item, _this.withId(item.id), true, false);
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
	                resourcifyListing(card, _this, false, false);
	                transformResponse(card);
	                return card;
	            });
	        };
	        /**
	        * Update card's alias
	        */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (card) {
	                resourcifyListing(card, _this, false, true);
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
	    Object.defineProperty(CardResource.prototype, "transfers", {
	        /**
	        * Resource for paying up credit card debt
	        */
	        get: function () {
	            return new transfers_1.CardTransfersResource(this.getPath() + '/transfer', this._client);
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
	function resourcifyListing(itemListing, itemResource, isFromList, isFromUpdate) {
	    if (isFromList) {
	        itemListing.get = itemResource.get;
	    }
	    if (!isFromUpdate) {
	        itemListing.update = itemResource.update;
	    }
	    itemListing.delivery = itemResource.delivery;
	    itemListing.transactions = itemResource.transactions;
	    itemListing.actions = itemResource.actions;
	    itemListing.limits = itemResource.limits;
	    itemListing.secure3d = itemResource.secure3d;
	    itemListing.transfers = itemResource.transfers;
	    itemListing.accounts = itemResource.accounts;
	}
	function transformResponse(response) {
	    CSCoreSDK.EntityUtils.addDatesFromISO(['expiryDate', 'validFromDate'], response);
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
	            // zkontrolovat, pravděpodobně nebude fungovat
	            return CSCoreSDK.ResourceUtils.CallCreateWithSuffix(_this, 'export', params);
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
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'limits');
	        };
	        /**
	         * Update individual limits
	         */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload);
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
	var CardTransfersResource = (function (_super) {
	    __extends(CardTransfersResource, _super);
	    function CardTransfersResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	         * Pays up the credit card debt and returns sign info
	         */
	        this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload);
	        };
	    }
	    return CardTransfersResource;
	}(CSCoreSDK.Resource));
	exports.CardTransfersResource = CardTransfersResource;


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
	                CSCoreSDK.EntityUtils.addDatesToItems('statementDate', response);
	                return response;
	            });
	        };
	        /**
	         * Download PDF with statements
	         */
	        this.download = function (params) {
	            // zkontrolovat, zřejmě nebude fungovat
	            return CSCoreSDK.ResourceUtils.CallCreateWithSuffix(_this, 'signed/download', params);
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
	                    CSCoreSDK.EntityUtils.addDatesFromISO(['cz-orderingDate', 'executionDate', 'modificationDate', 'transferDate'], item);
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
	            return new bookingDate_1.PaymentsBookingDateResource(this.getPath() + '/bookingdate', this._client);
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
	            return new limits_1.PaymentsLimitsResource(this.getPath() + '/limits', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PaymentsResource.prototype, "mobile", {
	        /**
	        * Recharging the credit available on prepaid cards provided by Vodafone, T-Mobile or O2.
	        */
	        get: function () {
	            return new mobile_1.PaymentsMobileResource(this.getPath() + '/mobile', this._client);
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
	    paymentListing.delete = PaymentResource.delete;
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
	var PaymentsBookingDateResource = (function (_super) {
	    __extends(PaymentsBookingDateResource, _super);
	    function PaymentsBookingDateResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * Returns current available booking date based on the provided account and optional payment order category parameters
	        */
	        this.update = function (payload) {
	            var accountId = payload.accountId;
	            delete payload.accountId;
	            _this._path = _this.getPath() + ("?accountId=" + accountId);
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (bookingDate) {
	                CSCoreSDK.EntityUtils.addDatesFromISO('bookingDate', bookingDate);
	                return bookingDate;
	            });
	        };
	    }
	    return PaymentsBookingDateResource;
	}(CSCoreSDK.Resource));
	exports.PaymentsBookingDateResource = PaymentsBookingDateResource;


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
	            return CSCoreSDK.ResourceUtils.CallCreate(_this, payload).then(function (response) {
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
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
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
	var PaymentsLimitsResource = (function (_super) {
	    __extends(PaymentsLimitsResource, _super);
	    function PaymentsLimitsResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        /**
	        * List all limits for payment orders
	        */
	        this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'remainingLimits', null);
	        };
	    }
	    return PaymentsLimitsResource;
	}(CSCoreSDK.Resource));
	exports.PaymentsLimitsResource = PaymentsLimitsResource;


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
	var PaymentsMobileResource = (function (_super) {
	    __extends(PaymentsMobileResource, _super);
	    function PaymentsMobileResource() {
	        var _this = this;
	        _super.apply(this, arguments);
	        this.create = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallCreate(_this, payload);
	        };
	    }
	    return PaymentsMobileResource;
	}(CSCoreSDK.Resource));
	exports.PaymentsMobileResource = PaymentsMobileResource;


/***/ }
/******/ ]);
//# sourceMappingURL=cs-netbanking-sdk.sfx.js.map