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
        judge = new CoreSDK.Judge('http://localhost:3001');
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

    describe('services', () => {

        it('retrieves services', done => {
            judgeSession.setNextCase('services.list').then(() => {
                return client.services.list({
                    pageNumber: 0,
                    pageSize: 1
                });
            }).then(response => {
                expectToBe(response.pagination, {
                    pageNumber: 0,
                    pageCount: 1,
                    pageSize: 1,
                });

                expectToBe(response.items[0], {
                    id: 'EB8816A9C0E29A47F564E0BC2F30F8BB5A2FDB84',
                    nameI18N: 'SERVIS 24',
                    iconGroup: 'S24'
                });

                done();
            }).catch(logJudgeError);
        });
        
    });
});

