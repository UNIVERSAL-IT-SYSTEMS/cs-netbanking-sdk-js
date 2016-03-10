/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
var CoreSDK = require('cs-core-sdk');
var netbanking  = require('../build/cs-netbanking-sdk.node.js');
var judge : CSCoreSDK.Judge = null;
var judgeSession : CSCoreSDK.JudgeSession = null;
var client : CSNetbankingSDK.NetbankingClient = null;
var expectToBe = CoreSDK.TestUtils.expectToBe;
describe("Netbanking SDK",function(){
    var originalTimeoutInterval = null;
    
    beforeAll(function(){
        judge = new CoreSDK.Judge('http://localhost:3001');
        //Because Judge starts slowly on the first request
        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
    })
    
    afterAll(function(){
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
    });    
    
    beforeEach(function(){
        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment)
        client =  netbanking.getClient();	
        judgeSession = judge.startNewSession();
    })
    
    it("something",function(){
       console.log("It works") 
    });
    
    var logJudgeError = function(e){
        console.log(e)
        if(e.response && e.response.data){
            console.log(e.response.data.errors)
        }else if(e.data){
            console.log(e.data.errors)
        }
        console.log(e.stack)
    }
    
    describe('Netbanking SDK accounts', () => {
       
       it('retrieves accounts balances', done => {
            judgeSession.setNextCase('accounts.withId.balances.get').then(() => {
                return client.accounts.withId('D2C8C1DCC51A3738538A40A4863CA288E0225E52').balance.get();    
            }).then(balance => {
               expectToBe(balance.balance, {
                   value: 45865,
                   currency: 'CZK',
                   precision: 2
               });
               
               expectToBe(balance.disposable, {
                   value: 45865,
                   currency: 'CZK',
                   precision: 2
               });
               
               expectToBe(balance.overdraft, {
                   value: 20000,
                   currency: 'CZK',
                   precision: 2
               });
               done();
            }).catch(e => {
                logJudgeError(e);
            });
       });
       
       it('retrieves list of services of the account', done => {
           judgeSession.setNextCase('accounts.withId.services.list').then(() => {
               return client.accounts.withId('D2C8C1DCC51A3738538A40A4863CA288E0225E52').services.list({
                   pageNumber: 0,
                   pageSize: 2
               });
           }).then(services => {
               
               expect(services.items.length).toBe(2);
               expect(services.items[0].dateFrom.toString()).toBe(new Date(CoreSDK.EntityUtils.parseISODate('2014-07-31+0100')).toString());
               expect(services.items[0].dateTo.toString()).toBe(new Date(CoreSDK.EntityUtils.parseISODate('2014-08-31+0100')).toString());
               
               expectToBe(services.pagination, {
                   pageNumber: 0,
                   pageCount: 2,
                   pageSize: 5,
                   nextPage: 1 
               });  
               
               expectToBe(services.items[0], {
                   id: 's54sdf756dfhm52879sdf23xd8744Fsdf5',
                   nameI18N: 'Všechny platby v KČ',
                   iconGroup: 'DEFAULT',
               });
               
               expectToBe(services.items[1], {
                   id: '154dff756dfhm52879sdf23d845sd4f84f',
                   nameI18N: 'Všechny výběry z bankomatů ČS',
                   iconGroup: 'DEFAULT',
               });
               
               done();
           }).catch(e => {
                logJudgeError(e);
           });
       });
    });
    
    it('retrieves list of reservations of the account', done => {
        judgeSession.setNextCase('accounts.withId.reservations.list').then(() => {
            return client.accounts.withId('D2C8C1DCC51A3738538A40A4863CA288E0225E52').reservations.list({
                pageNumber: 0,
                pageSize: 2
            });
        }).then(reservations => {
            
            expect(reservations.items.length).toBe(2);
            expect(reservations.items[0].creationDate.toString()).toBe(new Date(CoreSDK.EntityUtils.parseISODate('2015-09-18T21:43:53Z')).toString());
            expect(reservations.items[0].expirationDate.toString()).toBe(new Date(CoreSDK.EntityUtils.parseISODate('2015-09-25T21:43:53Z')).toString());
            
            expectToBe(reservations.pagination, {
                pageNumber: 0,
                pageCount: 9,
                pageSize: 2,
                nextPage: 1
            });
            
            expectToBe(reservations.items[0], {
                status: 'RESERVED',
                merchantName: 'Pizzeria Grosseto',
                description: 'Platba kartou'
            });
            
            expectToBe(reservations.items[0].amount, {
                value: 45270,
                precision: 2,
                currency: 'CZK'
            });
            
            done();
        }).catch(e => {
            logJudgeError(e);
        });
    });
    
    it('retrieves list of repayments of the account', done => {
       judgeSession.setNextCase('accounts.withId.repayments.list').then(() => {
           return client.accounts.withId('D2C8C1DCC51A3738538A40A4863CA288E0225E52').repayments.list();
       }).then(repayments => {
          
           expect(repayments.items.length).toBe(2);
           expect(repayments.items[0].repaymentDate.toString()).toBe(new Date(CoreSDK.EntityUtils.parseISODate('2016-01-18')).toString());
           expect(repayments.items[1].repaymentDate.toString()).toBe(new Date(CoreSDK.EntityUtils.parseISODate('2016-01-18')).toString());
           
           expectToBe(repayments.items[0].amount, {
               value: 32500,
               precision: 2,
               currency: 'CZK'
           });
           
           expectToBe(repayments.items[0].paidAmount, {
               value: 32500,
               precision: 2,
               currency: 'CZK'
           });
           
           done();
       }).catch(e => {
           logJudgeError(e);
        });
    });
    
    it('retrieves list of statements of the account', done => {
       judgeSession.setNextCase('accounts.withId.statements.list').then(() => {
           return client.accounts.withId('D2C8C1DCC51A3738538A40A4863CA288E0225E52').statements.list({
               pageNumber: 0,
               pageSize: 2,
           });
       }).then(statements => {
           
           expect(statements.items.length).toBe(2);
           expect(statements.items[0].statementDate.toString()).toBe(new Date(CoreSDK.EntityUtils.parseISODate('2013-06-21T14:18:19Z')).toString());
           
           expectToBe(statements.pagination, {
               pageNumber: 0,
               pageCount: 2,
               pageSize: 100,
               nextPage: 1
           });
           
           expectToBe(statements.items[0], {
               id: '201302520130621161819',
               number: 25,
               periodicity: 'MONTHLY',
               format: 'PDF_A4',
               language: 'cs'
           });
           
           done();
       }).catch(e => {
           logJudgeError(e);
       });
    });
    
    it('retrieves list of statements on the sub account', done => {
        judgeSession.setNextCase('accounts.withId.subAccount.withId.statements.list').then(() => {
            return client.accounts.withId('D2C8C1DCC51A3738538A40A4863CA288E0225E52').subAccounts.withId('0D5F82464A77DF093858A8A5B938BEE410B4409C').statements.list({
                pageNumber: 0,
                pageSize: 2
            });            
        }).then(statements => {
            
            expect(statements.items.length).toBe(2);
            expect(statements.items[0].statementDate.toString()).toBe(new Date(CoreSDK.EntityUtils.parseISODate('2013-06-21T14:18:19Z')).toString());
            
            expectToBe(statements.pagination, {
                pageNumber: 0,
                pageCount: 2,
                pageSize: 100,
                nextPage: 1
            });
            
            expectToBe(statements.items[0], {
                id: '201302520130621161819',
                number: 25,
                periodicity: 'MONTHLY',
                format: 'PDF_A4',
                language: 'cs'
            });
            
            done();
        }).catch(e => {
           logJudgeError(e);
        });
    });
});

