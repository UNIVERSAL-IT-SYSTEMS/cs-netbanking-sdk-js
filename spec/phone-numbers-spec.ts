
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
    
    function testConvenienceMethods(response) {
        expect(response.update).toBeDefined();
        expect(response.delete).toBeDefined();
    }

    describe('phone numbers', () => {
        it('retrieves list of phone numnbers', done => {
            judgeSession.setNextCase('phoneBook.list').then(() => {
                return client.phoneNumbers.list();
            }).then(response => {
                expectToBe(response.items[0], {
                    id: '2195',
                    alias: 'Graham Bell',
                    phoneNumber: '777952341'
                });

                testConvenienceMethods(response.items[0]);

                done();
            }).catch(logJudgeError);
        });
       
        it('creates phone number', done => {
            judgeSession.setNextCase('phoneBook.create').then(() => {
                return client.phoneNumbers.create({
                    alias: 'Graham Bell',
                    phoneNumber: '777952341',
                    flags: [
                        'isFavourite'
                    ]
                });
            }).then(response => {
                expectToBe(response, {
                    id: '2195',
                    alias: 'Graham Bell',
                    phoneNumber: '777952341'
                });

                testConvenienceMethods(response);

                done();
            }).catch(logJudgeError);
        });

        it('updates phone number', done => {
            judgeSession.setNextCase('phoneBook.withId.update').then(() => {
                return client.phoneNumbers.withId('2195').update({
                    alias: 'Graham B.',
                    phoneNumber: '777952341',
                    flags: [
                        'isFavourite'
                    ]
                });
            }).then(response => {
                expectToBe(response, {
                    id: '2195',
                    alias: 'Graham B.',
                    phoneNumber: '777952341'
                });

                testConvenienceMethods(response);

                done();
            }).catch(logJudgeError);
        });

        it('deletes phone number', done => {
            judgeSession.setNextCase('phoneBook.withId.delete').then(() => {
                return client.phoneNumbers.withId('2195').delete();
            }).then(response => {

                done();
            }).catch(logJudgeError);
        });
    });
});

