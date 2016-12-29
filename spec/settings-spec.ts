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
import {testFile} from './helpers';

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
    
    describe('settings', () => {
        
        it('get users settings', done => {

            judgeSession.setNextCase('settings.get').then(() => {
                return client.settings.get();
            }).then(response => {

                expect(response.language).toBe('cs');
                expect(response.flags.length).toBe(4);
                expect(response.flags[0]).toBe('displayInsurances');
                expect(response.flags[1]).toBe('displayBuildings');
                expect(response.flags[2]).toBe('displayCreditCards');
                expect(response.flags[3]).toBe('displayInvestments');

                done();
            }).catch(e => {
                logJudgeError(e);
            })
        });

        it('updates users settings', done => {

            judgeSession.setNextCase('settings.update').then(() => {
                return client.settings.update({
                    language: 'cs',
                    flags: [
                        'displayInsurances',
                        'displayBuildings'
                    ]
                });
            }).then(response => {
                expect(response.settings.language).toBe('cs');
                expect(response.settings.flags.length).toBe(4);
                expect(response.settings.flags[0]).toBe('displayInsurances');
                expect(response.settings.flags[1]).toBe('displayBuildings');
                expect(response.settings.flags[2]).toBe('displayCreditCards');
                expect(response.settings.flags[3]).toBe('displayInvestments');

                expect(response.signing).toBeDefined();

                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });

    });
});

