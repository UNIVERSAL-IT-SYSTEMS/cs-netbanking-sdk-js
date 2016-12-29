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
import {testStateOpen} from './helpers';

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
    
    describe('bundles', () => {

        it('creates bundle', done => {
            
            judgeSession.setNextCase('bundles.create').then(() => {
                return client.bundles.create({
                    name: 'Bundles 6.10.',
                    items: [
                        {
                            "id": "161125181818261",
                            "signInfo": {
                                "state": "OPEN",
                                "signId": "62567b1991b086e5b6822bb814d505792e1bccdb9057e0a450ec628dc02fbbed"
                            }
                        },
                        {
                            "id": "161125181840386",
                            "signInfo": {
                                "state": "OPEN",
                                "signId": "47a59e4bcf661d213ddbb11ad84b5f2f4aae99da47bc7d289d5dcccf0dfd7be9"
                            }
                        }
                    ]
                });
            })
            .then(response => {
                expectToBe(response, {
                    id: '161125181840315',
                    name: 'Bundles 6.10.', 
                });

                expect(response.items.length).toBe(2);
                expect(response.items[0].id).toBe('161125181818261');
                expectToBe(response.items[0].signInfo, {
                    state: 'OPEN',
                    signId: '62567b1991b086e5b6822bb814d505792e1bccdb9057e0a450ec628dc02fbbed',
                });

                expect(response.items[1].id).toBe('161125181840386');
                expectToBe(response.items[1].signInfo, {
                    state: 'OPEN',
                    signId: '47a59e4bcf661d213ddbb11ad84b5f2f4aae99da47bc7d289d5dcccf0dfd7be9',
                });

                testStateOpen(response.signing);

                done();
            })
            .catch(error => {
                logJudgeError(error);
            })
        });
    });
});

