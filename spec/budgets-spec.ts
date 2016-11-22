/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
var CoreSDK = require('cs-core-sdk');
var netbanking  = require('../build/cs-netbanking-sdk.node.js');
var judge : CSCoreSDK.Judge = null;
var judgeSession : CSCoreSDK.JudgeSession = null;
var client : CSNetbankingSDK.NetbankingClient = null;
var expectToBe = CoreSDK.TestUtils.expectToBe;
var expectDate = CoreSDK.TestUtils.expectDate;
var logJudgeError = CoreSDK.TestUtils.logJudgeError;

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
        client.sharedContext = null;
        judgeSession = judge.startNewSession();
    });
    
    describe('budgets', () => {
        
        it('retrieves list', done => {
            judgeSession.setNextCase('budgets.list').then(() => {
                return client.budgets.list();
            }).then(response => {

                expectToBe(response.items[0].category, {
                    id: 'CAR',
                    level: 'mainCategory'
                });

                done();
            }).catch(logJudgeError);
        });
       
        it('updates budgets', done => {
            judgeSession.setNextCase('budgets.update').then(() => {
                return client.budgets.update({
                     budgets: [
                        {
                            budget: {
                                value: 5000,
                                precision: 2,
                                currency: 'CZK'
                            },
                            category: {
                                id: 'OTHER_EXPENSES',
                                level: 'mainCategory'
                            }
                        }
                    ]
                }).then(response => {

                    expectToBe(response.budgets[0].category, {
                        id: 'OTHER_EXPENSES',
                        level: 'mainCategory'
                    });

                    expectToBe(response.budgets[0].budget, {
                        value: 5000,
                        precision: 2,
                        currency: 'CZK'
                    }); 


                    done();
                }).catch(logJudgeError);
            })
        });
    });
});

