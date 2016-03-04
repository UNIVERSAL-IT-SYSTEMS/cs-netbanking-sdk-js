/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Signed, AccountNumber, Amount} from '../common';

export interface AccountList extends CSCoreSDK.PaginatedListResponse<MainAccount> {}

export interface MainAccount {
    alias?: string,
    description?: string,
    disposable?: Amount,
    overdraft?: OverdraftAmount,
    flags?: [string],
    subaccounts?: [SubAccount],
    debitInterestRate?: number,
    penaltyInterestRate?: number,
    loan?: Loan,
    saving?: Saving,
    ownTransferReceivers?: TransferReceivers, 
}

export interface SignedAccount extends MainAccount, Signed {}

export interface OverdraftAmount extends Amount {
    dueDate?: Date
}

export interface SubAccount extends Account {
    // cz-interestRateOverLimit?: string,
    // cz-interestRateLimit?: Amount,
}

export interface Account {
    id: string,
    accountno: AccountNumber,
    type: string,
    subtype: string,
    product: string,
    productI18N: string,
    balance: Amount,
    creditInterestRate: number,
}

export interface Loan {
    interestRateToDate?: number,
    loanAmount?: Amount,
    maturityDate?: Date,
    remainingLoanAmount: Amount,
    drawdownToDate?: Date,
    drawdownAmount: Amount,
    outstandingDebt?: Amount,
    // cz-lumpsumRepayment?: Amount,
    installmentFrequency?: string,
    installmentDay?: Date,
    nextRateAmount?: Amount,
    nextRateDate?: Date  
}

export interface Saving {
    interestRateOverLimit?: number,
    interestRateLimit?: Amount,
    //cz-bonusInterestRate?: number,
    savingGoal?: number,
    targetAmount?: Amount,
    minimumBalance?: Amount,
    nextProlongation: Date,
    extraSavingMaximum?: Amount,
    //cz-extraSavingMaximumMonthly?: Amount,
}

export interface TransferReceivers {
    id: number,
    accountno: AccountNumber
}

export interface ChangeAccountSettingsRequest {
    id?: string,
    alias?: string
}