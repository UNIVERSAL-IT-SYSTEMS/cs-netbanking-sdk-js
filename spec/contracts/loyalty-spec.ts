/// <reference path="../../build/cs-netbanking-sdk.sfx.d.ts"/>
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

    describe('loyalty contracts', () => {

        it('retrieves loyalty', done => {
            judgeSession.setNextCase('contracts.loyalty.get').then(() => {
                return client.contracts.loyalty.get();
            }).then(response => {
                expectToBe(response, {
                    state: 'UNREGISTERED',
                    pointsCount: 0,
                    activationCode: '15B8FE1760'
                });

                expectDate(response, {
                    exportDate: '2016-05-31T00:00:00+02:00'
                });

                done();
            }).catch(logJudgeError);
        });
        
    });
});

