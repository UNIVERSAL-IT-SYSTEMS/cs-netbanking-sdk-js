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
describe("Netbanking SDK",function(){
    var originalTimeoutInterval = null;
    
    beforeAll(function(){
        judge = new CoreSDK.Judge('http://localhost:3001');
        //Because Judge starts slowly on the first request
        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
    });
    
    afterAll(function(){
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
    });    
    
    beforeEach(function(){
        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
        client =  netbanking.getClient();	
        judgeSession = judge.startNewSession();
    });
    
    describe('Netbanking SDK accounts', () => {
       
       it('retrieves a list of accounts', done => {
          judgeSession.setNextCase('accounts.list').then(() => {
              return client.accounts.list();
          }).then(accounts => {
              
              expect(accounts.items.length).toBe(1);
              
              expectToBe(accounts.pagination, {
                  pageNumber: 0,
                  pageCount: 1,
                  pageSize: 1,
              });
              
              expectToBe(accounts.items[0], {
                  id: '076E1DBCCCD38729A99D93AC8D3E8273237C7E36',
                  description: 'Anna Vojtíšková',
                  product: '49',
                  productI18N: 'Osobní účet ČS II',
                  subType: 'GIRO_ACCOUNT'
              });
              
              done();
          }).catch(e => {
              logJudgeError(e);
          });
       });
       
       it('retrieves an individual account with a given id', done => {
          judgeSession.setNextCase('accounts.withId.get').then(() => {
              return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').get();
          }).then(account => {
              expectToBe(account, {
                  id: '076E1DBCCCD38729A99D93AC8D3E8273237C7E36',
                  description: 'Anna Vojtíšková',
                  product: '49',
                  productI18N: 'Osobní účet ČS II',
                  subType: 'GIRO_ACCOUNT'
              });
              
              expectToBe(account.accountno, {
                 number: '2328489013',
                 bankCode: '0800',
                 countryCode: 'CZK' 
              });
              
              expectToBe(account.balance, {
                  value: 2650706,
                  precision: 2,
                  currency: 'CZK'
              });
              
              done();
          }).catch(e => {
              logJudgeError(e);
          });
       });
       
       it('updates alias on a given account', done => {
          judgeSession.setNextCase('accounts.withId.update').then(() => {
              return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').update({
                 alias: 'muj ucet'
              });
          }).then(account => {
              expectToBe(account, {
                  id: '076E1DBCCCD38729A99D93AC8D3E8273237C7E36',
                  alias: 'muj ucet',
                  description: 'Aleš Vrba'
              });
              
              done();
          }).catch(e => {
              logJudgeError(e);
          });
       });
       
       it('retrieves accounts balances', done => {
            judgeSession.setNextCase('accounts.withId.balances.get').then(() => {
                return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').balance.get();    
            }).then(balance => {
               expectToBe(balance.balance, {
                   value: 2650706,
                   currency: 'CZK',
                   precision: 2
               });
               
               expectToBe(balance.disposable, {
                   value: 2650706,
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
               return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').services.list({
                   pageNumber: 0,
                   pageSize: 2
               });
           }).then(services => {
               
               var service = services.items[0];
               expect(services.items.length).toBe(2);
               
               expectDate(service, {
                   dateFrom: '2014-07-31+0100',
                   dateTo: '2014-08-31+0100'
               });
               
               expectToBe(services.pagination, {
                   pageNumber: 0,
                   pageCount: 4,
                   pageSize: 2,
                   nextPage: 1 
               });  
               
               expectToBe(service, {
                   id: 'E878D16AD1A79FB60A520F48706C187AEFCA9D5D',
                   nameI18N: '2x výběr z bankomatů České spořitelny',
                   iconGroup: 'CARDS',
               });
               
               expectToBe(services.items[1], {
                   id: '3FB37388FC58076DEAD3DE282E075592A299B596',
                   nameI18N: 'Platební karta',
                   iconGroup: 'CARDS',
               });
               
               done();
           }).catch(e => {
                logJudgeError(e);
           });
       });
    });
    
    it('retrieves a list of transactions', done => {
        judgeSession.setNextCase('accounts.withId.transactions.list').then(() => {
            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').transactions.list();
        }).then(transactions => {
           var transaction = transactions.items[0];
           
           expect(transactions.items.length).toBe(2);
           
           expectToBe(transaction, {
               id: 'CCBD429926DBA804UTC20140218230000000',
               senderName: 'Můj osobní účet',
               location: '196 ČS, Dělnická Praha 7'
           });
           
           expectDate(transaction, {
               bookingDate: '2014-06-23T23:00:00Z',
               valuationDate: '2014-06-23T23:00:00Z',
               transactionDate: '2014-06-21T12:25:10Z' 
           });
           
           done(); 
        }).catch(e => {
            logJudgeError(e);
        });
    });
    
    it('exports transaction history into pdf', done => {
        judgeSession.setNextCase('accounts.withId.transactions.export').then(() => {
            
        }).catch(e => {
            logJudgeError(e);
        });
        
        done();
    });
    
    it('retrieves list of reservations of the account', done => {
        judgeSession.setNextCase('accounts.withId.reservations.list').then(() => {
            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').reservations.list({
                pageNumber: 0,
                pageSize: 2
            });
        }).then(reservations => {
            
            var reservation = reservations.items[0];
            expect(reservations.items.length).toBe(2);
            
            expectDate(reservation, {
                creationDate: '2015-09-18T21:43:53Z',
                expirationDate: '2015-09-25T21:43:53Z'
            });
            
            expectToBe(reservations.pagination, {
                pageNumber: 0,
                pageCount: 1,
                pageSize: 2,
                nextPage: 1
            });
            
            expectToBe(reservation, {
                status: 'RESERVED',
                merchantName: 'Pizzeria Grosseto',
                description: 'Platba kartou'
            });
            
            expectToBe(reservation.amount, {
                value: 45270,
                precision: 2,
                currency: 'CZK'
            });
            
            done();
        }).catch(e => {
            logJudgeError(e);
        });
    });
    
    it('revolves loan disbursement', done => {
        judgeSession.setNextCase('accounts.withId.transfers.update').then(() => {
            
        }).catch(e => {
            logJudgeError(e);
        });
        
        done();
    })
    
    it('retrieves list of repayments of the account', done => {
       judgeSession.setNextCase('accounts.withId.repayments.list').then(() => {
           return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').repayments.list();
       }).then(repayments => {
          
           var repayment = repayments.items[0];
           
           expect(repayments.items.length).toBe(2);
           expectDate(repayment, {
               repaymentDate: '2016-01-18'
           })
           
           expectToBe(repayment.amount, {
               value: 32500,
               precision: 2,
               currency: 'CZK'
           });
           
           expectToBe(repayment.paidAmount, {
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
           return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').statements.list();
       }).then(statements => {
           
           var statement = statements.items[0];
           expect(statements.items.length).toBe(1);
           
           expectDate(statement, {
               statementDate: '2016-02-29T00:00:00+01:00'
           });
           
           expectToBe(statements.pagination, {
               pageNumber: 0,
               pageCount: 1,
               pageSize: 1
           });
           
           expectToBe(statement, {
               id: '06029392819b0198',
               number: 2,
               periodicity: 'MONTHLY',
               format: 'PDF_A4',
               language: 'cs'
           });
           
           done();
       }).catch(e => {
           logJudgeError(e);
       });
    });
    
    it('downloads statements file', done => {
       judgeSession.setNextCase('accounts.withId.statements.download').then(() => {
           
       }).catch(e => {
           logJudgeError(e);
       });
       
       done();
    });
    
    it('retrieves list of statements on the sub account', done => {
        judgeSession.setNextCase('accounts.withId.subAccounts.withId.statements.list').then(() => {
            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').subAccounts.withId('0D5F82464A77DF093858A8A5B938BEE410B4409C').statements.list({
                pageNumber: 0,
                pageSize: 2
            });            
        }).then(statements => {
            
            var statement = statements.items[0];
             
            expect(statements.items.length).toBe(2);

            expectDate(statement, {
                statementDate: '2013-06-21T14:18:19Z'
            })
            
            expectToBe(statements.pagination, {
                pageNumber: 0,
                pageCount: 2,
                pageSize: 100,
                nextPage: 1
            });
            
            expectToBe(statement, {
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
    
    it('downloads subAccounts statements file', done => {
       judgeSession.setNextCase('accounts.withId.subAccounts.withId.statements.download').then(() => {
           
       }).catch(e => {
           logJudgeError(e);
       });
       
       done();
    });
});

