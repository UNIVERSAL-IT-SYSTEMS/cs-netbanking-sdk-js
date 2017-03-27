
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
    
    describe('goals', () => {

        it('retrieves list of goals', done => {
            judgeSession.setNextCase('goals.list').then(() => {
                return client.goals.list();
            }).then(response => {

                expectToBe(response.items[0], {
                    name: 'Dovolená',
                    completed: false,
                    deadline: null
                });

                done();
            }).catch(logJudgeError);
        });
       
        it('updates goals', done => {
            judgeSession.setNextCase('goals.update').then(() => {
                return client.goals.update({
                    goals: [
                        {
                        name: 'Auto',
                        price: {
                            value: 4000,
                            precision: 2,
                            currency: 'CZK'
                        },
                        deadline: new Date(1445554800000),
                        completed: false
                        }
                    ]
                });
            }).then(response => {
                expectToBe(response.goals[0], {
                    name: 'Auto',
                    completed: false
                });

                expect(response.goals[0].deadline.getTime()).toBe(1445554800000);

                done();
            }).catch(logJudgeError);
        });
    });
});

