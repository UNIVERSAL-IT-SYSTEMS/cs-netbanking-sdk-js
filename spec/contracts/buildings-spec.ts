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
    
    function processBuildings(response) {

        expectToBe(response.pagination, {
            pageNumber: 0,
            pageSize: 1,
            pageCount: 2,
            nextPage: 1,
        });

        expectToBe(response.items[0], {
            id: 'BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79',
            type: 'BUILD_SAVING',
            product: '280',
        });

        expect(response.items[0].contractHolders[0]).toBe('Hana Bielčíková');

    }

    function testBuildingsConvenienceMethods(response) {
        expect(response.get).toBeDefined();
        expect(response.update).toBeDefined();
        expect(response.services).toBeDefined();
        expect(response.transactions).toBeDefined();
    }

    describe('buildings contracts', () => {
        
        it('tests pagination for listing buildings contracts', done => {
            judgeSession.setNextCase('contracts.buildings.list.pagination').then(() => {
                return client.contracts.buildings.list({
                    pageNumber: 0,
                    pageSize: 1,
                });
            }).then(response => {
                processBuildings(response);
                testBuildingsConvenienceMethods(response.items[0]);

                return response.nextPage();
            }).then(response => {
                expectToBe(response.pagination, {
                    pageNumber: 1,
                    pageSize: 1,
                    pageCount: 2,
                });

                return response.prevPage();
            }).then(response => {
                processBuildings(response);

                done();
            }).catch(e => {
                logJudgeError(e);
            });

        });

        it('retrieves detail of a buildings contract with a given id', done => {
            judgeSession.setNextCase('contracts.buildings.withId.get').then(() => {
                return client.contracts.buildings.withId('BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79').get();
            }).then(response => {

                expectToBe(response, {
                    id: 'BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79',
                    type: 'BUILD_SAVING',
                    product: '280',
                });

                expect(response.contractHolders[0]).toBe('Hana Bielčíková');

                testBuildingsConvenienceMethods(response);

                done();
            }).catch(e => {
                logJudgeError(e);
            })
        });

        it('updates building contract with a given id', done => {
            judgeSession.setNextCase('contracts.buildings.withId.update').then(() => {
                return client.contracts.buildings.withId('BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79').update({
                    alias: 'test alias'
                });
            }).then(response => {
                expectToBe(response, {
                    id: 'BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79',
                    alias: 'test alias',
                    product: '280',
                });

                testBuildingsConvenienceMethods(response);
                expect(response.signing).toBeDefined();

                done();
            }).catch(logJudgeError);
        });

        it('retrieves list of services', done => {
            judgeSession.setNextCase('contracts.buildings.withId.services.list').then(() => {
                return client.contracts.buildings.withId('BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79').services.list({
                    pageNumber: 0,
                    pageSize: 1
                });
            }).then(response => {
                expectToBe(response.pagination, {
                    pageNumber: 0,
                    pageCount: 1,
                    pageSize: 1
                });

                expectToBe(response.items[0], {
                    id: 's54sdf756dfhm52879sdf23xd8744Fsdf5',
                    nameI18N: 'Uver k stavebnimu sporeni',
                    iconGroup: 'DEFAULT',
                });

                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });

        it('updates transaction with a given id', done => {
            judgeSession.setNextCase('contracts.buildings.withId.transactions.withId.update').then(() => {
                return client.contracts.buildings.withId('BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79').transactions.withId('JHJKLASDHKALD12321').update({
                    note: "New client's personal note for transaction",
                    flags: [
                        'hasStar'
                    ]
                });
            }).then(response => {
                expectToBe(response.transaction, {
                    id: 'JHJKLASDHKALD12321',
                    note: "New client's personal note for transaction",
                });

                expect(response.transaction.flags[0]).toBe('hasNote');
                expect(response.transaction.flags[1]).toBe('hasStar');

                expect(response.signing).toBeDefined();
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });

        it('exports transactions', done => {
            judgeSession.setNextCase('contracts.buildings.withId.transactions.export').then(() => {
                return client.contracts.buildings.withId('BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79').transactions.export(exportTransactionsPayload);
            }).then(response => {
                testFile(response);

                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
    });
});

