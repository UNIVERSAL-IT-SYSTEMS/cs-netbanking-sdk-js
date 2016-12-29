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
import {testFile, exportTransactionsPayload, testAuthorizationTac, testStateOpen, testStateDone} from '../helpers';

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

    function processContracts(response) {
        expectToBe(response.pagination, {
            pageNumber: 0,
            pageCount: 2,
            pageSize: 1,
            nextPage: 1,
        });

        expectToBe(response.items[0], {
            id: '3961D3F9E922EEE93E2581E896B34566645FE7E3',
            type: 'LIFE',
            insurancePolicyHolder: 'Hana Bielčíková',
            policyNumber: '7009689942'
        });

        expectDate(response.items[0].life, {
            contractEndDate: '2046-12-31',
            contractStartDate: '2015-01-01',
            lastPremiumDate: '2015-01-15',
            contractTerminationDate: '0999-12-31',
        });
    }

    function testInsuranceConvenienceMethods(response) {
        expect(response.get).toBeDefined();
        expect(response.update).toBeDefined();
        expect(response.funds).toBeDefined();
        expect(response.beneficiaries).toBeDefined();
        expect(response.insurees).toBeDefined();
        expect(response.payments).toBeDefined();
        expect(response.services).toBeDefined();
        expect(response.events).toBeDefined();
        expect(response.taxBenefits).toBeDefined();
        expect(response.strategies).toBeDefined();
        expect(response.transfer).toBeDefined();
    }

    describe('insurance contracts', () => {
        
        it('tests pagination', done => {
            judgeSession.setNextCase('contracts.insurances.list.pagination').then(() => {
                return client.contracts.insurances.list({
                    pageNumber: 0,
                    pageSize: 1
                });
            }).then(response => {
                processContracts(response);
                testInsuranceConvenienceMethods(response.items[0]);

                return response.nextPage();
            }).then(response => {
                
                expectToBe(response.pagination, {
                    pageNumber: 1,
                    pageCount: 2,
                    pageSize: 1,
                });

                expectToBe(response.items[0], {
                    id: '9B070F9C66A91D55A5D4E31F47B147444E651D36',
                    type: 'LIFE',
                    insurancePolicyHolder: 'Hana Bielčíková',
                    policyNumber: '5530446061'
                });

                expectDate(response.items[0].life, {
                    contractEndDate: '2033-01-31',
                    contractStartDate: '2011-02-01',
                    lastPremiumDate: '2011-02-15',
                    contractTerminationDate: '0999-12-31',
                });

                testInsuranceConvenienceMethods(response.items[0]);

                return response.prevPage();
            }).then(response => {
                processContracts(response);
                testInsuranceConvenienceMethods(response.items[0]);

                done();
            }).catch(logJudgeError);
        });

        it('retrieves detail', done => {
            judgeSession.setNextCase('contracts.insurances.withId.get').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').get();
            }).then(response => {
                expectToBe(response, {
                    id: '3961D3F9E922EEE93E2581E896B34566645FE7E3',
                    type: 'LIFE',
                    insurancePolicyHolder: 'Hana Bielčíková',
                    policyNumber: '7009689942',
                    status: 'ACTIVE'
                });

                expectDate(response.life, {
                    contractEndDate: '2046-12-31',
                    contractStartDate: '2015-01-01',
                    premiumLastPaid: '2015-12-15',
                });

                testInsuranceConvenienceMethods(response);

                done();
            }).catch(logJudgeError);
        });

        it('updates insurance', done => {
            judgeSession.setNextCase('contracts.insurances.withId.update').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').update({
                    alias: 'test alias'
                });
            }).then(response => {
                expectToBe(response, {
                    id: '3961D3F9E922EEE93E2581E896B34566645FE7E3',
                    type: 'LIFE',
                    product: '264',
                    productI18N: 'Pojištění FLEXI',
                    alias: 'test alias',
                    insurancePolicyHolder: 'Hana Bielčíková',
                    policyNumber: '7009689942',
                });

                expectDate(response.life, {
                    contractEndDate: '2046-12-31',
                    contractStartDate: '2015-01-01',
                    lastPremiumDate: '2015-01-15',
                    contractTerminationDate: '0999-12-31',
                });

                testInsuranceConvenienceMethods(response);

                expect(response.signing).toBeDefined();

                done();
            }).catch(logJudgeError);
        });

        it('retrieves funds', done => {
            judgeSession.setNextCase('contracts.insurances.withId.funds.get').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').funds.list();
            }).then(response => {
                expectToBe(response.items[0], {
                    code: '24',
                    name: 'Garantovaný fond pro běžné pojistné',
                    investedShare: 0,
                    allocation: 100
                });

                done();
            }).catch(logJudgeError)
        });

        it('updates funds', done => {
            judgeSession.setNextCase('contracts.insurances.withId.funds.update').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').funds.update({
                    funds: [
                        {
                            code: '31',
                            allocation: 35
                        },
                        {
                            code: '32',
                            allocation: 65
                        }
                    ],
                    investmentProgram: 'INVESTMENT_MANAGEMENT'
                });
            }).then(response => {
                expectToBe(response.funds[0], {
                    code: '31',
                    allocation: 35
                });

                expectToBe(response.funds[1], {
                    code: '32',
                    allocation: 65
                });

                expect(response.investmentProgram).toBe('INVESTMENT_MANAGEMENT');

                expect(response.signing).toBeDefined();

                done();
            }).catch(logJudgeError);
        });

        it('signs funds update', done => {
            let info;
            judgeSession.setNextCase('signing.tac.contracts.insurances.withId.funds.update').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').funds.update({
                    funds: [
                        {
                            code: '31',
                            allocation: 35
                        },
                        {
                            code: '32',
                            allocation: 65
                        }
                    ],
                    investmentProgram: 'INVESTMENT_MANAGEMENT'
                });
            }).then(response => {
                expectToBe(response.funds[0], {
                    code: '31',
                    allocation: 35
                });

                expectToBe(response.funds[1], {
                    code: '32',
                    allocation: 65
                });

                expect(response.investmentProgram).toBe('INVESTMENT_MANAGEMENT');

                testStateOpen(response.signing);
                info = response;
                return response.signing.getInfo();
            }).then(response => {

                testStateOpen(info.signing);
                testStateOpen(response);
                testAuthorizationTac(response);
                return response.startSigningWithTac();
            }).then(response => {
                testStateOpen(info.signing);
                
                return response.finishSigning('00000000');
            }).then(response => {

                testStateDone(info.signing);
                testStateDone(response);

                done();
            }).catch(logJudgeError);
        });

        it('retrieves beneficiaries', done => {
            judgeSession.setNextCase('contracts.insurances.withId.beneficiaries.get').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').beneficiaries.list();
            }).then(response => {
                
                expectToBe(response.items[0], {
                    type: 'PERSON',
                    name: 'Bielčik Tomáš',
                    percentage: 50,
                });

                expectDate(response.items[0], {
                    birthdate: '2003-09-10'
                });

                expectDate(response.items[1], {
                    birthdate: '2008-06-09'
                });

                done();
            }).catch(logJudgeError);
        });

        it('updates beneficiaries', done => {
            judgeSession.setNextCase('contracts.insurances.withId.beneficiaries.update').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').beneficiaries.update({
                    beneficiaries: [
                        {
                            type: 'PERSON',
                            name: 'Mgr. Rudolf Mrazek',
                            birthdate: new Date('1978-01-18'),
                            percentage: 20
                        },
                        {
                            type: 'PERSON',
                            name: 'Bielčik Tomáš',
                            birthdate: new Date('2003-09-10'),
                            percentage: 40
                        },
                        {
                            type: 'PERSON',
                            name: 'Bielčiková Eliška',
                            birthdate: new Date('2008-06-09'),
                            percentage: 40
                        }
                    ]
                });
            }).then(response => {

                expectToBe(response.beneficiaries[0], {
                    type: 'PERSON',
                    name: 'Mgr. Rudolf Mrazek',
                    percentage: 20
                });

                expectDate(response.beneficiaries[0], {
                    birthdate: '1978-01-18'
                });     

                done();
            }).catch(logJudgeError);
        });

        it('retrieves insurees', done => {
            judgeSession.setNextCase('contracts.insurances.withId.insurees.list').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').insurees.list();
            }).then(response => {
                expectToBe(response.items[0], {
                    id: '78afefe2d55e124cbd4a1bbfa1a1bbb0b1ec5bc8b434a2a17703ea6c6d597092',
                    type: 'POLICYHOLDER',
                    name: 'Hana Bielčíková'
                });

                done();
            }).catch(logJudgeError);
        });

        it('retrieves payments', done => {
            judgeSession.setNextCase('contracts.insurances.withId.payments.list').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').payments.list();
            }).then(response => {
                expectToBe(response.items[0], {
                    id: '33',
                    type: 'FUTURE'
                });

                expectDate(response.items[0], {
                    instructionFrom: '2016-09-01',
                    instructionTo: '2016-09-30'
                });

                done();
            }).catch(logJudgeError);
        });

        it('retrieves services', done => {
            judgeSession.setNextCase('contracts.insurances.withId.services.list').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').services.list();
            }).then(response => {
                expectToBe(response.items[0], {
                    id: '1',
                    group: 'RISK_SPORTS',
                    iconGroup: 'RISK_SPORTS',
                    availableDays: 30
                });

                done();
            }).catch(logJudgeError);
        });

        it('activates risk sports', done => {
            judgeSession.setNextCase('contracts.insurances.withId.services.activateRiskSports').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').services.activateRiskSports({
                    dateFrom: new Date('2016-08-16'),
                    dateTo: new Date('2016-08-20'),
                    phoneNumber: '602123456'
                });
            }).then(response => {
                expectToBe(response, {
                    policyNumber: '7009689942',
                    phoneNumber: '602123456'
                });

                expectDate(response, {
                    dateFrom: '2016-08-16',
                    dateTo: '2016-08-20',
                });

                expect(response.signing).toBeDefined();

                done();
            }).catch(logJudgeError);
        });

        it('deactivates risk sports', done => {
            judgeSession.setNextCase('contracts.insurances.withId.services.deactivateRiskSports').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').services.deactivateRiskSports({
                    dateFrom: new Date('2016-08-16'),
                    dateTo: new Date('2016-08-20'),
                    phoneNumber: '602123456'
                });
            }).then(response => {
                expect(response.signing).toBeDefined();

                done();
            }).catch(logJudgeError);
        })

        it('retrieves events', done => {
            judgeSession.setNextCase('contracts.insurances.withId.events.list').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').events.list();
            }).then(response => {
                expectToBe(response.items[0], {
                    number: '13344534534',
                    state: 'CLOSED',
                    substate: 'Odesláno pojistné plnění'
                });

                expectDate(response.items[0], {
                    substateDate: '2015-10-14',
                    processingDate: '2015-03-02',
                });

                response.items[0].indemnities.forEach(x => {
                    expectDate(x, {
                        paymentDate: '2015-10-14',
                    });
                });
            
                done();
            }).catch(logJudgeError);
        });

        it('retrieves tax benefits', done => {
            judgeSession.setNextCase('contracts.insurances.withId.taxBenefits.get').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').taxBenefits.get();
            }).then(response => {
                expectToBe(response, {
                    recommendedDepositText: 'za předpokladu doplacení 4 splátek po 600 Kč v roce 2016',
                });

                expectToBe(response.taxDeductiblePremium, {
                    value: 29000,
                    precision: 2,
                    currency: 'CZK'
                });

                done();
            }).catch(logJudgeError);
        });

        it('retrieves strategies', done => {
            judgeSession.setNextCase('contracts.insurances.withId.strategies.list').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').strategies.list();
            }).then(response => {

                expectToBe(response.items[0], {
                    type: 'ACTUAL_SETTING',
                    group: 'STRATEGY'
                });

                done();
            }).catch(logJudgeError);
        });

        it('updates transfer', done => {
            judgeSession.setNextCase('contracts.insurances.withId.transfer.update').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').transfer.update({
                    type: 'PAY_PREMIUM',
                    amount: {
                        value: 1500,
                        precision: 2,
                        currency: 'CZK'
                    },
                    sender: {
                        number: '2723000003',
                        bankCode: '0800'
                    }
                });
            }).then(response => {

                expect(response.signing).toBeDefined();

                done();
            }).catch(logJudgeError);
        });

        it('updates transfer and signs it', done => {
            let info;
            judgeSession.setNextCase('signing.tac.contracts.insurances.withId.transfer.update').then(() => {
                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').transfer.update({
                    type: 'PAY_PREMIUM',
                    amount: {
                        value: 1500,
                        precision: 2,
                        currency: 'CZK'
                    },
                    sender: {
                        number: '2723000003',
                        bankCode: '0800'
                    }
                });
            }).then(response => {
                testStateOpen(response.signing);
                info = response;
                return response.signing.getInfo();

            }).then(response => {

                testStateOpen(info.signing);
                testStateOpen(response);
                testAuthorizationTac(response);
                return response.startSigningWithTac();
            }).then(response => {
                testStateOpen(info.signing);
                
                return response.finishSigning('00000000');
            }).then(response => {

                testStateDone(info.signing);
                testStateDone(response);

                done();
            }).catch(logJudgeError);
        });
    });
});

