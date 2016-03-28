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
        judge = new CoreSDK.Judge();
        //Because Judge starts slowly on the first request
        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    });
    
    afterAll(function(){
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
    });    
    
    beforeEach(function(){
        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
        client =  netbanking.getClient();	
        judgeSession = judge.startNewSession();
    });
    
    function processAccountsFromPage0(accounts) {
        var account = accounts.items[0];
        expectToBe(accounts.pagination, {
            pageNumber: 0,
            pageCount: 2,
            pageSize: 1,
            nextPage: 1
        });
        
        expectToBe(account, {
            id: '4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE',
            description: 'Aleš Vrba',
            alias: 'muj ucet'
        });
    }
    
    function processServicesFromPage0(services) {
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
    }
    
    function processReservationsFromPage0(reservations) {
        
        var reservation = reservations.items[0];
        
        expectDate(reservation, {
            creationDate: '2015-09-18T21:43:53Z',
            expirationDate: '2015-09-25T21:43:53Z'
        });
        
        expectToBe(reservations.pagination, {
            pageNumber: 0,
            pageSize: 1,
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
    }
    
    function processStatements(statements) {
        var statement = statements.items[0];
        
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
    }
    
    function processSubAccountsStatements(statements) {
        var statement = statements.items[0];

        expectDate(statement, {
            statementDate: '2013-06-21T14:18:19Z'
        })
        
        expectToBe(statements.pagination, {
            pageNumber: 0,
            pageCount: 2,
            nextPage: 1
        });
        
        expectToBe(statement, {
            id: '201302520130621161819',
            number: 25,
            periodicity: 'MONTHLY',
            format: 'PDF_A4',
            language: 'cs'
        });
    }
    
    describe('Netbanking SDK accounts', () => {
       
       it('retrieves a list of accounts', done => {
          judgeSession.setNextCase('accounts.list').then(() => {
              return client.accounts.list({
                  type: 'CURRENT',
                  pageNumber: null,
                  pageSize: null
              });
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
       
       it('tests pagination for accounts list', done => {
          var response;
          judgeSession.setNextCase('accounts.list.page0').then(() => {
              return client.accounts.list({
                  pageNumber: 0,
                  pageSize: 1
              });
          }).then(accounts => {
              
              processAccountsFromPage0(accounts);
              response = accounts;
          }).then(() => {
              return judgeSession.setNextCase('accounts.list.page1');
          }).then(() => {
              return response.nextPage();
          }).then(accounts => {
              
              var account = accounts.items[0];
              
              expectToBe(accounts.pagination, {
                  pageNumber: 1,
                  pageCount: 2,
                  pageSize: 1
              });
              
              expectToBe(account, {
                  id: 'EC1C13B722F726D783365D0A89D23E805098B167',
                  description: 'Aleš Vrba' 
              });
              
              expectDate(account.loan, {
                  nextRateDate: '2016-03-31',
                  maturityDate: '2037-12-31',
                  drawdownToDate: '2012-12-31'
              });
              
              response = accounts;
          }).then(() => {
              return judgeSession.setNextCase('accounts.list.page0');
          }).then(() => {
              return response.prevPage();
          }).then(accounts => {
              processAccountsFromPage0(accounts);
              
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
                 countryCode: 'CZ' 
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
               
               processServicesFromPage0(services);
               
               done();
           }).catch(e => {
                logJudgeError(e);
           });
       });
    });
    
    it('tests pagination for accounts services', done => {
        var response;
        judgeSession.setNextCase('accounts.withId.services.list.page0').then(() => {
            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').services.list({
                pageNumber: 0,
                pageSize: 1
            });
        }).then(services => {
            
            processServicesFromPage0(services);
            
            response = services;
        }).then(() => {
            return judgeSession.setNextCase('accounts.withId.services.list.page1');
        }).then(() => {
            return response.nextPage();
        }).then(services => {
            
            var service = services.items[0];
            expectToBe(services.pagination, {
                pageNumber: 1,
                pageCount: 4,
                pageSize: 2,
                nextPage: 2
            });
            
            expectToBe(service, {
                id: '5F66602F35A7D5A86066BC03A6882180BEF01CA3',
                nameI18N: 'Všechny platby v Kč',
                iconGroup: 'PAYMENTS'
            });
            
            response = services;
        }).then(() => {
            return judgeSession.setNextCase('accounts.withId.services.list.page0');
        }).then(() => {
            return response.prevPage();
        }).then(services => {
            
            processServicesFromPage0(services);
            
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
            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').reservations.list();
        }).then(reservations => {
            
            processReservationsFromPage0(reservations);
            
            done();
        }).catch(e => {
            logJudgeError(e);
        });
    });
    
    it('tests pagination for accounts reservations', done => {
        var response;
        judgeSession.setNextCase('accounts.withId.reservations.list.page0').then(() => {
            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').reservations.list({
                pageNumber: 0,
                pageSize: 1
            });
        }).then(reservations => {
            
            processReservationsFromPage0(reservations);
            
            response = reservations;
        }).then(() => {
            return judgeSession.setNextCase('accounts.withId.reservations.list.page1');
        }).then(() => {
            return response.nextPage();
        }).then(reservations => {
            
            var reservation = reservations.items[0];
            expectToBe(reservations.pagination, {
                pageNumber: 1,
                pageCount: 2,
                pageSize: 1
            });
            
            expectToBe(reservation, {
                status: 'RESERVED',
                merchantName: 'AAA Taxi',
                description: 'Platba kartou'
            });
            
            expectDate(reservation, {
                creationDate: '2015-09-18T21:54:58Z',
                expirationDate: '2015-09-25T21:54:58Z'
            });
            
            response = reservations;
        }).then(() => {
            return judgeSession.setNextCase('accounts.withId.reservations.list.page0');
        }).then(() => {
            return response.prevPage();
        }).then(reservations => {
            
            processReservationsFromPage0(reservations);
            
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
           return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').statements.list({
               sort: 'statementDate',
               order: 'asc',
               pageNumber: null,
               pageSize: null
           });
       }).then(statements => {
           
           processStatements(statements);
           
           done();
       }).catch(e => {
           logJudgeError(e);
       });
    });
    
    it('tests pagination for accounts statements', done => {
        var response;
        judgeSession.setNextCase('accounts.withId.statements.list.page0').then(() => {
            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').statements.list({
                pageNumber: 0,
                pageSize: 1
            });
        }).then(statements => {
            
            processStatements(statements);
            
            response = statements;
        }).then(() => {
            return judgeSession.setNextCase('accounts.withId.statements.list.page1');
        }).then(() => {
            return response.nextPage();
        }).then(statements => {
            
            var statement = statements.items[0];
            
            expectToBe(statements.pagination, {
                pageNumber: 1,
                pageCount: 2,
                pageSize: 1
            });
            
            expectToBe(statement, {
                id: '06029392819b0197',
                number: 3,
                periodicity: 'MONTHLY',
                language: 'cs'
            });
            
            expectDate(statement, {
                statementDate: '2016-02-29T00:00:00+01:00'
            });
            
            response = statements;
        }).then(() => {
            return judgeSession.setNextCase('accounts.withId.statements.list.page0');
        }).then(() => {
            return response.prevPage();
        }).then(statements => {
            
            processStatements(statements);
            
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
                sort: 'statementDate',
                order: 'asc',
                pageNumber: null,
                pageSize: null
            });            
        }).then(statements => {
            
            processSubAccountsStatements(statements);
            
            done();
        }).catch(e => {
           logJudgeError(e);
        });
    });
    
    it('tests pagination for sub accounts statements', done => {
        var response;
        judgeSession.setNextCase('accounts.withId.subAccounts.withId.statements.list.page0').then(() => {
            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').subAccounts.withId('0D5F82464A77DF093858A8A5B938BEE410B4409C').statements.list({
                pageNumber: 0,
                pageSize: 1
            });  
        }).then(statements => {
            
            processSubAccountsStatements(statements);
            
            response = statements;
        }).then(() => {
            return judgeSession.setNextCase('accounts.withId.subAccounts.withId.statements.list.page1');
        }).then(() => {
            return response.nextPage();
        }).then(statements => {
            
            var statement = statements.items[0];
            
            expectToBe(statements.pagination, {
                pageNumber: 1,
                pageCount: 2,
                pageSize: 1 
            });
            
            expectToBe(statement, {
                id: '201302524845621161819',
                number: 19,
                periodicity: 'DAILY'
            });
            
            expectDate(statement, {
                statementDate: '2014-05-11T14:12:19Z'
            });
            
            response = statements;
        }).then(() => {
            return judgeSession.setNextCase('accounts.withId.subAccounts.withId.statements.list.page0');
        }).then(() => {
            return response.prevPage();
        }).then(statements => {
            processSubAccountsStatements(statements);
            
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

