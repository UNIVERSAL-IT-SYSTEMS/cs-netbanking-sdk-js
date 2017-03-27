
/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>

import * as CSCoreSDK from 'cs-core-sdk';
var netbanking  = require('../build/cs-netbanking-sdk.node.js');
var judge : CSCoreSDK.Judge = null;
var judgeSession : CSCoreSDK.JudgeSession = null;
var client : CSNetbankingSDK.NetbankingClient = null;
var expectToBe = CSCoreSDK.TestUtils.expectToBe;
var expectDate = CSCoreSDK.TestUtils.expectDate;
var logJudgeError = CSCoreSDK.TestUtils.logJudgeError;

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

