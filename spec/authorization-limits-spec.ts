import * as CSCoreSDK from 'cs-core-sdk';
var netbanking  = require('../build/cs-netbanking-sdk.node.js');
var judge : CSCoreSDK.Judge = null;
var judgeSession : CSCoreSDK.JudgeSession = null;
var client : CSNetbankingSDK.NetbankingClient = null;
var expectToBe =CSCoreSDK.TestUtils.expectToBe;
var expectDate =CSCoreSDK.TestUtils.expectDate;
var logJudgeError =CSCoreSDK.TestUtils.logJudgeError;

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
    
    describe('authorization limits', () => {

       it('retrieves list', done => {
           judgeSession.setNextCase('authorizationLimits.list').then(() => {
               return client.authorizationLimits.list({
                   channel: 'George'
               });
           }).then(response => {
               expectToBe(response.items[0], {
                   id: '934872973982',
                   authorizationType: 'TAC',
                   channelId: 'NET_BANKING',
                   applicationId: 'GEORGE'
               });

               expect(response.items[0].get).toBeDefined();

               done();
           }).catch(logJudgeError);
       });
        
       it('retrieves limit detail', done => {
           judgeSession.setNextCase('authorizationLimits.withId.get').then(() => {
               return client.authorizationLimits.withId('934872973982').get();
           }).then(response => {
               expectToBe(response, {
                   id: '934872973982',
                   authorizationType: 'TAC',
                   channelId: 'NET_BANKING',
                   applicationId: 'GEORGE'
               });

               expect(response.get).toBeDefined();

               done();
           }).catch(logJudgeError);
       });
    });
});

