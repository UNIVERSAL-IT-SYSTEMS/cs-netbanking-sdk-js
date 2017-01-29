
/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>

import * as CSCoreSDK from 'cs-core-sdk';
var netbanking  = require('../build/cs-netbanking-sdk.node.js');
var judge : CSCoreSDK.Judge = null;
var judgeSession : CSCoreSDK.JudgeSession = null;
var client : CSNetbankingSDK.NetbankingClient = null;
var expectToBe = CSCoreSDK.TestUtils.expectToBe;
var expectDate = CSCoreSDK.TestUtils.expectDate;
var logJudgeError = CSCoreSDK.TestUtils.logJudgeError;
import {testFile} from './helpers';

describe("Netbanking SDK",function(){
    var originalTimeoutInterval = null;
    
    beforeAll(function(){
        judge = new CSCoreSDK.Judge();
        //Because Judge starts slowly on the first request
        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    });
    
    afterAll(function(){
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
    });    
    
    beforeEach(function(){
        CSCoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment)
        client =  netbanking.getClient();	
        client.sharedContext = null;
        judgeSession = judge.startNewSession();
    });
    
    function processSecurities(list) {
        expectToBe(list.pagination, {
            pageNumber: 0,
            pageCount: 2,
            pageSize: 1,
            nextPage: 1
        });
        
        expectToBe(list.items[0], {
            id: '420A817C20E4814C7C516A53ABA8E78F0CDBE324',
            description: 'Aleš Vrba',
            accountno: '1034176627'
        });

        expect(list.items[0].transactions).toBeDefined();
        expect(list.items[0].get).toBeDefined();
        expect(list.items[0].update).toBeDefined();
    }
    
    function processSecurity(security) {
        expectToBe(security, {
            id: '420A817C20E4814C7C516A53ABA8E78F0CDBE324',
            description: 'Aleš Vrba',
            accountno: '1034176627'
        });

        expect(security.transactions).toBeDefined();
        expect(security.get).toBeDefined();
        expect(security.update).toBeDefined();
    }
    
    describe('securities', () => {
        
        it('tests pagination on securities', done => {
            var list;
            judgeSession.setNextCase('securities.list.page0').then(() => {
                return client.securities.list({
                    pageNumber: 0,
                    pageSize: 1
                });
            }).then(response => {
                processSecurities(response);
                
                list = response;
                
                return judgeSession.setNextCase('securities.list.page1');
            }).then(() => {
                return list.nextPage();
            }).then(response => {
                expectToBe(response.pagination, {
                    pageNumber: 1,
                    pageCount: 2,
                    pageSize: 1
                });
                
                expectToBe(response.items[0], {
                    id: '420A217C20E4814C7C516A53ABA8E78F8CDBE324',
                    description: 'Aleš Vrba',
                    accountno: '1034176627'
                });

                expect(response.items[0].transactions).toBeDefined();
                expect(response.items[0].get).toBeDefined();
                expect(response.items[0].update).toBeDefined();
                
                list = response;
                
                return judgeSession.setNextCase('securities.list.page0');
            }).then(() => {
                return list.prevPage();
            }).then(response => {
                processSecurities(response);
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('retrieves detail of security', done => {
            
            judgeSession.setNextCase('securities.withId.get').then(() => {
                return client.securities.withId('420A817C20E4814C7C516A53ABA8E78F0CDBE324').get();
            }).then(response => {
                
                expectToBe(response, {
                    id: '420A817C20E4814C7C516A53ABA8E78F0CDBE324',
                    description: 'Aleš Vrba',
                    accountno: '1034176627'
                });

                expect(response.transactions).toBeDefined();
                expect(response.get).toBeDefined();
                expect(response.update).toBeDefined();
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('updates alias of security', done => {
           
           judgeSession.setNextCase('securities.withId.update').then(() => {
               return client.securities.withId('420A817C20E4814C7C516A53ABA8E78F0CDBE324').update({
                   alias: 'lorem'
               });
           }).then(response => {
               processSecurity(response);
               expect(response.signing).toBeDefined();
               
               done();               
           }).catch(e => {
               logJudgeError(e);
           });
           
        });

        it('it retrieves security details through get convenience method', done => {
            let list;
            judgeSession.setNextCase('securities.list.page0').then(() => {
                return client.securities.list({
                    pageNumber: 0,
                    pageSize: 1
                });
            }).then(response => {
                processSecurities(response);

                list = response;
                return judgeSession.setNextCase('securities.withId.get');
            }).then(() => {
                return list.items[0].get();
            }).then(response => {
                
                expectToBe(response, {
                    id: '420A817C20E4814C7C516A53ABA8E78F0CDBE324',
                    description: 'Aleš Vrba',
                    accountno: '1034176627'
                });

                expect(response.transactions).toBeDefined();
                expect(response.get).toBeDefined();
                expect(response.update).toBeDefined();

                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });

        it('it updates security through update convenience method', done => {
            let list;
            judgeSession.setNextCase('securities.list.page0').then(() => {
                return client.securities.list({
                    pageNumber: 0,
                    pageSize: 1
                });
            }).then(response => {
                processSecurities(response);

                list = response;
                return judgeSession.setNextCase('securities.withId.update');
            }).then(() => {
                return list.items[0].update({
                   alias: 'lorem'
               });
            }).then(response => {
                
                processSecurity(response);

                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });

        it('it updates security transaction through transactions convenience method', done => {
            let list;
            judgeSession.setNextCase('securities.list.page0').then(() => {
                return client.securities.list({
                    pageNumber: 0,
                    pageSize: 1
                });
            }).then(response => {
                processSecurities(response);

                list = response;
                return judgeSession.setNextCase('securities.withId.transactions.withId.update');
            }).then(() => {
                return list.items[0].transactions.withId('100000189114334').update({
                    id: "100000189114334",
                    note: "New client's personal note for transaction",
                    flags: [
                        "hasStar"
                    ]
               });
            }).then(response => {
                
                expectToBe(response.transaction, {
                    id: '100000189114334',
                    note: 'New client\'s personal note for transaction',
                });
                
                expect(response.transaction.flags.length).toBe(2);
                expect(response.transaction.flags[0]).toBe('hasNote');
                expect(response.transaction.flags[1]).toBe('hasStar');

                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });

        it('updates transaction', done => {
            judgeSession.setNextCase('securities.withId.transactions.withId.update').then(() => {
                return client.securities.withId('420A817C20E4814C7C516A53ABA8E78F0CDBE324').transactions.withId('100000189114334').update({
                    note: "New client's personal note for transaction",
                    flags: [
                        "hasStar"
                    ]
                });
            }).then(response => {
                expectToBe(response.transaction, {
                    id: '100000189114334',
                    note: 'New client\'s personal note for transaction',
                });
                
                expect(response.transaction.flags.length).toBe(2);
                expect(response.transaction.flags[0]).toBe('hasNote');
                expect(response.transaction.flags[1]).toBe('hasStar');

                expect(response.signing).toBeDefined();

                done();
            }).catch(e => {
               logJudgeError(e);
            });
        });

        it('exports transactions', done => {

            judgeSession.setNextCase('securities.withId.transactions.export').then(() => {
                return client.securities.withId('420A817C20E4814C7C516A53ABA8E78F0CDBE324').transactions.export({
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
                testFile(response);

                done();
            }).catch(e => {
                logJudgeError(e);                
            });
        });
    });
});

