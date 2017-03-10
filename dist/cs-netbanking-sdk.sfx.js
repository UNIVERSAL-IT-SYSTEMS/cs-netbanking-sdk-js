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

	/// <reference types="es6-promise" />
	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
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
	/**
	 * Returns the singleton NetbankingClient
	 * @returns {NetbankingClient}
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
	 * @extends {CSCoreSDK.WebApiClient}
	 */
	var NetbankingClient = (function (_super) {
	    __extends(NetbankingClient, _super);
	    /**
	     * Creates new instance of NetbankingClient
	     *
	     * @param {WebApiConfiguration} config object that configures this client
	     * @param {WebApiContext} context object that allows for data sharing between clients
	     */
	    function NetbankingClient(config, context) {
	        var _this = _super.call(this, config, '/api/v3/netbanking/my') || this;
	        _this.sharedContext = context;
	        return _this;
	    }
	    Object.defineProperty(NetbankingClient.prototype, "accounts", {
	        /**
	         * List all accounts and get other information like balance, services, statements etc.
	         * @returns {AccountsResource}
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
	         * @returns {ProfileResource}
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
	         * @returns {CardsResource}
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
	         * @returns {OrdersResource}
	         */
	        get: function () {
	            return new orders_1.OrdersResource(this.getPath() + '/orders', this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "securities", {
	        /**
	         * @returns {SecuritiesResource}
	         */
	        get: function () {
	            return new securities_1.SecuritiesResource(this.getPath() + '/securities', this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "settings", {
	        /**
	         * @returns {SettingsResource}
	         */
	        get: function () {
	            return new settings_1.SettingsResource(this.getPath() + "/settings", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "contacts", {
	        /**
	         * @returns {ContactsResource}
	         */
	        get: function () {
	            return new contacts_1.ContactsResource(this.getPath() + "/contacts", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "plugins", {
	        /**
	         * @returns {PluginsResource}
	         */
	        get: function () {
	            return new plugins_1.PluginsResource(this.getPath() + "/plugins", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "contracts", {
	        /**
	         * @returns {ContractsResource}
	         */
	        get: function () {
	            return new contracts_1.ContractsResource(this.getPath() + "/contracts", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "services", {
	        /**
	         * @returns {ServicesResource}
	         */
	        get: function () {
	            return new services_1.ServicesResource(this.getPath() + "/services", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "messages", {
	        /**
	         * @returns {MessagesResource}
	         */
	        get: function () {
	            return new messages_1.MessagesResource(this.getPath() + "/messages", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "templates", {
	        /**
	         * @returns {TemplatesResource}
	         */
	        get: function () {
	            return new templates_1.TemplatesResource(this.getPath() + "/templates", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "phoneNumbers", {
	        /**
	         * @returns {PhoneNumbersResource}
	         */
	        get: function () {
	            return new phone_numbers_1.PhoneNumbersResource(this.getPath() + "/phone-numbers", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "budgets", {
	        /**
	         * @returns {BudgetsResource}
	         */
	        get: function () {
	            return new budgets_1.BudgetsResource(this.getPath() + "/budgets", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "goals", {
	        /**
	         * @returns {GoalsResource}
	         */
	        get: function () {
	            return new goals_1.GoalsResource(this.getPath() + "/goals", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "promotions", {
	        /**
	         * @returns {PromotionsResource}
	         */
	        get: function () {
	            return new promotions_1.PromotionsResource(this.getPath() + "/promotions", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "authorizationLimits", {
	        /**
	         * @returns {AuthorizationLimitsResource}
	         */
	        get: function () {
	            return new authorization_limits_1.AuthorizationLimitsResource(this.getPath() + "/authorizationLimits", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "authorizationToken", {
	        /**
	         * @returns {AuthorizationTokenResource}
	         */
	        get: function () {
	            return new authorization_token_1.AuthorizationTokenResource(this.getPath() + "/auth/token/invalidate", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NetbankingClient.prototype, "bundles", {
	        /**
	         * @returns {BundlesResource}
	         */
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
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
	 * @class AccountsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<AccountResource>}
	 * @implements {CSCoreSDK.PaginatedListEnabled<MainAccount>}
	 */
	var AccountsResource = (function (_super) {
	    __extends(AccountsResource, _super);
	    function AccountsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * List all accounts
	         * @param {AccountParameters=} params
	         * @returns {Promise<AccountList>}
	         */
	        _this.list = function (params) {
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
	         * @param {string|number} id
	         * @returns {AccountResource}
	         */
	        _this.withId = function (id) {
	            return new AccountResource(id, _this.getPath(), _this._client);
	        };
	        return _this;
	    }
	    return AccountsResource;
	}(CSCoreSDK.Resource));
	exports.AccountsResource = AccountsResource;
	/**
	 * Get detail of the individual account and additional information about it
	 * @class AccountResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<MainAccount>}
	 * @implements {CSCoreSDK.UpdateEnabled<ChangeAccountSettingsRequest, ChangeAccountSettingsResponse>}
	 */
	var AccountResource = (function (_super) {
	    __extends(AccountResource, _super);
	    function AccountResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Get account detail
	         * @returns {Promise<MainAccount>}
	         */
	        _this.get = function () {
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
	         * @param {ChangeAccountSettingsRequest} payload
	         * @returns {Promise<ChangeAccountSettingsResponse>}
	         */
	        _this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                // add convenience methods
	                resourcifyListing(response, _this, false);
	                // transform ISO dates to native Date objects
	                transformResponse(response);
	                return response;
	            });
	        };
	        return _this;
	    }
	    Object.defineProperty(AccountResource.prototype, "balance", {
	        /**
	         * Get information about the account's balance
	         * @returns {AccountBalanceResource}
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
	         * @returns {AccountServicesResource}
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
	         * @returns {AccountReservationsResource}
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
	         * @returns {AccountRepaymentsResource}
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
	         * @returns {AccountStatementsResource}
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
	         * @returns {SubAccountsResource}
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
	         * @returns {AccountTransactionsResource}
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
	         * @returns {AccountTransferResource}
	         */
	        get: function () {
	            return new transfer_1.AccountTransferResource(this.getPath() + '/transfer', this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "standingOrders", {
	        /**
	         * @returns {AccountStandingOrdersResource}
	         */
	        get: function () {
	            return new standing_orders_1.AccountStandingOrdersResource(this.getPath() + '/standingorders', this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "directDebits", {
	        /**
	         * @returns {AccountDirectDebitsResource}
	         */
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Get information about the account's balance
	 * @class AccountBalanceResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.GetEnabled<AccountBalance>}
	 */
	var AccountBalanceResource = (function (_super) {
	    __extends(AccountBalanceResource, _super);
	    function AccountBalanceResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Fetches the balance and returns them in a promise
	         * @returns {Promise<AccountBalance>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null);
	        };
	        return _this;
	    }
	    return AccountBalanceResource;
	}(CSCoreSDK.Resource));
	exports.AccountBalanceResource = AccountBalanceResource;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Get information about the account's services
	 * @class AccountServicesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Service>}
	 */
	var AccountServicesResource = (function (_super) {
	    __extends(AccountServicesResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function AccountServicesResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Fetches the services and returns them in a promise
	         * @param {ServiceParameters=} params
	         */
	        _this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'services', params, function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesToItems(['dateFrom', 'dateTo'], response);
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return AccountServicesResource;
	}(CSCoreSDK.Resource));
	exports.AccountServicesResource = AccountServicesResource;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Get information about the account's reservations
	 * @class AccountReservationsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Reservation>}
	 */
	var AccountReservationsResource = (function (_super) {
	    __extends(AccountReservationsResource, _super);
	    function AccountReservationsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Fetches the reservations and returns them in a promise
	         * @param {ReservationParameters=} params
	         * @returns {Promise<ReservationList>}
	         */
	        _this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'reservations', params, function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesToItems(['creationDate', 'expirationDate'], response);
	                return response;
	            });
	        };
	        return _this;
	    }
	    return AccountReservationsResource;
	}(CSCoreSDK.Resource));
	exports.AccountReservationsResource = AccountReservationsResource;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Get information about the account's repayments
	 * @class AccountRepaymentsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Repayment>}
	 */
	var AccountRepaymentsResource = (function (_super) {
	    __extends(AccountRepaymentsResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function AccountRepaymentsResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Fetches the repayments and returns them in a promise
	         * @returns {Promise<RepaymentList>}
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'repayments', null).then(function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesToItems('repaymentDate', response);
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return AccountRepaymentsResource;
	}(CSCoreSDK.Resource));
	exports.AccountRepaymentsResource = AccountRepaymentsResource;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Get information about the account's statements
	 * @class AccountStatementsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Statement>}
	 */
	var AccountStatementsResource = (function (_super) {
	    __extends(AccountStatementsResource, _super);
	    function AccountStatementsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Fetches the statements and returns them in a promise
	         * @param {NetbankingParameters=} params
	         * @returns {Promise<StatementList>}
	         */
	        _this.list = function (params) {
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
	         * @param {DownloadStatementParameters} params
	         * @returns {Promise<Uint8Array>}
	         */
	        _this.download = function (params) {
	            return CSCoreSDK.ResourceUtils.CallDownload(_this, 'signed/download', 'POST', params);
	        };
	        return _this;
	    }
	    return AccountStatementsResource;
	}(CSCoreSDK.Resource));
	exports.AccountStatementsResource = AccountStatementsResource;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Get individual SubAccount resource
	 * @class SubAccountsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<SubAccountResource>}
	 */
	var SubAccountsResource = (function (_super) {
	    __extends(SubAccountsResource, _super);
	    function SubAccountsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns individual SubAccount resource with a given id
	         * @param {string|number} id
	         * @returns {SubAccountResource}
	         */
	        _this.withId = function (id) {
	            return new SubAccountResource(id, _this.getPath(), _this._client);
	        };
	        return _this;
	    }
	    return SubAccountsResource;
	}(CSCoreSDK.Resource));
	exports.SubAccountsResource = SubAccountsResource;
	/**
	 * Get information about the subaccount
	 * @class SubAccountResource
	 * @extends {CSCoreSDK.InstanceResource}
	 */
	var SubAccountResource = (function (_super) {
	    __extends(SubAccountResource, _super);
	    function SubAccountResource() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Object.defineProperty(SubAccountResource.prototype, "statements", {
	        /**
	         * Get information about the subaccount's statements
	         * @returns {SubAccountStatementsResource}
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
	 * @class SubAccountStatementsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Statement>}
	 */
	var SubAccountStatementsResource = (function (_super) {
	    __extends(SubAccountStatementsResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function SubAccountStatementsResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Returns all subaccount's statements in a promise
	         * @param {NetbankingParameters=} params
	         * @returns {Promise<StatementList>}
	         */
	        _this.list = function (params) {
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
	         * @param {DownloadStatementParameters} params
	         * @returns {Promise<Uint8Array>}
	         */
	        _this.download = function (params) {
	            return CSCoreSDK.ResourceUtils.CallDownload(_this, 'download', 'POST', params);
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return SubAccountStatementsResource;
	}(CSCoreSDK.Resource));
	exports.SubAccountStatementsResource = SubAccountStatementsResource;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Get individual AccountsTransactionsResource
	 * @class AccountTransactionsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<AccountTransactionResource>}
	 */
	var AccountTransactionsResource = (function (_super) {
	    __extends(AccountTransactionsResource, _super);
	    function AccountTransactionsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns individual AccountsTransactionResource with a given id
	         * @param {AccountTransactionResource} id
	         * @returns {AccountTransactionResource}
	         */
	        _this.withId = function (id) {
	            return new AccountTransactionResource(id, _this.getPath(), _this._client);
	        };
	        /**
	         * Exports transaction history into signed pdf
	         * @param {ExportTransactionsParameters} params
	         * @returns {Promise<Uint8Array>}
	         */
	        _this.export = function (params) {
	            // transform "fields" parameter to comma separated list from array
	            CSCoreSDK.EntityUtils.transformArrayParamsToString(params, 'fields');
	            // transform Date objects to ISO strings
	            CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);
	            // insert 'cz' resource into the resource's path once because the api requires it in some resources
	            var path = _this.getPath().replace('/my', '/cz/my');
	            return _this._client.callApi(path + "/export", 'POST', params, null, null, 'arraybuffer');
	        };
	        return _this;
	    }
	    return AccountTransactionsResource;
	}(CSCoreSDK.Resource));
	exports.AccountTransactionsResource = AccountTransactionsResource;
	/**
	 * Allows to add or change a client's personal transaction note and mark the transaction as favorite/important for one specific transaction on selected account.
	 * @class AccountTransactionResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionRequest, AddNoteAndMarkTransactionResponse>}
	 */
	var AccountTransactionResource = (function (_super) {
	    __extends(AccountTransactionResource, _super);
	    function AccountTransactionResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Adds, changes of marks transaction
	         * @param {AddNoteAndMarkTransactionRequest} payload
	         * @returns {Promise<AddNoteAndMarkTransactionResponse>}
	         */
	        _this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload);
	        };
	        return _this;
	    }
	    return AccountTransactionResource;
	}(CSCoreSDK.InstanceResource));
	exports.AccountTransactionResource = AccountTransactionResource;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Revolve a loan
	 * @class AccountTransferResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.UpdateEnabled<TransferRequest, TransferResponse>}
	 */
	var AccountTransferResource = (function (_super) {
	    __extends(AccountTransferResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function AccountTransferResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Revolves the loan. Currently only REVOLVING_LOAN subtype is supported.
	         * @param {TransferRequest} payload
	         * @returns {Promise<TransferResponse>}
	         */
	        _this.update = function (payload) {
	            // transform Date objects to ISO strings
	            CSCoreSDK.EntityUtils.transformDatesToSimpleISO('transferDate', payload);
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                // Remove signInfo from response and add SigningObject with key signing
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return AccountTransferResource;
	}(CSCoreSDK.Resource));
	exports.AccountTransferResource = AccountTransferResource;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class AccountStandingOrdersResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<StandingOrder>}
	 * @implements {CSCoreSDK.HasInstanceResource<AccountStandingOrderResource>}
	 * @implements {CSCoreSDK.CreateEnabled<CreateStandingOrderRequest, StandingOrderResponse>}
	 */
	var AccountStandingOrdersResource = (function (_super) {
	    __extends(AccountStandingOrdersResource, _super);
	    function AccountStandingOrdersResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns list of actual standing/sweep orders for accounts of the current user.
	         * @param {NetbankingParameters} params
	         * @returns {Promise<StandingOrderList>}
	         */
	        _this.list = function (params) {
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
	         * @param {string} id
	         * @returns {AccountStandingOrderResource}
	         */
	        _this.withId = function (id) {
	            return new AccountStandingOrderResource(id, _this.getPath(), _this.getClient());
	        };
	        /**
	         * Resource for creating standing/sweep order. Once order has been signed new payments are generated and executed according its settings.
	         * @param {CreateStandingOrderRequest} payload
	         * @returns {Promise<StandingOrderResponse>}
	         */
	        _this.create = function (payload) {
	            CSCoreSDK.EntityUtils.transformDatesToSimpleISO(['nextExecutionDate', 'lastExecutionDate', 'startDate'], payload);
	            return CSCoreSDK.ResourceUtils.CallCreate(_this, payload).then(function (response) {
	                addDatesToStandingOrder(response);
	                resourcifyStandingOrder(response, _this.withId(response.number));
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        return _this;
	    }
	    return AccountStandingOrdersResource;
	}(CSCoreSDK.Resource));
	exports.AccountStandingOrdersResource = AccountStandingOrdersResource;
	/**
	 * @class AccountStandingOrderResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<StandingOrder>}
	 * @implements {CSCoreSDK.DeleteEnabled<StandingOrderResponse>}
	 */
	var AccountStandingOrderResource = (function (_super) {
	    __extends(AccountStandingOrderResource, _super);
	    function AccountStandingOrderResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns detail of actual standing/sweep orders identified by its number.
	         * @returns {Promise<StandingOrder>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                addDatesToStandingOrder(response);
	                resourcifyStandingOrder(response, _this);
	                return response;
	            });
	        };
	        /**
	         * This call removes existing standing/sweep order. No more payments for the order are executed after the change has been signed.
	         * @returns {Promise<StandingOrderResponse>}
	         */
	        _this.delete = function () {
	            return CSCoreSDK.ResourceUtils.CallDelete(_this, null).then(function (response) {
	                addDatesToStandingOrder(response);
	                resourcifyStandingOrder(response, _this);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        return _this;
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class AccountDirectDebitsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<DirectDebit>}
	 * @implements {CSCoreSDK.HasInstanceResource<AccountDirectDebitResource>}
	 * @implements {CSCoreSDK.CreateEnabled<DirectDebit, SignableDirectDebit>}
	 */
	var AccountDirectDebitsResource = (function (_super) {
	    __extends(AccountDirectDebitsResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function AccountDirectDebitsResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Resource Direct Debit List represents collection of all direct debit approvals entered by user for the specified user
	         * @param {NetbankingParameters} params
	         * @returns {Promise<DirectDebitList>}
	         */
	        _this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'directDebits', params, function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['startDate', 'endDate', 'versionValidityDate'], response);
	                return response;
	            });
	        };
	        /**
	         * Get the resource of direct debit with a given id
	         * @param {string} id
	         * @returns {AccountDirectDebitResource}
	         */
	        _this.withId = function (id) {
	            return new AccountDirectDebitResource(id, _this.getPath(), _this.getClient());
	        };
	        /**
	         * Resource for creating (or allowing) direct debit on certain account. Once signed it can be used by receiver party.
	         * @param {DirectDebit} payload
	         * @returns {Promise<SignableDirectDebit>}
	         */
	        _this.create = function (payload) {
	            CSCoreSDK.EntityUtils.transformDatesToSimpleISO(['startDate', 'endDate'], payload);
	            return CSCoreSDK.ResourceUtils.CallCreate(_this, payload).then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesFromISO(['startDate', 'endDate', 'versionValidityDate'], response);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return AccountDirectDebitsResource;
	}(CSCoreSDK.Resource));
	exports.AccountDirectDebitsResource = AccountDirectDebitsResource;
	/**
	 * @class AccountDirectDebitResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<DirectDebit>}
	 * @implements {CSCoreSDK.DeleteEnabled<SignableDirectDebit>}
	 */
	var AccountDirectDebitResource = (function (_super) {
	    __extends(AccountDirectDebitResource, _super);
	    function AccountDirectDebitResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Get the single direct debits detail.
	         * @returns {Promise<DirectDebit>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesFromISO(['startDate', 'endDate', 'versionValidityDate'], response);
	                return response;
	            });
	        };
	        /**
	         * Resource for deleting direct debit (permission) on certain account. Once signed no more transfers can be made by receiver party.
	         * @returns {Promise<SignableDirectDebit>}
	         */
	        _this.delete = function () {
	            return CSCoreSDK.ResourceUtils.CallDelete(_this, null).then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesFromISO(['startDate', 'endDate', 'versionValidityDate'], response);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        return _this;
	    }
	    return AccountDirectDebitResource;
	}(CSCoreSDK.InstanceResource));
	exports.AccountDirectDebitResource = AccountDirectDebitResource;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	var lastLogins_1 = __webpack_require__(14);
	/**
	 * Get information about the profile and past logins.
	 * @class ProfileResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.GetEnabled<Profile>}
	 */
	var ProfileResource = (function (_super) {
	    __extends(ProfileResource, _super);
	    function ProfileResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns information about the profile
	         * @returns {Promise<Profile>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (profile) {
	                if (profile.lastlogin) {
	                    // transform ISO dates to native Date objects
	                    CSCoreSDK.EntityUtils.addDatesFromISO('lastlogin', profile);
	                }
	                return profile;
	            });
	        };
	        return _this;
	    }
	    Object.defineProperty(ProfileResource.prototype, "lastLogins", {
	        /**
	         * Returns LastLoginsResource for listing past logins
	         * @returns {LastLoginsResource}
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * List all past logins
	 * @class LastLoginsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<LastLoginInfo>}
	 */
	var LastLoginsResource = (function (_super) {
	    __extends(LastLoginsResource, _super);
	    function LastLoginsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns promise with a list of past logins
	         * @returns {Promise<LastLoginList>}
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'lastlogin').then(function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesToItems('lastlogin', response);
	                return response;
	            });
	        };
	        return _this;
	    }
	    return LastLoginsResource;
	}(CSCoreSDK.Resource));
	exports.LastLoginsResource = LastLoginsResource;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
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
	 * @class CardsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Card>}
	 * @implements {CSCoreSDK.HasInstanceResource<CardResource>}
	 */
	var CardsResource = (function (_super) {
	    __extends(CardsResource, _super);
	    function CardsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * List all cards
	         * @param {Promise<CardList>=} params
	         * @returns {Promise<CardList>}
	         */
	        _this.list = function (params) {
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
	         * @param {string} id
	         * @returns {CardResource}
	         */
	        _this.withId = function (id) {
	            return new CardResource(id, _this.getPath(), _this.getClient());
	        };
	        return _this;
	    }
	    return CardsResource;
	}(CSCoreSDK.Resource));
	exports.CardsResource = CardsResource;
	/**
	 * @class CardResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<Card>}
	 * @implements {CSCoreSDK.UpdateEnabled<ChangeCardSettingsRequest, ChangeCardSettingsResponse>}
	 */
	var CardResource = (function (_super) {
	    __extends(CardResource, _super);
	    function CardResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Get detail of the card
	         * @returns {Promise<Card>}
	         */
	        _this.get = function () {
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
	         * @param {ChangeCardSettingsRequest} payload
	         * @returns {Promise<ChangeCardSettingsResponse>}
	         */
	        _this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (card) {
	                // add convenient methods to items in the list
	                resourcifyListing(card, _this, false);
	                // transform ISO dates to native Date objects
	                transformResponse(card);
	                return card;
	            });
	        };
	        return _this;
	    }
	    Object.defineProperty(CardResource.prototype, "delivery", {
	        /**
	         * Get current delivery settings
	         * @returns {CardDeliveryResource}
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
	         * @returns {CardTransactionsResource}
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
	         * @returns {CardActionsResource}
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
	         * @returns {CardLimitsResource}
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
	         * @returns {CardSecure3DResource}
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
	         * @returns {CardTransferResource}
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
	         * @returns {CardAccountsResource}
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Get current delivery settings
	 * @class CardDeliveryResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.GetEnabled<DeliveryListing>}
	 * @implements {CSCoreSDK.UpdateEnabled<ChangeDeliverySettingsRequest, ChangeDeliverySettingsResponse>}
	 */
	var CardDeliveryResource = (function (_super) {
	    __extends(CardDeliveryResource, _super);
	    function CardDeliveryResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns current delivery settings
	         * @returns {Promise<DeliveryListing>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null);
	        };
	        /**
	         * Change current delivery settings
	         * @param {ChangeDeliverySettingsRequest} payload
	         * @returns {Promise<ChangeDeliverySettingsResponse>}
	         */
	        _this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload);
	        };
	        return _this;
	    }
	    return CardDeliveryResource;
	}(CSCoreSDK.Resource));
	exports.CardDeliveryResource = CardDeliveryResource;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Allows to add or change a client's personal note and mark/star the card transaction as favorite/important for one specific transaction
	 * @class CardTransactionsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<CardTransactionResource>}
	 */
	var CardTransactionsResource = (function (_super) {
	    __extends(CardTransactionsResource, _super);
	    function CardTransactionsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns CardTransactionResource for a given id
	         * @param {string} id
	         * @returns {CardTransactionResource}
	         */
	        _this.withId = function (id) {
	            return new CardTransactionResource(id, _this.getPath(), _this._client);
	        };
	        /**
	         * Export transactions to PDF
	         * @param {ExportTransactionsParameters} params
	         * @returns {Promise<Uint8Array>}
	         */
	        _this.export = function (params) {
	            // transform "fields" parameter to comma separated list from array
	            CSCoreSDK.EntityUtils.transformArrayParamsToString(params, 'fields');
	            // transform Date objects to ISO strings
	            CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);
	            // insert 'cz' resource into the resource's path once because the api requires it in some resources
	            var path = _this.getPath().replace('/my', '/cz/my');
	            return _this._client.callApi(path + "/export", 'POST', params, null, null, 'arraybuffer');
	        };
	        return _this;
	    }
	    return CardTransactionsResource;
	}(CSCoreSDK.Resource));
	exports.CardTransactionsResource = CardTransactionsResource;
	/**
	 * Add or change a client's personal note and mark/star the card transaction as favorite/important
	 * @class CardTransactionResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.UpdateEnabled<AddNoteAndMarkTransactionRequest, AddNoteAndMarkCardTransactionResponse>}
	 */
	var CardTransactionResource = (function (_super) {
	    __extends(CardTransactionResource, _super);
	    function CardTransactionResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Adds, changes of marks transaction
	         * @param {AddNoteAndMarkTransactionRequest} payload
	         * @returns {Promise<AddNoteAndMarkCardTransactionResponse>}
	         */
	        _this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload);
	        };
	        return _this;
	    }
	    return CardTransactionResource;
	}(CSCoreSDK.InstanceResource));
	exports.CardTransactionResource = CardTransactionResource;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Issue various actions on a single card.
	 * @class CardActionsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.UpdateEnabled<CardActionRequest, CardActionResponse>}
	 */
	var CardActionsResource = (function (_super) {
	    __extends(CardActionsResource, _super);
	    function CardActionsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Issues various actions on a single card
	         * @param {CardActionRequest} payload
	         * @returns {Promise<CardActionResponse>}
	         */
	        _this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                // Remove signInfo from response and add SigningObject with key signing
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        return _this;
	    }
	    return CardActionsResource;
	}(CSCoreSDK.Resource));
	exports.CardActionsResource = CardActionsResource;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Get information about different limits
	 * @class CardLimitsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<CardLimit>}
	 * @implements {CSCoreSDK.UpdateEnabled<ChangeCardLimitsRequest, ChangeCardLimitsResponse>}
	 */
	var CardLimitsResource = (function (_super) {
	    __extends(CardLimitsResource, _super);
	    function CardLimitsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * List all limits
	         * @returns {Promise<CardLimitsList>}
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'limits').then(function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesToItems('temporaryLimitExpiration', response);
	                return response;
	            });
	        };
	        /**
	         * Update individual limits
	         * @param {ChangeCardLimitsRequest} payload
	         * @returns {Promise<ChangeCardLimitsResponse>}
	         */
	        _this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesToItems('temporaryLimitExpiration', response, 'limits');
	                // Remove signInfo from response and add SigningObject with key signing
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        return _this;
	    }
	    return CardLimitsResource;
	}(CSCoreSDK.Resource));
	exports.CardLimitsResource = CardLimitsResource;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Get the 3D secure online shopping status
	 * @class CardSecure3DResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.GetEnabled<SecureSettings>}
	 */
	var CardSecure3DResource = (function (_super) {
	    __extends(CardSecure3DResource, _super);
	    function CardSecure3DResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns 3D secure online shopping status
	         * @returns {Promise<SecureSettings>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null);
	        };
	        return _this;
	    }
	    return CardSecure3DResource;
	}(CSCoreSDK.Resource));
	exports.CardSecure3DResource = CardSecure3DResource;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Resource for paying up credit card debt
	 * @class CardTransferResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.UpdateEnabled<PayUpCreditCardRequest, PayUpCreditCardResponse>}
	 */
	var CardTransferResource = (function (_super) {
	    __extends(CardTransferResource, _super);
	    function CardTransferResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Pays up the credit card debt and returns sign info
	         * @param {PayUpCreditCardRequest} payload
	         * @returns {Promise<PayUpCreditCardResponse>}
	         */
	        _this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                // Remove signInfo from response and add SigningObject with key signing
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        return _this;
	    }
	    return CardTransferResource;
	}(CSCoreSDK.Resource));
	exports.CardTransferResource = CardTransferResource;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Account resource for listing statements
	 * @class CardAccountsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<CardAccountResource>}
	 */
	var CardAccountsResource = (function (_super) {
	    __extends(CardAccountsResource, _super);
	    function CardAccountsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns CardAccountResource for an account with a given id
	         * @param {string} id
	         * @returns {CardAccountResource}
	         */
	        _this.withId = function (id) {
	            return new CardAccountResource(id, _this.getPath(), _this._client);
	        };
	        return _this;
	    }
	    return CardAccountsResource;
	}(CSCoreSDK.Resource));
	exports.CardAccountsResource = CardAccountsResource;
	/**
	 * Indidiual account resource with a given id
	 * @class CardAccountResource
	 * @extends {CSCoreSDK.InstanceResource}
	 */
	var CardAccountResource = (function (_super) {
	    __extends(CardAccountResource, _super);
	    function CardAccountResource() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Object.defineProperty(CardAccountResource.prototype, "statements", {
	        /**
	         * Get statements of the account
	         * @returns {CardStatementsResource}
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
	 * @class CardStatementsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Statement>}
	 */
	var CardStatementsResource = (function (_super) {
	    __extends(CardStatementsResource, _super);
	    function CardStatementsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * List all statements
	         * @param {NetbankingParameters=} params
	         * @returns {Promise<StatementList>}
	         */
	        _this.list = function (params) {
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
	         * @param {DownloadStatementParameters} params
	         * @returns {Promise<Uint8Array>}
	         */
	        _this.download = function (params) {
	            return CSCoreSDK.ResourceUtils.CallDownload(_this, 'signed/download', 'POST', params);
	        };
	        return _this;
	    }
	    return CardStatementsResource;
	}(CSCoreSDK.Resource));
	exports.CardStatementsResource = CardStatementsResource;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	var bookingDate_1 = __webpack_require__(24);
	var domestic_1 = __webpack_require__(25);
	var limits_1 = __webpack_require__(26);
	var mobile_1 = __webpack_require__(27);
	/**
	 * Get information about payments orders
	 * @class OrdersResource
	 * @extends {CSCoreSDK.Resource}
	 */
	var OrdersResource = (function (_super) {
	    __extends(OrdersResource, _super);
	    function OrdersResource() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Object.defineProperty(OrdersResource.prototype, "payments", {
	        /**
	         * Returns PaymentsResource for listing, deleting and accessing other information about payments
	         * @returns {PaymentsResource}
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
	 * @class PaymentsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<PaymentResource>}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Payment>}
	 */
	var PaymentsResource = (function (_super) {
	    __extends(PaymentsResource, _super);
	    function PaymentsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * List all payments
	         * @param {NetbankingParameters=} params
	         * @returns {Promise<PaymentList>}
	         */
	        _this.list = function (params) {
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
	         * @param {string|number} id
	         * @returns {PaymentResource}
	         */
	        _this.withId = function (id) {
	            return new PaymentResource(id, _this.getPath(), _this._client);
	        };
	        return _this;
	    }
	    Object.defineProperty(PaymentsResource.prototype, "bookingDate", {
	        /**
	         * Get currently available booking date
	         * @returns {PaymentBookingDateResource}
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
	         * @returns {PaymentsDomesticResource}
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
	         * @returns {PaymentLimitsResource}
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
	         * @returns {PaymentMobileResource}
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
	 * @class PaymentResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<Payment>}
	 * @implements {CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse>}
	 */
	var PaymentResource = (function (_super) {
	    __extends(PaymentResource, _super);
	    function PaymentResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Get detail of the payment
	         * @returns {Promise<Payment>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (payment) {
	                // transform ISO dates to native Date objects
	                CSCoreSDK.EntityUtils.addDatesFromISO(['cz-orderingDate', 'executionDate', 'modificationDate', 'transferDate'], payment);
	                // Remove signInfo from response and add SigningObject with key signing
	                CSCoreSDK.SigningUtils.createSigningObject(payment, _this.getClient(), _this.getClient().getPath() + "/orders/payments/" + payment.id);
	                return payment;
	            });
	        };
	        /**
	         * Delete payment
	         * @returns {Promise<NetbankingEmptyResponse>}
	         */
	        _this.delete = function () {
	            return CSCoreSDK.ResourceUtils.CallDelete(_this, null);
	        };
	        return _this;
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Get currently available booking date
	 * @class PaymentBookingDateResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.UpdateEnabled<PaymentBookingDateRequest, PaymentBookingDateResponse>}
	 */
	var PaymentBookingDateResource = (function (_super) {
	    __extends(PaymentBookingDateResource, _super);
	    function PaymentBookingDateResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns current available booking date based on the provided account and optional payment order category parameters
	         * @param {PaymentBookingDateRequest} payload
	         * @returns {Promise<PaymentBookingDateResponse>}
	         */
	        _this.update = function (payload) {
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
	        return _this;
	    }
	    return PaymentBookingDateResource;
	}(CSCoreSDK.Resource));
	exports.PaymentBookingDateResource = PaymentBookingDateResource;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Create domestic payment order
	 * @class PaymentsDomesticResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.CreateEnabled<DomesticPaymentCreateRequest, DomesticPaymentResponse>}
	 */
	var PaymentsDomesticResource = (function (_super) {
	    __extends(PaymentsDomesticResource, _super);
	    function PaymentsDomesticResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Creates domestic payment order and returns it in promise
	         * @param {DomesticPaymentCreateRequest} payload
	         * @returns {Promise<DomesticPaymentResponse>}
	         */
	        _this.create = function (payload) {
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
	         * @param {string} id
	         * @returns {PaymentDomesticResource}
	         */
	        _this.withId = function (id) {
	            return new PaymentDomesticResource(id, _this.getPath(), _this.getClient());
	        };
	        return _this;
	    }
	    return PaymentsDomesticResource;
	}(CSCoreSDK.Resource));
	exports.PaymentsDomesticResource = PaymentsDomesticResource;
	/**
	 * Update domestic payment
	 * @class PaymentDomesticResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.UpdateEnabled<DomesticPaymentUpdateRequest, DomesticPaymentResponse>}
	 */
	var PaymentDomesticResource = (function (_super) {
	    __extends(PaymentDomesticResource, _super);
	    function PaymentDomesticResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Updates domestic payment and returns it in promise
	         * @param {DomesticPaymentUpdateRequest} payload
	         * @returns {Promise<DomesticPaymentResponse>}
	         */
	        _this.update = function (payload) {
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
	        return _this;
	    }
	    return PaymentDomesticResource;
	}(CSCoreSDK.InstanceResource));
	exports.PaymentDomesticResource = PaymentDomesticResource;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Get remaining amounts for payment orders
	 * @class PaymentLimitsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<PaymentLimit>}
	 */
	var PaymentLimitsResource = (function (_super) {
	    __extends(PaymentLimitsResource, _super);
	    function PaymentLimitsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * List all limits for payment orders
	         * @returns {Promise<PaymentLimitsList>}
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'remainingLimits', null);
	        };
	        return _this;
	    }
	    return PaymentLimitsResource;
	}(CSCoreSDK.Resource));
	exports.PaymentLimitsResource = PaymentLimitsResource;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * Recharging the credit available on prepaid cards provided by Vodafone, T-Mobile or O2.
	 * @class PaymentMobileResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.CreateEnabled<MobilePaymentsRequest, MobilePaymentsResponse>}
	 */
	var PaymentMobileResource = (function (_super) {
	    __extends(PaymentMobileResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function PaymentMobileResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Recharge the credit on prepaid card
	         * @param {MobilePaymentsRequest} payload
	         * @returns {Promise<MobilePaymentsResponse>}
	         */
	        _this.create = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallCreate(_this, payload).then(function (response) {
	                // Remove signInfo from response and add SigningObject with key signing
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return PaymentMobileResource;
	}(CSCoreSDK.Resource));
	exports.PaymentMobileResource = PaymentMobileResource;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	var transactions_1 = __webpack_require__(29);
	/**
	 * @class SecuritiesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Security>}
	 * @implements {CSCoreSDK.HasInstanceResource<SecurityResource>}
	 */
	var SecuritiesResource = (function (_super) {
	    __extends(SecuritiesResource, _super);
	    function SecuritiesResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns list of securities accounts for current user. Securities account represents virtual account which holds securities titles and its shares (funds, bonds, etc.).
	         * @param {SecuritiesParams=} params
	         * @returns {Promise<SecurityList>}
	         */
	        _this.list = function (params) {
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
	         * @param {string} id
	         * @returns {SecuritiesResource}
	         */
	        _this.withId = function (id) {
	            return new SecurityResource(id, _this.getPath(), _this.getClient());
	        };
	        return _this;
	    }
	    return SecuritiesResource;
	}(CSCoreSDK.Resource));
	exports.SecuritiesResource = SecuritiesResource;
	/**
	 * @class SecurityResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<Security>}
	 * @implements {CSCoreSDK.UpdateEnabled<SecurityRequest, SecurityResponse>}
	 */
	var SecurityResource = (function (_super) {
	    __extends(SecurityResource, _super);
	    function SecurityResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Get a single securities account with all its details. Securities account represents virtual account which holds securities titles and its shares (funds, bonds, etc.).
	         * @returns {Promise<Security>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                transformDatesInSubSecAccounts(response);
	                resourcifySecurity(response, _this);
	                return response;
	            });
	        };
	        /**
	         * Allows to change a limited set of securities account-settings of one specific contract. Currently only the field alias can be changed. Change only to alias field must not be signed, but response is ready also for signing process.
	         * @param {SecurityRequest} payload
	         * @returns {Promise<SecurityResponse>}
	         */
	        _this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                transformDatesInSubSecAccounts(response);
	                resourcifySecurity(response, _this);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        return _this;
	    }
	    Object.defineProperty(SecurityResource.prototype, "transactions", {
	        /**
	         * Returns security transactions resource
	         * @returns {SecurityTransactionsResource}
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class SecurityTransactionsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<SecurityTransactionResource>}
	 */
	var SecurityTransactionsResource = (function (_super) {
	    __extends(SecurityTransactionsResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function SecurityTransactionsResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Get resource of security transaction with a given id
	         * @param {string} id
	         * @returns {SecurityTransactionResource}
	         */
	        _this.withId = function (id) {
	            return new SecurityTransactionResource(id, _this.getPath(), _this.getClient());
	        };
	        /**
	         * Export transaction history into signed pdf.
	         * @param {ExportTransactionsParameters} params
	         * @return {Promise<Uint8Array>}
	         */
	        _this.export = function (params) {
	            // transform "fields" parameter to comma separated list from array
	            CSCoreSDK.EntityUtils.transformArrayParamsToString(params, 'fields');
	            // transform Date objects to ISO strings
	            CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);
	            return _this._client.callApi(_this.getPath() + "/export", 'POST', params, null, null, 'arraybuffer');
	        };
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return SecurityTransactionsResource;
	}(CSCoreSDK.Resource));
	exports.SecurityTransactionsResource = SecurityTransactionsResource;
	/**
	 * @class SecurityTransactionResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.UpdateEnabled<SecurityTransactionRequest, SecurityTransactionResponse>}
	 */
	var SecurityTransactionResource = (function (_super) {
	    __extends(SecurityTransactionResource, _super);
	    function SecurityTransactionResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Allows to add or change a client's personal note and mark/star the transaction as favorite/important for one specific transaction on selected product.
	         * @param {SecurityTransactionRequest} payload
	         * @returns {Promise<SecurityTransactionResponse>}
	         */
	        _this.update = function (payload) {
	            payload.id = _this._id;
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        return _this;
	    }
	    return SecurityTransactionResource;
	}(CSCoreSDK.InstanceResource));
	exports.SecurityTransactionResource = SecurityTransactionResource;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class SettingsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.GetEnabled<Settings>}
	 * @implements {CSCoreSDK.UpdateEnabled<Settings, SignableSettings>}
	 */
	var SettingsResource = (function (_super) {
	    __extends(SettingsResource, _super);
	    function SettingsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns basic user settings.
	         * @returns {Promise<Settings>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null);
	        };
	        /**
	         * Change user settings. Currently only language can be changed by this endpoint.
	         * @param {Settings} payload
	         * @returns {Promise<SignableSettings>}
	         */
	        _this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        return _this;
	    }
	    return SettingsResource;
	}(CSCoreSDK.Resource));
	exports.SettingsResource = SettingsResource;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class ContactsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Contact>}
	 * @implements {CSCoreSDK.HasInstanceResource<ContactResource>}
	 */
	var ContactsResource = (function (_super) {
	    __extends(ContactsResource, _super);
	    function ContactsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Resource represents list of contact information for current user. It can contain addresses, phones and email addresses.
	         * @returns {Promise<ContactList>}
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'contacts');
	        };
	        /**
	         * Get the resource of contact with a given id
	         * @param {string} id
	         * @returns {ContactResource}
	         */
	        _this.withId = function (id) {
	            return new ContactResource(id, _this.getPath(), _this.getClient());
	        };
	        return _this;
	    }
	    return ContactsResource;
	}(CSCoreSDK.Resource));
	exports.ContactsResource = ContactsResource;
	/**
	 * @class ContactResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<Contact>}
	 */
	var ContactResource = (function (_super) {
	    __extends(ContactResource, _super);
	    function ContactResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Resource represents one specific contact information identified by its id. It can be address, phone or email address.
	         * @returns {Promise<Contact>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null);
	        };
	        return _this;
	    }
	    return ContactResource;
	}(CSCoreSDK.InstanceResource));
	exports.ContactResource = ContactResource;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class PluginsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Plugin>}
	 * @implements {CSCoreSDK.HasInstanceResource<PluginResource>}
	 */
	var PluginsResource = (function (_super) {
	    __extends(PluginsResource, _super);
	    function PluginsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns list of available plugins for current user. Plugin is application functionality which can be enabled/disabled by user.
	         * @param {PluginsParameters} params
	         * @returns {Promise<PluginList>}
	         */
	        _this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'plugins', params, function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['validUntil', 'dateOfActivation'], response);
	                return response;
	            });
	        };
	        /**
	         * Returns resource of plugin with a given id
	         * @param {string} id
	         * @returns {PluginResource}
	         */
	        _this.withId = function (id) {
	            return new PluginResource(id, _this.getPath(), _this.getClient());
	        };
	        return _this;
	    }
	    return PluginsResource;
	}(CSCoreSDK.Resource));
	exports.PluginsResource = PluginsResource;
	/**
	 * @class PluginResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdatePluginRequest, SignablePlugin>}
	 */
	var PluginResource = (function (_super) {
	    __extends(PluginResource, _super);
	    function PluginResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Activation and deactivation of the specific plugin. You can also change settlement account for given plugin and current user.
	         * @param {UpdatePluginRequest} payload
	         * @returns {Promise<SignablePlugin>}
	         */
	        _this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesFromISO(['validUntil', 'dateOfActivation'], response);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        return _this;
	    }
	    return PluginResource;
	}(CSCoreSDK.InstanceResource));
	exports.PluginResource = PluginResource;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	var buildings_1 = __webpack_require__(34);
	var pensions_1 = __webpack_require__(37);
	var insurances_1 = __webpack_require__(38);
	var loyalty_1 = __webpack_require__(48);
	/**
	 * @class ContractsResource
	 * @extends {CSCoreSDK.Resource}
	 */
	var ContractsResource = (function (_super) {
	    __extends(ContractsResource, _super);
	    function ContractsResource() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Object.defineProperty(ContractsResource.prototype, "buildings", {
	        /**
	         * Get buildings contracts resource
	         * @returns {BuildingsContractsResource}
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
	         * @returns {PensionsContractsResource}
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
	         * @returns {InsurancesContractsResource}
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
	         * @returns {LoyaltyContractsResource}
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	var services_1 = __webpack_require__(35);
	var transactions_1 = __webpack_require__(36);
	/**
	 * @class BuildingsContractsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<BuildingsContractResource>}
	 * @implements {CSCoreSDK.PaginatedListEnabled<BuildingsContract>}
	 */
	var BuildingsContractsResource = (function (_super) {
	    __extends(BuildingsContractsResource, _super);
	    function BuildingsContractsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Resource represents list of building savings for current user. It contains building savings and loans from building savings as well.
	         * @param {BuildingsContractsParameters=} params
	         * @returns {Promise<BuildingsContractList>}
	         */
	        _this.list = function (params) {
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
	         * @param {string} id
	         * @returns {BuildingsContractResource}
	         */
	        _this.withId = function (id) {
	            return new BuildingsContractResource(id, _this.getPath(), _this.getClient());
	        };
	        return _this;
	    }
	    return BuildingsContractsResource;
	}(CSCoreSDK.Resource));
	exports.BuildingsContractsResource = BuildingsContractsResource;
	/**
	 * @class BuildingsContractResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<BuildingsContract>}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdateBuildingsContractRequest, UpdateBuildingsContractResponse>}
	 */
	var BuildingsContractResource = (function (_super) {
	    __extends(BuildingsContractResource, _super);
	    function BuildingsContractResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Resource represents one building saving product identified by it's identifier. It can be building saving or loan from building saving.
	         * @returns {Promise<BuildingsContract>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                resourcifyBuildingsContracts(response, _this);
	                transformDates(response);
	                return response;
	            });
	        };
	        /**
	         * Allows to change a limited set of building savings contract-settings of one specific contract. Currently only the field alias can be changed. Change only to alias field must not be signed, but response is ready also for signing process.
	         * @param {UpdateBuildingsContractRequest} payload
	         * @returns {Promise<UpdateBuildingsContractResponse>}
	         */
	        _this.update = function (payload) {
	            payload.id = _this._id;
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                resourcifyBuildingsContracts(response, _this);
	                transformDates(response);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        return _this;
	    }
	    Object.defineProperty(BuildingsContractResource.prototype, "services", {
	        /**
	         * Get buildings contracts services resource
	         * @returns {BuildingsContractsServicesResource}
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
	         * @returns {ContractsTransactionsResource}
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class BuildingsContractsServicesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Service>}
	 */
	var BuildingsContractsServicesResource = (function (_super) {
	    __extends(BuildingsContractsServicesResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function BuildingsContractsServicesResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Returns list of services which are connected or arranged for building saving product instance.
	         * @param {ServiceParameters=} params
	         * @returns {Promise<ServiceList>}
	         */
	        _this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'services', params, function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['dateFrom', 'dateTo'], response);
	                return response;
	            });
	        };
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return BuildingsContractsServicesResource;
	}(CSCoreSDK.Resource));
	exports.BuildingsContractsServicesResource = BuildingsContractsServicesResource;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class ContractsTransactionsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<ContractsTransactionResource>}
	 */
	var ContractsTransactionsResource = (function (_super) {
	    __extends(ContractsTransactionsResource, _super);
	    function ContractsTransactionsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Get contract transaction resource with a given id
	         * @param {string} id
	         * @returns {ContractsTransactionResource}
	         */
	        _this.withId = function (id) {
	            return new ContractsTransactionResource(id, _this.getPath(), _this.getClient());
	        };
	        /**
	         * Export transaction history into signed pdf.
	         * @param {ExportTransactionsParameters} params
	         * @returns {Promise<Uint8Array>}
	         */
	        _this.export = function (params) {
	            // transform "fields" parameter to comma separated list from array
	            CSCoreSDK.EntityUtils.transformArrayParamsToString(params, 'fields');
	            // transform Date objects to ISO strings
	            CSCoreSDK.EntityUtils.transformDatesToISO(['dateFrom', 'dateTo'], params);
	            return _this._client.callApi(_this.getPath() + "/export", 'POST', params, null, null, 'arraybuffer');
	        };
	        return _this;
	    }
	    return ContractsTransactionsResource;
	}(CSCoreSDK.Resource));
	exports.ContractsTransactionsResource = ContractsTransactionsResource;
	/**
	 * @class ContractsTransactionResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.UpdateEnabled<SecurityTransactionRequest, SecurityTransactionResponse>}
	 */
	var ContractsTransactionResource = (function (_super) {
	    __extends(ContractsTransactionResource, _super);
	    function ContractsTransactionResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Allows to add or change a client's personal note and mark/star the transaction as favorite/important for one specific transaction on selected product.
	         * @param {SecurityTransactionRequest} payload
	         * @returns {Promise<SecurityTransactionResponse>}
	         */
	        _this.update = function (payload) {
	            payload.id = _this._id;
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        return _this;
	    }
	    return ContractsTransactionResource;
	}(CSCoreSDK.InstanceResource));
	exports.ContractsTransactionResource = ContractsTransactionResource;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	/// <reference path="../../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
	var CSCoreSDK = __webpack_require__(1);
	var transactions_1 = __webpack_require__(36);
	/**
	 * @class PensionsContractsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Pension>}
	 * @implements {CSCoreSDK.HasInstanceResource<PensionsContractResource>}
	 */
	var PensionsContractsResource = (function (_super) {
	    __extends(PensionsContractsResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function PensionsContractsResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Returns list of pension products which belongs to current user. This includes Pension Savings, Supplementary Pension Insurance and Supplementary Pension Savings.
	         * @param {PensionParameters=} params
	         * @returns {Promise<PensionList>}
	         */
	        _this.list = function (params) {
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
	         * @param {string} id
	         * @returns {PensionsContractResource}
	         */
	        _this.withId = function (id) {
	            return new PensionsContractResource(id, _this.getPath(), _this.getClient());
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return PensionsContractsResource;
	}(CSCoreSDK.Resource));
	exports.PensionsContractsResource = PensionsContractsResource;
	/**
	 * @class PensionsContractResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<Pension>}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdatePensionRequest, UpdatePensionResponse>}
	 */
	var PensionsContractResource = (function (_super) {
	    __extends(PensionsContractResource, _super);
	    function PensionsContractResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns detail of pension product which belongs to current user. This can be Pension Saving, Supplementary Pension Insurance and Supplementary Pension Saving.
	         * @returns {Promise<Pension>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                transformDates(response);
	                resourcifyPension(response, _this);
	                return response;
	            });
	        };
	        /**
	         * Allows to change a limited set of pension contract-settings of one specific contract. Currently only the field alias can be changed. Change only to alias field must not be signed, but response is ready also for signing process.
	         * @param {UpdatePensionRequest} payload
	         * @returns {Promise<UpdatePensionResponse>}
	         */
	        _this.update = function (payload) {
	            payload.id = _this._id;
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                transformDates(response);
	                resourcifyPension(response, _this);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        return _this;
	    }
	    Object.defineProperty(PensionsContractResource.prototype, "transactions", {
	        /**
	         * Returns transactions resource for pension contract
	         * @returns {ContractsTransactionsResource}
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
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
	/**
	 * @class InsurancesContractsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Insurance>}
	 * @implements {CSCoreSDK.HasInstanceResource<InsurancesContractResource>}
	 */
	var InsurancesContractsResource = (function (_super) {
	    __extends(InsurancesContractsResource, _super);
	    function InsurancesContractsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns list of life insurances for current user.
	         * @param {InsurancesParameters=} params
	         * @returns {Promise<InsuranceList>}
	         */
	        _this.list = function (params) {
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
	         * @param {string} id
	         * @returns {InsurancesContractResource}
	         */
	        _this.withId = function (id) {
	            return new InsurancesContractResource(id, _this.getPath(), _this.getClient());
	        };
	        return _this;
	    }
	    return InsurancesContractsResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractsResource = InsurancesContractsResource;
	/**
	 * @class InsurancesContractResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<InsuranceDetail>}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdateInsuranceRequest, UpdateInsuranceResponse>}
	 */
	var InsurancesContractResource = (function (_super) {
	    __extends(InsurancesContractResource, _super);
	    function InsurancesContractResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns detail of the life insurance
	         * @returns {Promise<InsuranceDetail>}
	         */
	        _this.get = function () {
	            return _this._client.callApi(_this.getPath().replace('/my', '/cz/my') + "/detail", 'GET').then(function (response) {
	                transformDates(response);
	                resourcifyInsurance(response, _this);
	                return response;
	            });
	        };
	        /**
	         * Allows to change a limited set of insurance settings of one specific contract. Currently only the field alias can be changed. Change only to alias field must not be signed, but response is ready also for signing process.
	         * @param {UpdateInsuranceRequest} payload
	         * @returns {Promise<UpdateInsuranceResponse>}
	         */
	        _this.update = function (payload) {
	            payload.id = _this._id;
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                transformDates(response);
	                resourcifyInsurance(response, _this);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        return _this;
	    }
	    Object.defineProperty(InsurancesContractResource.prototype, "funds", {
	        /**
	         * Returns funds resource for insurance contract
	         * @returns {InsurancesContractFundsResource}
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
	         * @returns {InsurancesContractBeneficiariesResource}
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
	         * @returns {InsurancesContractInsureesResource}
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
	         * @returns {InsurancesContractPaymentsResource}
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
	         * @returns {InsurancesContractServicesResource}
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
	         * @returns {InsurancesContractEventsResource}
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
	         * @returns {InsurancesContractTaxBenefitsResource}
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
	         * @returns {InsurancesContractStrategiesResource}
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
	         * @returns {InsurancesContractTransferResource}
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class InsurancesContractFundsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Fund>}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdateFundRequest, UpdateFundResponse>}
	 */
	var InsurancesContractFundsResource = (function (_super) {
	    __extends(InsurancesContractFundsResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function InsurancesContractFundsResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Returns detail of distribution of capital value into funds.
	         * @returns {Promise<FundList>}
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'funds', null);
	        };
	        /**
	         * Change the distribution of capital value into funds.
	         * @param {UpdateFundRequest} payload
	         * @returns {Promise<UpdateFundResponse>}
	         */
	        _this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return InsurancesContractFundsResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractFundsResource = InsurancesContractFundsResource;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class InsurancesContractBeneficiariesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<InsuranceBeneficiary>}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdateInsuranceBeneficiaries, UpdateInsuranceBeneficiaries>}
	 */
	var InsurancesContractBeneficiariesResource = (function (_super) {
	    __extends(InsurancesContractBeneficiariesResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function InsurancesContractBeneficiariesResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Returns list of beneficiaries related to the insurance contract.
	         * @returns {Promise<InsuranceBeneficiaryList>}
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'beneficiaries', null).then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['birthdate'], response);
	                return response;
	            });
	        };
	        /**
	         * Change beneficiaries and distribution of insurance among beneficiaries.
	         * @param {UpdateInsuranceBeneficiaries} payload
	         * @returns {Promise<UpdateInsuranceBeneficiaries>}
	         */
	        _this.update = function (payload) {
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
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return InsurancesContractBeneficiariesResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractBeneficiariesResource = InsurancesContractBeneficiariesResource;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class InsurancesContractInsureesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Insuree>}
	 */
	var InsurancesContractInsureesResource = (function (_super) {
	    __extends(InsurancesContractInsureesResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function InsurancesContractInsureesResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Returns list of insurees related to the insurance contract.
	         * @returns {Promise<InsureeList>}
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'insurees');
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return InsurancesContractInsureesResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractInsureesResource = InsurancesContractInsureesResource;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class InsurancesContractPaymentsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<ContractPayment>}
	 */
	var InsurancesContractPaymentsResource = (function (_super) {
	    __extends(InsurancesContractPaymentsResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function InsurancesContractPaymentsResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Returns list of life insurance payments. List contains one upcoming payment and payments history for 2 years.
	         * @returns {Promise<ContractPaymentList>}
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'payments').then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['transactionDate', 'instructionFrom', 'instructionTo'], response);
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return InsurancesContractPaymentsResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractPaymentsResource = InsurancesContractPaymentsResource;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class InsurancesContractServicesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<InsuranceService>}
	 */
	var InsurancesContractServicesResource = (function (_super) {
	    __extends(InsurancesContractServicesResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function InsurancesContractServicesResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Returns list of services for the life insurance
	         * @returns {Promise<InsuranceServiceList>}
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'services').then(function (response) {
	                response.items.forEach(function (x) {
	                    transformDates(x);
	                });
	                return response;
	            });
	        };
	        /**
	         * Allows activation of risk sports insurance.
	         * @param {RiskSportsUpdateRequest} payload
	         * @returns {Promise<ActivateRiskSportsResponse>}
	         */
	        _this.activateRiskSports = function (payload) {
	            CSCoreSDK.EntityUtils.transformDatesToSimpleISO(['dateFrom', 'dateTo'], payload);
	            return CSCoreSDK.ResourceUtils.CallUpdateWithSuffix(_this, 'riskSportsActivation', payload).then(function (response) {
	                transformDates(response);
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        /**
	         * Allows deactivation of risk sports insurance.
	         * @param {RiskSportsUpdateRequest} payload
	         * @returns {Promise<DeactivateRiskSportsResponse>}
	         */
	        _this.deactivateRiskSports = function (payload) {
	            CSCoreSDK.EntityUtils.transformDatesToSimpleISO(['dateFrom', 'dateTo'], payload);
	            return CSCoreSDK.ResourceUtils.CallUpdateWithSuffix(_this, 'riskSportsDeactivation', payload).then(function (response) {
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class InsurancesContractEventsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<ContractEvent>}
	 */
	var InsurancesContractEventsResource = (function (_super) {
	    __extends(InsurancesContractEventsResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function InsurancesContractEventsResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Returns list of events for the life insurance
	         * @returns {Promise<ContractEventList>}
	         */
	        _this.list = function () {
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
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return InsurancesContractEventsResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractEventsResource = InsurancesContractEventsResource;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class InsurancesContractTaxBenefitsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.GetEnabled<TaxBenefit>}
	 */
	var InsurancesContractTaxBenefitsResource = (function (_super) {
	    __extends(InsurancesContractTaxBenefitsResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function InsurancesContractTaxBenefitsResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Returns tax benefits for the life insurance
	         * @returns {Promise<TaxBenefit>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null);
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return InsurancesContractTaxBenefitsResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractTaxBenefitsResource = InsurancesContractTaxBenefitsResource;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class InsurancesContractStrategiesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<ContractStrategy>}
	 */
	var InsurancesContractStrategiesResource = (function (_super) {
	    __extends(InsurancesContractStrategiesResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function InsurancesContractStrategiesResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Returns list of strategies with corresponsing funds allocation for the life insurance
	         * @returns {Promise<ContractStrategyList>}
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'strategies');
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return InsurancesContractStrategiesResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractStrategiesResource = InsurancesContractStrategiesResource;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class InsurancesContractTransferResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdateContractTrasferRequest, UpdateContractTrasferResponse>}
	 */
	var InsurancesContractTransferResource = (function (_super) {
	    __extends(InsurancesContractTransferResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function InsurancesContractTransferResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Creates insurance transfer - premium payment, extra deposit or recommended deposit.
	         * @param {UpdateContractTrasferRequest} payload
	         * @returns {Promise<UpdateContractTrasferResponse>}
	         */
	        _this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath());
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return InsurancesContractTransferResource;
	}(CSCoreSDK.Resource));
	exports.InsurancesContractTransferResource = InsurancesContractTransferResource;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class LoyaltyContractsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.GetEnabled<Loyalty>}
	 */
	var LoyaltyContractsResource = (function (_super) {
	    __extends(LoyaltyContractsResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function LoyaltyContractsResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Get data about iBod account of the current client.
	         * @returns {Promise<Loyalty>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesFromISO('exportDate', response);
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return LoyaltyContractsResource;
	}(CSCoreSDK.Resource));
	exports.LoyaltyContractsResource = LoyaltyContractsResource;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class ServicesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Service>}
	 */
	var ServicesResource = (function (_super) {
	    __extends(ServicesResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function ServicesResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Returns possibly empty list of services for current user. This resource represents only services which are not bound to any product.
	         * @param {ServiceParameters=} params
	         * @returns {Promise<ServiceList>}
	         */
	        _this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'services', params, function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['dateFrom', 'dateTo'], response);
	                return response;
	            });
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return ServicesResource;
	}(CSCoreSDK.Resource));
	exports.ServicesResource = ServicesResource;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	var mandatory_1 = __webpack_require__(51);
	var attachments_1 = __webpack_require__(52);
	/**
	 * @class MessagesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Message>}
	 * @implements {CSCoreSDK.HasInstanceResource<MessageResource>}
	 */
	var MessagesResource = (function (_super) {
	    __extends(MessagesResource, _super);
	    function MessagesResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Get all messages for current user generated by bank itself. Message can be read or unread, mandatory and non-mandatory. This call might return different messages based on appId of the caller (for example, some messages might be specific to an application).
	         * @param {MessagesParameters=} params
	         * @returns {Promise<MessageList>}
	         */
	        _this.list = function (params) {
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
	         * @param {string} id
	         * @returns {MessageResource}
	         */
	        _this.withId = function (id) {
	            return new MessageResource(id, _this.getPath(), _this.getClient());
	        };
	        return _this;
	    }
	    Object.defineProperty(MessagesResource.prototype, "mandatory", {
	        /**
	         * Get messages mandatory resource
	         * @returns {MessagesMandatoryResource}
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
	/**
	 * @class MessageResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<Message>}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdateMessageRequest, NetbankingEmptyResponse>}
	 * @implements {CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse>}
	 */
	var MessageResource = (function (_super) {
	    __extends(MessageResource, _super);
	    function MessageResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Get one specific messages for current user generated by bank itself. Message can be read or unread, mandatory and non-mandatory.
	         * @returns {Promise<Message>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                transformDates(response);
	                resourcifyMessages(response, _this);
	                return response;
	            });
	        };
	        /**
	         * After message has been read by user it should be marked accordingly by this endpoint.
	         * @param {UpdateMessageRequest} payload
	         * @returns {Promise<NetbankingEmptyResponse>}
	         */
	        _this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload);
	        };
	        /**
	         * Resource for deleting message by its identifier. Only read messages can be deleted.
	         * @returns {Promise<NetbankingEmptyResponse>}
	         */
	        _this.delete = function () {
	            return CSCoreSDK.ResourceUtils.CallDelete(_this, null);
	        };
	        return _this;
	    }
	    Object.defineProperty(MessageResource.prototype, "attachments", {
	        /**
	         * Get messages attachments resource
	         * @returns {MessageAttachmentsResource}
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class MessagesMandatoryResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Message>}
	 */
	var MessagesMandatoryResource = (function (_super) {
	    __extends(MessagesMandatoryResource, _super);
	    function MessagesMandatoryResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns all mandatory messages. This call might return different messages based on appId of the caller (for example, some messages might be specific to an application). Which messages can be seen by which application can be configured on the presto server side.
	         * @return {Promise<MandatoryMessageList>}
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'messages').then(function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['date'], response);
	                return response;
	            });
	        };
	        return _this;
	    }
	    return MessagesMandatoryResource;
	}(CSCoreSDK.Resource));
	exports.MessagesMandatoryResource = MessagesMandatoryResource;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class MessageAttachmentsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<MessageAttachmentResource>}
	 */
	var MessageAttachmentsResource = (function (_super) {
	    __extends(MessageAttachmentsResource, _super);
	    function MessageAttachmentsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Get the resource of attachments
	         * @param {string} id
	         * @returns {MessageAttachmentResource}
	         */
	        _this.withId = function (id) {
	            return new MessageAttachmentResource(id, _this.getPath(), _this.getClient());
	        };
	        return _this;
	    }
	    return MessageAttachmentsResource;
	}(CSCoreSDK.Resource));
	exports.MessageAttachmentsResource = MessageAttachmentsResource;
	/**
	 * @class MessageAttachmentResource
	 * @extends {CSCoreSDK.InstanceResource}
	 */
	var MessageAttachmentResource = (function (_super) {
	    __extends(MessageAttachmentResource, _super);
	    function MessageAttachmentResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Downloads attachment file. The binary representation of an attachment file, with a “Content-Disposition” header of type attachment (including the filename), in order to instruct the browser to open a save dialog.
	         * @returns {Promise<Uint8Array>}
	         */
	        _this.download = function () {
	            return CSCoreSDK.ResourceUtils.CallDownload(_this, null, 'POST');
	        };
	        return _this;
	    }
	    return MessageAttachmentResource;
	}(CSCoreSDK.InstanceResource));
	exports.MessageAttachmentResource = MessageAttachmentResource;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class TemplateResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Template>}
	 * @implements {CSCoreSDK.HasInstanceResource<TemplateResource>}
	 */
	var TemplatesResource = (function (_super) {
	    __extends(TemplatesResource, _super);
	    function TemplatesResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * List of payment templates for current user.
	         * @param {TemplatesParameters=} params
	         * @returns {Promise<TemplateList>}
	         */
	        _this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'templates', params, function (response) {
	                response.items.forEach(function (item) {
	                    resourcifyTemplates(item, _this.withId(item.id));
	                });
	                return response;
	            });
	        };
	        /**
	         * Get resource for template with a given id
	         * @param {string} id
	         * @returns {TemplateResource}
	         */
	        _this.withId = function (id) {
	            return new TemplateResource(id, _this.getPath(), _this.getClient());
	        };
	        return _this;
	    }
	    return TemplatesResource;
	}(CSCoreSDK.Resource));
	exports.TemplatesResource = TemplatesResource;
	/**
	 * @class TemplateResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<Template>}
	 */
	var TemplateResource = (function (_super) {
	    __extends(TemplateResource, _super);
	    function TemplateResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Get payment template detail
	         * @returns {Promise<Template>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                resourcifyTemplates(response, _this);
	                return response;
	            });
	        };
	        return _this;
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class PhoneNumbersResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<PhoneNumber>}
	 * @implements {CSCoreSDK.CreateEnabled<PhoneNumberRequest, PhoneNumber>}
	 * @implements {CSCoreSDK.HasInstanceResource<PhoneNumberResource>}
	 */
	var PhoneNumbersResource = (function (_super) {
	    __extends(PhoneNumbersResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function PhoneNumbersResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Returns list of phone numbers
	         * @returns {Promise<PhoneNumberList>}
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'phoneNumbers').then(function (response) {
	                response.items.forEach(function (x) {
	                    resourcifyPhoneNumbers(x, _this.withId(x.id));
	                });
	                return response;
	            });
	        };
	        /**
	         * Creates new phone number
	         * @param {PhoneNumberRequest} payload
	         * @returns {Promise<PhoneNumber>}
	         */
	        _this.create = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallCreate(_this, payload).then(function (response) {
	                resourcifyPhoneNumbers(response, _this.withId(response.id));
	                return response;
	            });
	        };
	        /**
	         * Get single phone number with a given id
	         * @param {string} id
	         * @returns {PhoneNumberResource}
	         */
	        _this.withId = function (id) {
	            return new PhoneNumberResource(id, _this.getPath(), _this.getClient());
	        };
	        // insert 'cz' resource into the resource's path because the api requires it in some resources
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return PhoneNumbersResource;
	}(CSCoreSDK.Resource));
	exports.PhoneNumbersResource = PhoneNumbersResource;
	/**
	 * @class PhoneNumberResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.UpdateEnabled<PhoneNumberRequest, PhoneNumber>}
	 * @implements {CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse>}
	 */
	var PhoneNumberResource = (function (_super) {
	    __extends(PhoneNumberResource, _super);
	    function PhoneNumberResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Updates phone number
	         * @param {PhoneNumberRequest} payload
	         * @returns {Promise<PhoneNumber>}
	         */
	        _this.update = function (payload) {
	            payload.id = _this._id;
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload).then(function (response) {
	                resourcifyPhoneNumbers(response, _this);
	                return response;
	            });
	        };
	        /**
	         * Deletes phone number
	         * @returns {Promise<NetbankingEmptyResponse>}
	         */
	        _this.delete = function () {
	            return CSCoreSDK.ResourceUtils.CallDelete(_this, null);
	        };
	        return _this;
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class BudgetsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Budget>}
	 */
	var BudgetsResource = (function (_super) {
	    __extends(BudgetsResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function BudgetsResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Returns list of user's tracked categories and its limits.
	         * @returns {Promise<BudgetList>}
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'budgets');
	        };
	        /**
	         * Set new value of tracked categories.
	         * @param {UpdateBudgets} payload
	         * @returns {Promise<UpdateBudgets>}
	         */
	        _this.update = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallUpdate(_this, payload);
	        };
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
	    }
	    return BudgetsResource;
	}(CSCoreSDK.Resource));
	exports.BudgetsResource = BudgetsResource;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class GoalsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Goal>}
	 * @implements {CSCoreSDK.UpdateEnabled<UpdateGoal, UpdateGoal>}
	 */
	var GoalsResource = (function (_super) {
	    __extends(GoalsResource, _super);
	    /**
	     * @param {string} basePath
	     * @param {CSCoreSDK.WebApiClient} client
	     */
	    function GoalsResource(basePath, client) {
	        var _this = _super.call(this, basePath, client) || this;
	        /**
	         * Returns list of user's saving goals except of completed ones. In price, only CZK currency is supported. If user has never set any goal, the response is empty.
	         * @returns {Promise<GoalList>}
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'goals').then(function (response) {
	                response.items.forEach(function (item) {
	                    transformDates(item);
	                });
	                return response;
	            });
	        };
	        /**
	         * Set new value of goals. In price, only CZK currency is supported. If completed flag is not present, false value is supposed. All goals of given client are replaced - old ones (except of completed) are deleted and these new specified are inserted.
	         * @param {UpdateGoal} payload
	         * @returns {Promise<UpdateGoal>}
	         */
	        _this.update = function (payload) {
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
	        _this._path = _this.getPath().replace('/my', '/cz/my');
	        return _this;
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class PromotionsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Promotion>}
	 * @implements {CSCoreSDK.CreateEnabled<CreatePromotionRequest, CreatePromotionResponse>}
	 */
	var PromotionsResource = (function (_super) {
	    __extends(PromotionsResource, _super);
	    function PromotionsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns promotion list for the current user
	         * @returns {Promise<PromotionList>}
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'promotions');
	        };
	        /**
	         * Hide specified promotion
	         * @param {CreatePromotionRequest} payload
	         * @returns {Promise<CreatePromotionResponse>}
	         */
	        _this.create = function (payload) {
	            return _this._client.callApi(_this.getPath().replace('promotions', 'actions'), 'POST', null, payload);
	        };
	        return _this;
	    }
	    return PromotionsResource;
	}(CSCoreSDK.Resource));
	exports.PromotionsResource = PromotionsResource;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class AuthorizationLimitsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ParametrizedListEnabled<AuthorizationLimitsParams, AuthorizationLimit>}
	 * @implements {CSCoreSDK.HasInstanceResource<AuthorizationLimitResource>}
	 */
	var AuthorizationLimitsResource = (function (_super) {
	    __extends(AuthorizationLimitsResource, _super);
	    function AuthorizationLimitsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Return all user local specific payment order entry limits for for all user active authorization methods and channels/applications used in country.
	         * @param {AuthorizationLimitsParams=} params
	         * @returns {Promise<AuthorizationLimitList>}
	         */
	        _this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, 'limits', params).then(function (response) {
	                response.items.forEach(function (x) {
	                    resourcifyLimits(x, _this.withId(x.id));
	                });
	                return response;
	            });
	        };
	        /**
	         * Get the resource of authorization limit with a given id
	         * @param {string} id
	         * @returns {AuthorizationLimitResource}
	         */
	        _this.withId = function (id) {
	            return new AuthorizationLimitResource(id, _this.getPath(), _this.getClient());
	        };
	        return _this;
	    }
	    return AuthorizationLimitsResource;
	}(CSCoreSDK.Resource));
	exports.AuthorizationLimitsResource = AuthorizationLimitsResource;
	/**
	 * @class AuthorizationLimitResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<AuthorizationLimit>}
	 */
	var AuthorizationLimitResource = (function (_super) {
	    __extends(AuthorizationLimitResource, _super);
	    function AuthorizationLimitResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Return local specific payment order entry limits valid for combination of user, authorization method and used channel/application. For example user could define different limits for TAC authorization via George and mobile applications.
	         * @returns {Promise<AuthorizationLimit>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                resourcifyLimits(response, _this);
	                return response;
	            });
	        };
	        return _this;
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
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class AuthorizationTokenResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.DeleteEnabled<NetbankingEmptyResponse>}
	 */
	var AuthorizationTokenResource = (function (_super) {
	    __extends(AuthorizationTokenResource, _super);
	    function AuthorizationTokenResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Invalidate authorization token.
	         * @returns {Promise<NetbankingEmptyResponse>}
	         */
	        _this.delete = function () {
	            return _this._client.callApi(_this.getPath().replace('/my', ''), 'DELETE');
	        };
	        return _this;
	    }
	    return AuthorizationTokenResource;
	}(CSCoreSDK.Resource));
	exports.AuthorizationTokenResource = AuthorizationTokenResource;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * @class BundlesResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.CreateEnabled<BundleCreateRequest, BundleResponse>}
	 */
	var BundlesResource = (function (_super) {
	    __extends(BundlesResource, _super);
	    function BundlesResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * @param {BundleCreateRequest} payload
	         * @returns {Promise<BundleResponse>}
	         */
	        _this.create = function (payload) {
	            return CSCoreSDK.ResourceUtils.CallCreate(_this, payload).then(function (response) {
	                CSCoreSDK.SigningUtils.createSigningObject(response, _this.getClient(), _this.getPath() + "/" + response.id);
	                return response;
	            });
	        };
	        return _this;
	    }
	    return BundlesResource;
	}(CSCoreSDK.Resource));
	exports.BundlesResource = BundlesResource;


/***/ }
/******/ ]);