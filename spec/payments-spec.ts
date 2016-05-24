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
import {testAuthorizationTac, testStateOpen, testStateDone} from './helpers';

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
    
    var bookingDatePayload = {
        accountId: '4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE',
        receiver: {
            number: '123-123',
            bankCode: '0100',
            countryCode: 'CZ'
        },
        priority: 'STANDARD'
    }
    
    var mobilePaymentPayload = {
        paymentType: 'VODAFONE_PAYMENT',
        phoneNumber: '777952341',
        sender: {
            iban: 'CZ1208000000002059930033',
            bic: 'GIBACZPX',
            number: '2059930033',
            bankCode: '0800',
            countryCode: 'CZ'
        },
        amount: {
            value: 3000,
            precision: 0,
            currency: 'CZK'
        },
        confirmationPhoneNumber: '777952341'
    }
    
    function processMobilePayment(response) {
        expectToBe(response, {
            paymentType: 'VODAFONE_PAYMENT',
            phoneNumber: '777952341'
        });
        
        testStateOpen(response.signing);
    }
    
    function processPayment(payment) {
        
        expectDate(payment, {
            executionDate: '2016-03-20T00:00:00+01:00',
            modificationDate: '2016-03-20T18:16:04+01:00',
            transferDate: '2016-03-21'
        });
        
        expectToBe(payment, {
            id: '1023464260',
            orderCategory: 'OWN_TRANSFER',
            senderName: 'Aleš Vrba',
            receiverName: 'Vrba Aleš'
        });
        
        testStateOpen(payment.signing);
    }
    
    describe('payments', () => {
        
        it('retrieves list of payments', done => {
            judgeSession.setNextCase('payments.list').then(() => {
                return client.orders.payments.list({
                    sort: ['transferDate'],
                    order: ['asc'],
                    pageNumber: null,
                    pageSize: null
                });
            }).then(payments => {
                
                expectToBe(payments.pagination, {
                    pageNumber: 0,
                    pageCount: 1,
                    pageSize: 2
                });
                
                processPayment(payments.items[0]);
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('tests pagination', done => {
            var response;
            judgeSession.setNextCase('payments.list.page0').then(() => {
                return client.orders.payments.list({
                    pageNumber: 0,
                    pageSize: 1
                });
            }).then(payments => {
                
                var payment = payments.items[0];
                expectToBe(payments.pagination, {
                    pageNumber: 0,
                    pageCount: 7,
                    pageSize: 1,
                    nextPage: 1     
                });
                
                expectToBe(payment, {
                    id: '1154226597',
                    senderName: 'Vrba' 
                });
                
                expectDate(payment, {
                    executionDate: '2016-03-21T00:00:00+01:00',
                    modificationDate: '2016-03-21T10:33:41+01:00',
                    transferDate: '2016-03-23'
                });
                
                testStateOpen(payment.signing);
                
                response = payments;
            }).then(() => {
                return judgeSession.setNextCase('payments.list.page1');
            }).then(() => {
                return response.nextPage();
            }).then(payments => {
                
                var payment = payments.items[0];
                
                expectToBe(payments.pagination, {
                    pageNumber: 1,
                    pageCount: 7,
                    pageSize: 1,
                    nextPage: 2
                });
                
                expectToBe(payment, {
                    id: 'T4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE_1XZ1XZO5o0VZB',
                    state: 'CLOSED',
                    stateDetail: 'FIN',
                    stateOk: true
                });
                
                expectDate(payment, {
                    executionDate: '2016-03-22T00:00:00+01:00',
                    transferDate: '2016-03-22',
                });
                
                expect(payment.signing.state).toBe('NONE');
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('retrieves payment with a given id', done => {
            judgeSession.setNextCase('payments.withId.get').then(() => {
                return client.orders.payments.withId('1023464260').get();
            }).then(payment => {
                
                processPayment(payment);
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('removes payment with a given id', done => {
            judgeSession.setNextCase('payments.withId.delete').then(() => {
                return client.orders.payments.withId('1023464260').delete();
            }).then(response => {
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('retrieves currently available booking date', done => {
            judgeSession.setNextCase('payments.bookingDate.update').then(() => {
                return client.orders.payments.bookingDate.update(bookingDatePayload);
            }).then(response => {
                
                expectDate(response, {
                    bookingDate: '2016-03-21T00:00:00+01:00'
                });
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('retrieves currently available booking date twice from same resource', done => {
            var resource = client.orders.payments.bookingDate;
            
            judgeSession.setNextCase('payments.bookingDate.update').then(() => {
                return resource.update(bookingDatePayload);
            }).then(response => {
                expectDate(response, {
                    bookingDate: '2016-03-21T00:00:00+01:00'
                });
                
                return judgeSession.setNextCase('payments.bookingDate.update');
            }).then(() => {
                return resource.update(bookingDatePayload);
            }).then(response => {
                expectDate(response, {
                    bookingDate: '2016-03-21T00:00:00+01:00'
                });
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('creates a domestic payment', done => {
            judgeSession.setNextCase('payments.domestic.create').then(() => {
                return client.orders.payments.domestic.create({
                    senderName: "Vrba",
                    sender: {
                        number: "2059930033",
                        bankCode: "0800"
                    },
                    receiverName: "Vojtíšková",
                    receiver: {
                        number: "2328489013",
                        bankCode: "0800"
                    },
                    amount: {
                        value: 110,
                        precision: 2,
                        currency: "CZK"
                    }
                });
            }).then(response => {
                
                expectDate(response, {
                    executionDate: '2016-03-21T00:00:00+01:00',
                    modificationDate: '2016-03-21T10:30:54+01:00',
                    transferDate: '2016-03-21'
                });
                
                expectToBe(response, {
                    id: '1154226597',
                    receiverName: 'Vojtíšková',
                    senderName: 'Vrba',
                    stateOk: true
                });
                
                expectToBe(response.amount, {
                    value: 110,
                    precision: 2,
                    currency: 'CZK'
                });
                
                expectToBe(response.sender, {
                    number: '2059930033',
                    bankCode: '0800',
                    countryCode: 'CZ'
                });
                
                expectToBe(response.receiver, {
                   number: '2328489013',
                   bankCode: '0800',
                   countryCode: 'CZ' 
                });
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('creates domestic payment and signs the order', done => {
            var info;
            judgeSession.setNextCase('signing.tac.payments.domestic.create').then(() => {
                return client.orders.payments.domestic.create({
                    senderName: "Vrba",
                    sender: {
                        number: "2328489013",
                        bankCode: "0800"
                    },
                    receiverName: "Vojtíšková",
                    receiver: {
                        number: "2059930033",
                        bankCode: "0800"
                    },
                    amount: {
                        value: 110,
                        precision: 2,
                        currency: "CZK"
                    }
                });
            }).then(response => {
                info = response;
                testStateOpen(response.signing);
                return response.signing.getInfo();
            }).then(response => {
                testAuthorizationTac(response);
                testAuthorizationTac(info.signing);
                return response.startSigningWithTac();
            }).then(response => {
                testStateOpen(info.signing);
                return response.finishSigning('00000000');
            }).then(response => {
                testStateDone(response);
                testStateDone(info.signing);
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('updates domestic payment', done => {
            judgeSession.setNextCase('payments.domestic.update').then(() => {
                return client.orders.payments.domestic.withId('1154226597').update({
                    senderName: "Vrba",
                    sender: {
                        number: "2059930033",
                        bankCode: "0800" 
                    },
                    receiverName: "Vojtíšková Alena",
                    receiver: {
                        number: "2328489013",
                        bankCode: "0800"
                    },
                    amount: {
                        value: 110,
                        precision: 2,
                        currency: "CZK"
                    }
                });
            }).then(response => {
                
                expectDate(response, {
                    transferDate: '2016-03-21',
                    modificationDate: '2016-03-21T10:33:41+01:00',
                    executionDate: '2016-03-21T00:00:00+01:00'
                });
                
                expectToBe(response, {
                    id: '1154226597',
                    senderName: 'Vrba',
                    receiverName: 'Vojtíšková Alena' 
                });
                 
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('updates domestic payment and signs the order', done => {
            var info;
            judgeSession.setNextCase('signing.tac.payments.domestic.withId.update').then(() => {
                return client.orders.payments.domestic.withId('160429968927553').update({
                    senderName: "Vrba",
                    sender: {
                        number: "2059930033",
                        bankCode: "0800"
                    },
                    receiverName: "Vojtíšková Alena",
                    receiver: {
                        number: "2328489013",
                        bankCode: "0800"
                    },
                    amount: {
                        value: 110,
                        precision: 2,
                        currency: "CZK"
                    }
                });
            }).then(response => {
                info = response;
                testStateOpen(response.signing);
                return response.signing.getInfo();
            }).then(response => {
                testAuthorizationTac(response);
                testAuthorizationTac(info.signing);
                return response.startSigningWithTac();
            }).then(response => {
                testStateOpen(info.signing);
                return response.finishSigning('00000000');
            }).then(response => {
                testStateDone(response);
                testStateDone(info.signing);
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('retrieves remaining amounts for payments', done => {
            judgeSession.setNextCase('payments.limits.list').then(() => {
                return client.orders.payments.limits.list();
            }).then(limits => {
                
                expect(limits.items.length).toBe(2);
                
                expectToBe(limits.items[0], {
                    authorizationType: 'TAC',
                    channelId: 'NET_BANKING',
                    applicationId: 'GEORGE'
                });
                
                expectToBe(limits.items[0].remainingAmount, {
                    value: 99999999999999,
                    precision: 2,
                    currency: 'CZK'
                });
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('recharges the credit on prepaid card', done => {
            judgeSession.setNextCase('payments.mobile.create').then(() => {
                return client.orders.payments.mobile.create(mobilePaymentPayload);
            }).then(response => {
                processMobilePayment(response);
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('recharges the credit on prepaid card and signs the order', done => {
            var info;
            judgeSession.setNextCase('signing.tac.orders.payments.mobile.create').then(() => {
                return client.orders.payments.mobile.create({
                    paymentType: "VODAFONE_PAYMENT",
                    phoneNumber: "777952341",
                    sender: {
                        iban: "CZ1208000000002059930033",
                        bic: "GIBACZPX",
                        number: "2059930033",
                        bankCode: "0800",
                        countryCode: "CZ"
                    },
                    amount: {
                        value: 3000,
                        precision: 0,
                        currency: "CZK"
                    },
                    "confirmationPhoneNumber": "777952341"
                });
            }).then(response => {
                info = response;
                testStateOpen(response.signing);
                return response.signing.getInfo();
            }).then(response => {
                testAuthorizationTac(response);
                testAuthorizationTac(info.signing);
                return response.startSigningWithTac();               
            }).then(response => {
                testStateOpen(info.signing);
                return response.finishSigning('00000000');
            }).then(response => {
                testStateDone(response);
                testStateDone(info.signing);
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
        
        it('recharges the credit on prepaid card twice from same resource', done => {
            var resource = client.orders.payments.mobile;
            
            judgeSession.setNextCase('payments.mobile.create').then(() => {
                return resource.create(mobilePaymentPayload);
            }).then(response => {
                processMobilePayment(response);
                
                return judgeSession.setNextCase('payments.mobile.create');
            }).then(response => {
                return resource.create(mobilePaymentPayload);
            }).then(response => {
                processMobilePayment(response);
                
                done();
            }).catch(e => {
                logJudgeError(e);
            });
        });
    });
});

