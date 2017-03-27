
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
    
    describe('promotions', () => {

       it('retrieves list', done => {
           judgeSession.setNextCase('promotions.list').then(() => {
               return client.promotions.list();
           }).then(response => {
               
               expectToBe(response.items[0].displayType, {
                   titleText: 'Plugin Mobilní Platby',
                   sublineText: 'Aktivace pluginu zdarma',
                   displayType: 'OVERVIEW_CARD'
               });

               done();
           }).catch(logJudgeError);
       });

       it('hides promotion', done => {
           judgeSession.setNextCase('promotions.create').then(() => {
               return client.promotions.create({
                   promotionId: '218',
                   executedAction: {
                    actionId: 'HIDE',
                    actionType: 'HIDE'
                    }
               });
           }).then(response => {

               expectToBe(response.infoItems[0], {
                   infoName: 'RETURN_MESSAGE',
                   infoValue: 'successfully executed'  
               });

               done();
           }).catch(logJudgeError);
       });
       
    });
});

