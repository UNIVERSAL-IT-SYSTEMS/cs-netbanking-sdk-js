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

    function testMessages(response) {

        expectToBe(response.pagination, {
            pageNumber: 0,
            pageCount: 5,
            nextPage: 1,
            pageSize: 1
        });

        expectToBe(response.items[0], {
            id: '134625',
            from: 'WCM',
            subject: 'test attach'
        });

        expectDate(response.items[0], {
            date: '2016-04-08T09:20:32+02:00'
        });

        expect(response.items[0].get).toBeDefined();
        expect(response.items[0].update).toBeDefined();
        expect(response.items[0].delete).toBeDefined();
        expect(response.items[0].attachments).toBeDefined();
    }
    
    describe('messages', () => {

       it('tests pagination', done => {
           judgeSession.setNextCase('messages.pagination').then(() => {
               return client.messages.list({
                   pageNumber: 0,
                   pageSize: 1
               });
           }).then(response => {
               testMessages(response);

               return response.nextPage();
           }).then(response => {
               expectToBe(response.pagination, {
                    pageNumber: 1,
                    pageCount: 5,
                    nextPage: 2,
                    pageSize: 1
                });

                expectToBe(response.items[0], {
                    id: '278583',
                    from: 'WCM',
                    subject: 'Pozor - evidence dluhu na Vašem úvěrovém případně osobním účtu! Hrozí naúčtování poplatků'
                });

                expectDate(response.items[0], {
                    date: '2016-04-27T08:20:32+02:00'
                });

                expect(response.items[0].get).toBeDefined();
                expect(response.items[0].update).toBeDefined();
                expect(response.items[0].delete).toBeDefined();

                return response.prevPage();
           }).then(response => {
               testMessages(response);

               done();
           }).catch(logJudgeError);
       });

       it('retrieves message detail', done => {
           judgeSession.setNextCase('messages.withId.get').then(() => {
               return client.messages.withId('134625').get();
           }).then(response => {
               expectToBe(response, {
                   id: '134625',
                   from: 'WCM',
                   subject: 'test attach'
               });

               expectDate(response, {
                   date: '2016-04-08T09:20:32+02:00'
               });

               done();
           }).catch(logJudgeError);
       });

       it('updates message detail', done => {
           judgeSession.setNextCase('messages.withId.update').then(() => {
               return client.messages.withId('134625').update({
                   read: true
               });
           }).then(response => {

               done();
           }).catch(logJudgeError);
       });

       it('deletes message', done => {
           judgeSession.setNextCase('messages.withId.delete').then(() => {
               return client.messages.withId('134625').delete();
           }).then(response => {

               done();
           }).catch(logJudgeError);
       });

       it('downloads attachment file', done => {
           judgeSession.setNextCase('messages.withId.attachments.withId.download').then(() => {
               return client.messages.withId('1421721').attachments.withId('palec.png').download();
           }).then(response => {
               expect(response).toBeTruthy();

               done();
           }).catch(logJudgeError);
       });

       it('retrieves list of mandatory messages', done => {
           judgeSession.setNextCase('messages.mandatory.list').then(() => {
               return client.messages.mandatory.list();
           }).then(response => {
               expectToBe(response.items[0], {
                   id: '278583',
                   from: 'WCM',
                   subject: 'Pozor - evidence dluhu na Vašem úvěrovém případně osobním účtu! Hrozí naúčtování poplatků'
               });

               expectDate(response.items[0], {
                   date: '2016-04-27T08:20:32+02:00'
               });

               done();
           }).catch(logJudgeError);
       });
    });
});

