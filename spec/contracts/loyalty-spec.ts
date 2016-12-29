/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
/// <reference path="../../build/cs-netbanking-sdk.sfx.d.ts"/>
/// <reference path="../../typings/tsd.d.ts"/>
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
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
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

