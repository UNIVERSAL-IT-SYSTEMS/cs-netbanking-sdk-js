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
        judgeSession = judge.startNewSession();
    });
    
    describe('profile', () => {
        
        it('retrives information about current users profile', done => {
            judgeSession.setNextCase('profile.get').then(() => {
                return client.profile.get();
            }).then(profile => {
                
                expectDate(profile, {
                    lastlogin: '2016-03-17T15:01:49+01:00'
                });
                
                expectToBe(profile, {
                    firstname: 'Anna',
                    lastname: 'Vojtíšková',
                    customerId: '2002-12-02-00.17.40.959689',
                    instituteId: 1,
                    salutation: 'Anno Vojtíšková'
                });
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('retrieves list of last logins', done => {
            judgeSession.setNextCase('profile.lastLogin.list').then(() => {
                return client.profile.lastLogins.list();
            }).then(lastLogins => {
                var item = lastLogins.items[0];
                
                expect(lastLogins.items.length).toBe(1);
                expect(item.channel).toBe('GEORGE');
                
                expectDate(item, {
                    lastLogin: '2016-03-17T15:01:49+01:00'
                });
                
                done();
            }).catch(e => {
                logJudgeError(e);
            })
        });   
    });
});

