/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
var CoreSDK = require('cs-core-sdk');
var netbanking  = require('../build/cs-netbanking-sdk.node.js');
var fs = require('fs');
var path = require('path');
var _ = <UnderscoreStatic>(require('underscore'));
var judge : CSCoreSDK.Judge = null;
var judgeSession : CSCoreSDK.JudgeSession = null;
var client : CSNetbankingSDK.NetbankingClient = null;
var expectToBe = CoreSDK.TestUtils.expectToBe;
var expectDate = CoreSDK.TestUtils.expectDate;
var logJudgeError = CoreSDK.TestUtils.logJudgeError;
var file = fs.readFileSync(path.join(__dirname, 'test-pdf.pdf'));

describe("Netbanking SDK",function(){
    var originalTimeoutInterval = null;
    
    beforeAll(function(){
        judge = new CoreSDK.Judge();
        //Because Judge starts slowly on the first request
        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    
    afterAll(function(){
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
    });    
    
    beforeEach(function(){
        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment)
        client =  netbanking.getClient();	
        judgeSession = judge.startNewSession();
    });

    var exportTransactionsPayload = {
        dateFrom: new Date(1999, 8, 27),
        dateTo: new Date(2000, 8, 27),
        fields: [
            'bookingDate',
            'partner',
            'amount',
            'currency'
        ],
        showAccountName: true,
        showAccountNumber: true,
        showTimespan: true,
        showBalance: true
    }
    
    function processCard(card) {
        
        expectDate(card, {
            expiryDate: '2018-03-31',
            validFromDate: '2015-04-01'
        });
        
        expectToBe(card, {
            id: '33A813886442D946122C78305EC4E482DE9F574D',
            owner: 'VOJTÍŠKOVÁ ANNA',
            number: '451161XXXXXX1987',
        });
        
        expectToBe(card.mainAccount, {
            id: '076E1DBCCCD38729A99D93AC8D3E8273237C7E36',
            holderName: 'Anna Vojtíšková',
        });
        
        expectToBe(card.mainAccount.accountno, {
            number: '2328489013',
            bankCode: '0800',
            countryCode: 'CZ' 
        });
    }
    
    function processSimpleCards(cards) {
        expect(cards.items.length).toBe(2);
                
        expectToBe(cards.pagination, {
            pageNumber: 0,
            pageCount: 1,
            pageSize: 2 
        });
        
        processCard(cards.items[0]);
        
        expectToBe(cards.items[1], {
            id: '3FB37388FC58076DEAD3DE282E075592A299B596',
            owner: 'VOJTÍŠKOVÁ ANNA',
            number: '451161XXXXXX1552'
        });
    }
    
    function processCards(cards) {
        var card = cards.items[0];
                
        expectToBe(cards.pagination, {
            pageNumber: 0,
            pageCount: 2,
            pageSize: 1,
            nextPage: 1 
        });
        
        expectToBe(card, {
            id: 'A705433CFCD205249F4B816F2C63D309AEEFF4C9',
            number: '451161XXXXXX7982',
            alias: 'moje karta'
        });
        
        expectDate(card, {
            expiryDate: '2017-11-30',
            validFromDate: '2014-12-01',
        });
    }
    
    function processStatements(statements) {
        var statement = statements.items[0];
        expectToBe(statements.pagination, {
            pageNumber: 0,
            pageCount: 2,
            pageSize: 1,
            nextPage: 1 
        });
        
        expectDate(statement, {
            statementDate: '2016-02-29T00:00:00+01:00'
        });
        
        expectToBe(statement, {
            id: '06029392819b0198',
            number: 2,
            periodicity: 'MONTHLY',
            language: 'cs'
        });
    }
   
   describe('cards', () => {
        
        it('retrieves a list of cards', done => {
            judgeSession.setNextCase('cards.list').then(() => {
                return client.cards.list();
            }).then(cards => {
                
                processSimpleCards(cards);
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('tests pagination for cards list', done => {
            var response;
            judgeSession.setNextCase('cards.list.page0').then(() => {
                return client.cards.list({
                    pageNumber: 0,
                    pageSize: 1
                });
            }).then(cards => {
                
                processCards(cards);
                response = cards;
            }).then(() => {
                return judgeSession.setNextCase('cards.list.page1');
            }).then(() => {
                return response.nextPage();
            }).then(cards => {
                
                var card = cards.items[0];
                
                expectToBe(cards.pagination, {
                    pageNumber: 1,
                    pageCount: 2,
                    pageSize: 1 
                });
                
                expectToBe(card, {
                    id: 'FAFBFBDCAE6465F6DB8058746A828E195922CB15',
                    owner: 'VRBA ALEŠ',
                    number: '451161XXXXXX6026',
                    state: 'ACTIVE'
                });
                
                expectDate(card, {
                    expiryDate: '2018-03-31',
                    validFromDate: '2015-04-01'
                });
                
                response = cards;
            }).then(() => {
                return judgeSession.setNextCase('cards.list.page0');
            }).then(() => {
                return response.prevPage();
            }).then(cards => {
                
                processCards(cards)
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
       });
        
        it('retrieves cards detail with a given id', done => {
            judgeSession.setNextCase('cards.withId.get').then(() => {
                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').get();
            }).then(card => {
                processCard(card);
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('retrieves cards detail by using convenience method on cards listing', done => {
            var response;
            judgeSession.setNextCase('cards.list').then(() => {
                return client.cards.list();
            }).then(cards => {
                processSimpleCards(cards);
                response = cards;
            }).then(() => {
                return judgeSession.setNextCase('cards.withId.get');
            }).then(() => {
                return response.items[0].get();
            }).then(card => {
                processCard(card);
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('updates alias of a given card', done => {
            judgeSession.setNextCase('cards.withId.update').then(() => {
                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').update({
                    alias: 'moje karta' 
                });
            }).then(card => {
                expectToBe(card, {
                    id: '33A813886442D946122C78305EC4E482DE9F574D',
                    number: '451161XXXXXX7982',
                    alias: 'moje karta'
                });     

                expectDate(card, {
                    expiryDate: '2017-11-30',
                    validFromDate: '2014-12-01'
                });
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('updates alias of a card by using convenience method on cards listing', done => {
            var response;
            judgeSession.setNextCase('cards.list').then(() => {
                return client.cards.list();
            }).then(cards => {
                processSimpleCards(cards);
                response = cards;
            }).then(() => {
                return judgeSession.setNextCase('cards.withId.update');
            }).then(() => {
                return response.items[0].update({
                    alias: 'moje karta'
                });
            }).then(card => {
                expectToBe(card, {
                    id: '33A813886442D946122C78305EC4E482DE9F574D',
                    number: '451161XXXXXX7982',
                    alias: 'moje karta'
                });     

                expectDate(card, {
                    expiryDate: '2017-11-30',
                    validFromDate: '2014-12-01'
                });
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('retrieves current delivery settings for a given card', done => {
            judgeSession.setNextCase('cards.withId.delivery.get').then(() => {
                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').delivery.get();
            }).then(delivery => {
                
               expectToBe(delivery, {
                   cardDeliveryMode: 'BRANCH',
                   branchId: '1075',
               });
               
               expectToBe(delivery.address, {
                  street: 'Antala Staška',
                  buildingApartment: '1292',
                  streetNumber: '32' 
               });
               
               done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('retrieves current delivery settings of a card by using convenience method on cards listing', done => {
            var response;
            judgeSession.setNextCase('cards.list').then(() => {
                return client.cards.list();
            }).then(cards => {
                processSimpleCards(cards);
                response = cards;
            }).then(() => {
                return judgeSession.setNextCase('cards.withId.delivery.get');
            }).then(() => {
                return response.items[0].delivery.get();
            }).then(delivery => {
                expectToBe(delivery, {
                   cardDeliveryMode: 'BRANCH',
                   branchId: '1075',
               });
               
               expectToBe(delivery.address, {
                  street: 'Antala Staška',
                  buildingApartment: '1292',
                  streetNumber: '32' 
               });
               
               done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('updates current delivery mode to branch', done => {
            judgeSession.setNextCase('cards.withId.delivery.update').then(() => {
                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').delivery.update({
                    cardDeliveryMode: "BRANCH",
                    confirmations: [
                        {
                            email: "john.doe@test.com",
                            language: "cs"
                        }
                    ] 
                });
            }).then(delivery => {
                expectToBe(delivery, {
                    cardDeliveryMode: 'BRANCH',
                    branchId: '1075',
                });
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('updates current delivery mode to branch by convenience method on cards listing', done => {
            var response;
            judgeSession.setNextCase('cards.list').then(() => {
                return client.cards.list();
            }).then(cards => {
                processSimpleCards(cards);
                response = cards;
            }).then(() => {
                return judgeSession.setNextCase('cards.withId.delivery.update');
            }).then(() => {
                return response.items[0].delivery.update({
                    cardDeliveryMode: "BRANCH",
                    confirmations: [
                        {
                            email: "john.doe@test.com",
                            language: "cs"
                        }
                    ]
                });
            }).then(delivery => {
                expectToBe(delivery, {
                    cardDeliveryMode: 'BRANCH',
                    branchId: '1075',
                });
               
               done();
            }).catch(e => {
                logJudgeError(e);
            });         
        });
        
        it('changes personal note on a given transactions', done => {
            judgeSession.setNextCase('cards.withId.transactions.withId.update').then(() => {
                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').transactions.withId('23498').update({
                    note: "note",
                    flags: [
                        "hasStar"
                    ]
                });
            }).then(response => {
                expectToBe(response.cardTransaction, {
                    id: '23498',
                    note: 'note'
                });
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('exports transactions into pdf', done => {
            judgeSession.setNextCase('cards.withId.transactions.export').then(() => {
                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').transactions.export(exportTransactionsPayload);
            }).then(response => {
                expect(response).toBeTruthy();
                expect(_.isEqual(file.toString(), response.toString())).toBe(true);
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('exports transactions into pdf twice from same resource', done => {
            var resource = client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').transactions;
            
            judgeSession.setNextCase('cards.withId.transactions.export').then(() => {
                return resource.export(exportTransactionsPayload);
            }).then(response => {
                expect(response).toBeTruthy();
                expect(_.isEqual(file.toString(), response.toString())).toBe(true);

                return judgeSession.setNextCase('cards.withId.transactions.export');
            }).then(() => {
                return resource.export(exportTransactionsPayload);
            }).then(response => {
                expect(response).toBeTruthy();
                expect(_.isEqual(file.toString(), response.toString())).toBe(true);
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('exports transactions into pdf by using convenience method on cards listing', done => {
            var response;
            judgeSession.setNextCase('cards.list').then(() => {
                return client.cards.list();
            }).then(cards => {
                processSimpleCards(cards);
                response = cards;
            }).then(() => {
                return judgeSession.setNextCase('cards.withId.transactions.export');
            }).then(() => {
                return response.items[0].transactions.export({
                    dateFrom: new Date(1999, 8, 27),
                    dateTo: new Date(2000, 8, 27),
                    fields: [
                        'bookingDate',
                        'partner',
                        'amount',
                        'currency'
                    ],
                    showAccountName: true,
                    showAccountNumber: true,
                    showTimespan: true,
                    showBalance: true
                });
            }).then(response => {
                expect(response).toBeTruthy();
                expect(_.isEqual(file.toString(), response.toString())).toBe(true);
                
                done(); 
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('retrieves limits of a card with a given id', done => {
            judgeSession.setNextCase('cards.withId.limits.list').then(() => {
                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').limits.list();
            }).then(limits => {
                expect(limits.items.length).toBe(3);
                
                expectToBe(limits.items[0], {
                    limitType: 'ATM',
                    limitPeriod: '1D'
                });
                
                expectToBe(limits.items[0].limit, {
                    value: 200000,
                    precision: 2,
                    currency: 'CZK'
                });
                
                done();
            }).catch(e => {
                logJudgeError(e);
            })
        });
        
        it('retrieves limits of a card  by using convenience method on cards listing', done => {
            var response;
            judgeSession.setNextCase('cards.list').then(() => {
                return client.cards.list();
            }).then(cards => {
                processSimpleCards(cards);
                response = cards;
            }).then(() => {
                return judgeSession.setNextCase('cards.withId.limits.list');
            }).then(() => {
                return response.items[0].limits.list();
            }).then(limits => {
                expectToBe(limits.items[0], {
                    limitType: 'ATM',
                    limitPeriod: '1D'
                });
                
                expectToBe(limits.items[0].limit, {
                    value: 200000,
                    precision: 2,
                    currency: 'CZK'
                });
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('actives card with a given id', done => {
           judgeSession.setNextCase('cards.withId.actions.update').then(() => {
               return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').actions.update({
                  action: 'ACTIVATE_CARD' 
               });
           }).then(response => {
               expectToBe(response.signInfo, {
                   state: 'OPEN',
                   signId: '1883293134'
               });
               
               done();
           }).catch(e => {
               logJudgeError(e);
           });
        });
        
        it('actives card by using convenience method on cards listing', done => {
           var response;
           judgeSession.setNextCase('cards.list').then(() => {
               return client.cards.list();
           }).then(cards => {
               processSimpleCards(cards);
               response = cards;
           }).then(() => {
               return judgeSession.setNextCase('cards.withId.actions.update');
           }).then(() => {
               return response.items[0].actions.update({
                   action: 'ACTIVATE_CARD'
               });
           }).then(response => {
               expectToBe(response.signInfo, {
                   state: 'OPEN',
                   signId: '1883293134'
               });
               done();
           }).catch(e => {
               logJudgeError(e);
           });
        });
        
        it('changes atm limit', done => {
            judgeSession.setNextCase('cards.withId.limits.update').then(() => {
                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').limits.update({
                    limits: [
                        {
                            limitType: 'ATM',
                            limitPeriod: '5D',
                            limit: {
                                value: 1100000,
                                precision: 2,
                                currency: 'CZK'
                            }
                        }
                    ]
                });
            }).then(response => {
                expectToBe(response.signInfo, {
                    state: 'OPEN',
                    signId: '1480132234'
                });
                
                expectToBe(response.limits[0], {
                    limitType: 'ATM',
                    limitPeriod: '1D'
                });
                
                expectToBe(response.limits[0].limit, {
                    value: 1100000,
                    precision: 2,
                    currency: 'CZK'
                });
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('retrieves 3D secure info', done => {
            judgeSession.setNextCase('cards.withId.secure3D.get').then(() => {
                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').secure3d.get();
            }).then(settings => {
                
                expectToBe(settings, {
                    status: 'OK',
                    phoneNumber: '+420739473460',
                    language: 'cs'
                });
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('retrieves 3D secure info by convenience method on cards listing', done => {
            var response;
            judgeSession.setNextCase('cards.list').then(() => {
                return client.cards.list();
            }).then(cards => {
                processSimpleCards(cards);
                response = cards;
            }).then(() => {
                return judgeSession.setNextCase('cards.withId.secure3D.get');
            }).then(() => {
                return response.items[0].secure3d.get();
            }).then(settings => {
                expectToBe(settings, {
                    status: 'OK',
                    phoneNumber: '+420739473460',
                    language: 'cs'
                });
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('pays up a credit card debt', done => {
            judgeSession.setNextCase('cards.withId.transfers.update').then(() => {
                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').transfer.update({
                    type: "DEBT_REPAYMENT",
                    sender: {
                        accountno: {
                            number: "2326573123",
                            bankCode: "0800"
                        }
                    },
                    amount: {
                        value: 500000,
                        precision: 2,
                        currency: "CZK"
                    }
                });
            }).then(response => {
                expectToBe(response.signInfo, {
                    state: 'OPEN',
                    signId: '151112531008554'
                });
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('pays up a credit card debt by convenience method', done => {
            var response;
            judgeSession.setNextCase('cards.list').then(() => {
                return client.cards.list();
            }).then(cards => {
                processSimpleCards(cards);
                response = cards;
            }).then(() => {
                return judgeSession.setNextCase('cards.withId.transfers.update');
            }).then(() => {
                return response.items[0].transfer.update({
                    type: "DEBT_REPAYMENT",
                    sender: {
                        accountno: {
                            number: "2326573123",
                            bankCode: "0800"
                        }
                    },
                    amount: {
                        value: 500000,
                        precision: 2,
                        currency: "CZK"
                    }
                });
            }).then(card => {
                expectToBe(response.signInfo, {
                    state: 'OPEN',
                    signId: '151112531008554'
                });
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('retrieves list of statements of cards account', done => {
            judgeSession.setNextCase('cards.withId.accounts.withId.statements.list').then(() => {
                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').statements.list({
                    sort: ['statementDate'],
                    order: ['asc'],
                    pageNumber: null,
                    pageSize: null
                });
            }).then(statements => {
                
                var statement = statements.items[0];
                expect(statements.items.length).toBe(1);
                
                expectDate(statement, {
                    statementDate: '2016-02-29T00:00:00+01:00'
                });
                
                expectToBe(statements.pagination, {
                    pageNumber: 0,
                    pageCount: 1,
                    pageSize: 1,
                });
                
                expectToBe(statement, {
                   id: '06029392819b0198',
                   number: 2,
                   periodicity: 'MONTHLY',
                   format: 'PDF_A4',
                   language: 'cs' 
                });
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('retrieves list of statements of cards account by convenience method on cards listing', done => {
            var response;
            judgeSession.setNextCase('cards.list').then(() => {
                return client.cards.list();
            }).then(cards => {
                processSimpleCards(cards);
                response = cards;
            }).then(() => {
                return judgeSession.setNextCase('cards.withId.accounts.withId.statements.list');
            }).then(() => {
                return response.items[0].accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').statements.list({
                    sort: ['statementDate'],
                    order: ['asc'],
                    pageNumber: null,
                    pageSize: null
                });
            }).then(statements => {
                
                var statement = statements.items[0];
                expect(statements.items.length).toBe(1);
                
                expectDate(statement, {
                    statementDate: '2016-02-29T00:00:00+01:00'
                });
                
                expectToBe(statements.pagination, {
                    pageNumber: 0,
                    pageCount: 1,
                    pageSize: 1,
                });
                
                expectToBe(statement, {
                   id: '06029392819b0198',
                   number: 2,
                   periodicity: 'MONTHLY',
                   format: 'PDF_A4',
                   language: 'cs' 
                });
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        })
        
        it('tests pagination for statements', done => {
            var response;
            
            judgeSession.setNextCase('cards.withId.accounts.withId.statements.list.page0').then(() => {
                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').statements.list({
                    pageNumber: 0,
                    pageSize: 1
                });
            }).then(statements => {
                
                processStatements(statements);
                
                response = statements;
            }).then(() => {
                return judgeSession.setNextCase('cards.withId.accounts.withId.statements.list.page1');
            }).then(() => {
                return response.nextPage();
            }).then(statements => {
                
                var statement = statements.items[0];
                expectToBe(statements.pagination, {
                    pageNumber: 1,
                    pageCount: 2,
                    pageSize: 1                    
                });
                
                expectDate(statement, {
                    statementDate: '2016-01-29T00:00:00+01:00'
                });
                
                expectToBe(statement, {
                    id: '96029392819b0198',
                    number: 8,
                    periodicity: 'MONTHLY',
                    language: 'cs'
                });
                
                response = statements;
            }).then(() => {
                return judgeSession.setNextCase('cards.withId.accounts.withId.statements.list.page0');
            }).then(() => {
                return response.prevPage();
            }).then(statements => {
                
                processStatements(statements);
                
                done();                
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('downloads list of statements of cards account', done => {
            judgeSession.setNextCase('cards.withId.accounts.withId.statements.download').then(() => {
                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').statements.download({
                    format: 'PDF_A4',
                    statementId: '06029392819b0198'
                });
            }).then(response => {
                expect(response).toBeTruthy();
                expect(_.isEqual(file.toString(), response.toString())).toBe(true);
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
   });
});

