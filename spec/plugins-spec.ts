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

    function testPluginsPage0(response) {
        expectToBe(response.pagination, {
            pageNumber: 0,
            pageCount: 2,
            pageSize: 1,
            nextPage: 1
        });

        expectToBe(response.items[0], {
            productCode: 'PI-MOBILEPAYMENTS',
            name: 'Plugin pro mobilní platby',
        });

        expectDate(response.items[0], {
            validUntil: '2100-01-01'
        });

    }
    
    describe('plugins', () => {
        
        it('tests pagination for plugins list', done => {
            let list;
            judgeSession.setNextCase('plugins.list.page0').then(() => {
                return client.plugins.list({
                    pageNumber: 0,
                    pageSize: 1
                });
            }).then(response => {
                testPluginsPage0(response);
                list = response;

                return judgeSession.setNextCase('plugins.list.page1');
                
            }).then(() => {
                return list.nextPage();
            }).then(response => {

                expectToBe(response.pagination, {
                    pageNumber: 1,
                    pageCount: 2,
                    pageSize: 1,
                });

                expectToBe(response.items[0], {
                    productCode: 'PFM_1',
                    name: 'PluginBudgets pro CZ',
                });

                expectDate(response.items[0], {
                    validUntil: '2100-01-01'
                });

                expectToBe(response.items[0].standardFees[0], {
                    timeOfCharging: 'IMMEDIATELY',
                    periodOfCharging: 'NON_RECURRING'
                });

                list = response;
                return judgeSession.setNextCase('plugins.list.page0');
            }).then(() => {
                return list.prevPage();
            }).then(response => {

                testPluginsPage0(response);

                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });

        it('updates plugin with a given id', done => {
            judgeSession.setNextCase('plugins.withId.update').then(() => {
                return client.plugins.withId('PI-MOBILEPAYMENTS').update({
                    productCode: 'PI-MOBILEPAYMENTS',
                    flags: [
                        'active'
                    ]
                });
            }).then(response => {

                expectToBe(response, {
                    productCode: 'PI-MOBILEPAYMENTS',
                    name: 'Plugin pro mobilní platby',
                });

                expectDate(response, {
                    validUntil: '2100-01-01'
                });

                expectToBe(response.standardFees[0], {
                    timeOfCharging: 'IMMEDIATELY',
                    periodOfCharging: 'NON_RECURRING'
                });

                expect(response.flags[0]).toBe('active');

                expect(response.signing).toBeDefined();
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
    });
});

