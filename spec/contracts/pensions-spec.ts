/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
/// <reference path="../../build/cs-netbanking-sdk.sfx.d.ts"/>
/// <reference path="../../typings/tsd.d.ts"/>
var CoreSDK = require('cs-core-sdk');
var netbanking  = require('../build/cs-netbanking-sdk.node.js');
var judge : CSCoreSDK.Judge = null;
var judgeSession : CSCoreSDK.JudgeSession = null;
var client : CSNetbankingSDK.NetbankingClient = null;
var expectToBe = CoreSDK.TestUtils.expectToBe;
var expectDate = CoreSDK.TestUtils.expectDate;
var logJudgeError = CoreSDK.TestUtils.logJudgeError;
import {testFile, exportTransactionsPayload} from '../helpers';

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

    function testPensionConvenienceMethods(response) {
        expect(response.get).toBeDefined();
        expect(response.update).toBeDefined();
        expect(response.transactions).toBeDefined();
    }

    function processPensions(response) {
        expectToBe(response.pagination, {
            pageNumber: 0,
            pageSize: 1,
            pageCount: 2,
            nextPage: 1
        });

        expectToBe(response.items[0], {
            owner: 'Hana Bielčíková',
            id: 'E7DD68AA3FF4487AF75626F901761B071E72FFFC',
            birthNumber: '8152152602'
        });

        expectDate(response.items[0], {
            validFrom: '2015-12-01',
        });

        expectDate(response.items[0].beneficiaries[0], {
            birthDate: '2008-06-09'
        });

        expectDate(response.items[0].beneficiaries[1], {
            birthDate: '2003-09-10'
        });
    }

    function processPensionDetail(response) {
        expectToBe(response, {
            owner: 'Hana Bielčíková',
            id: 'E7DD68AA3FF4487AF75626F901761B071E72FFFC',
            birthNumber: '8152152602'
        });

        expectDate(response, {
            validFrom: '2015-12-01',
        });

        expectDate(response.beneficiaries[0], {
            birthDate: '2008-06-09',
        });

        expectDate(response.beneficiaries[1], {
            birthDate: '2003-09-10',
        });
    }

    describe('pensions contracts', () => {
        
       it('tests pagination', done => {
           judgeSession.setNextCase('contracts.pensions.list.pagination').then(() => {
               return client.contracts.pensions.list({
                   pageNumber: 0,
                   pageSize: 1
               });
           }).then(response => {
               processPensions(response);
               testPensionConvenienceMethods(response.items[0]);             

               return response.nextPage();
           }).then(response => {
               expectToBe(response.pagination, {
                    pageNumber: 1,
                    pageSize: 1,
                    pageCount: 2,
                });

                expectToBe(response.items[0], {
                    owner: 'Hana Bielčíková',
                    id: 'E7DD68AA3FF4287AF75626F901761B071E72FFFC',
                    birthNumber: '8152152602'
                });

                expectDate(response.items[0], {
                    validFrom: '2015-12-01',
                });

                expectDate(response.items[0].beneficiaries[0], {
                    birthDate: '2008-06-09'
                });

                expectDate(response.items[0].beneficiaries[1], {
                    birthDate: '2003-09-10'
                });

                testPensionConvenienceMethods(response.items[0]);

                return response.prevPage();
           }).then(response => {

               processPensions(response);

               done();
           }).catch(logJudgeError);
       });

    });

    it('retrives detail through convenience method', done => {
        let list;
        judgeSession.setNextCase('contracts.pensions.list').then(() => {
            return client.contracts.pensions.list({
                pageNumber: 0,
                pageSize: 1
            });
        }).then(response => {

            processPensions(response);
            list = response;

            return judgeSession.setNextCase('contracts.pensions.withId.get');
        }).then(() => {
            return list.items[0].get();
        }).then(response => {
            processPensionDetail(response);

            done();
        }).catch(logJudgeError);
    });    

    it('retrives detail', done => {
        judgeSession.setNextCase('contracts.pensions.withId.get').then(() => {
            return client.contracts.pensions.withId('E7DD68AA3FF4487AF75626F901761B071E72FFFC').get();
        }).then(response => {

            processPensionDetail(response);
            testPensionConvenienceMethods(response);

            done();
        }).catch(logJudgeError)
    });

    it('updates pension', done => {
        judgeSession.setNextCase('contracts.pensions.withId.update').then(() => {
            return client.contracts.pensions.withId('E7DD68AA3FF4487AF75626F901761B071E72FFFC').update({
                alias: 'test alias'
            });
        }).then(response => {

            expectToBe(response, {
                owner: 'Hana Bielčíková',
                id: 'E7DD68AA3FF4487AF75626F901761B071E72FFFC',
                birthNumber: '8152152602',
                alias: 'test alias'
            });

            expectDate(response, {
                validFrom: '2015-12-01',
            });

            expectDate(response.beneficiaries[0], {
                birthDate: '2008-06-09',
            });

            expectDate(response.beneficiaries[1], {
                birthDate: '2003-09-10',
            });
            
            testPensionConvenienceMethods(response);

            expect(response.signing).toBeDefined();

            done();
        }).catch(logJudgeError);
    });

    it('updates pension through convenience method', done => {
        let list;
        judgeSession.setNextCase('contracts.pensions.list').then(() => {
            return client.contracts.pensions.list({
                pageNumber: 0,
                pageSize: 1
            });
        }).then(response => {

            processPensions(response);
            list = response;

            return judgeSession.setNextCase('contracts.pensions.withId.update');
        }).then(() => {
            return list.items[0].update({
                alias: 'test alias'
            });
        }).then(response => {
            processPensionDetail(response);

            done();
        }).catch(logJudgeError);
    });

    it('updates transaction', done => {
        judgeSession.setNextCase('contracts.pensions.withId.transactions.withId.update').then(() => {
            return client.contracts.pensions.withId('E7DD68AA3FF4487AF75626F901761B071E72FFFC').transactions.withId('ADAD9879ADKJH9713').update({
                note: "New client's personal note for transaction",
                flags: [
                    'hasStar'
                ]
            });
        }).then(response => {
            expectToBe(response.transaction, {
                id: 'ADAD9879ADKJH9713',
                note: "New client's personal note for transaction"
            });
            
            expect(response.signing).toBeDefined();

            done();
        }).catch(logJudgeError);
    });

    it('exports transactions', done => {
        judgeSession.setNextCase('contracts.pensions.withId.transactions.export').then(() => {
            return client.contracts.pensions.withId('BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79').transactions.export(exportTransactionsPayload);
        }).then(response => {
            testFile(response);

            done();
        }).catch(logJudgeError);
    });
});

