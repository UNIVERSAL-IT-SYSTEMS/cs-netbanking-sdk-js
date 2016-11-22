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

    function testContacts(response) {
        expectToBe(response, {
            id: 'postaladdresspermanent',
            type: 'ADDRESS',
        });

        expectToBe(response.address, {
            type: 'PERMANENT_RESIDENCE',
            typeI18N: 'Trvalá adresa',
            street: 'Pod Václavem'
        });

        expect(response.flags[0]).toBe('mainContact');
    }
    
    describe('contacts', () => {

        it('retrieves list of contacts', done => {

            judgeSession.setNextCase('contacts.list').then(() => {
                return client.contacts.list();
            }).then(response => {

                testContacts(response.items[0]);

                done();

            }).catch(e => {
                logJudgeError(e);
            });
        });

        it('retrieves contact with a given id', done => {

            judgeSession.setNextCase('contacts.withId.get').then(() => {
                return client.contacts.withId('postaladdresspermanent').get();
            }).then(response => {

                testContacts(response);

                done();
            }).catch(e => {
                logJudgeError(e);
            })
        });

    });
});

