
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
                    lastlogin: '2016-03-17T15:01:49+01:00'
                });
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });   
    });
});

