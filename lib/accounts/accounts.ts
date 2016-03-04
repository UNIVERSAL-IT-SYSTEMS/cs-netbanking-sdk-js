/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.node.d.ts" />
import CSCoreSDK = require('cs-core-sdk');
import {Signed, AccountNo, Amount} from '../common';

export interface AccountList extends CSCoreSDK.PaginatedListResponse<Account> {}

export interface Account {
    id: string,
    accountno: AccountNo,
    alias?: string,
    description?: string,
    balance: Amount,
    disposable?: Amount,
    type: string,
    subtype: string,
    productI18N: string,
    product: string,
    overdraft?: OverdraftAmount,
    flags?: [string],
    subaccounts?: [SubAccount],
    creditInterestRate?: number,
    debitInterestRate?: number,
    penaltyInterestRate?: number,
    loan?: Loan,
    saving?: Saving,
    ownTransferReceivers?: TransferReceivers, 
}

export interface SignedAccount extends Account, Signed {}

export interface OverdraftAmount extends Amount {
    dueDate?: Date
}

export interface SubAccount {
    id: string,
    accountno: AccountNo,
    type: string,
    subtype: string,
    product: string,
    productI18N: string,
    balance: Amount,
    creditInterestRate: number,
    // cz-interestRateOverLimit?: string,
    // cz-interestRateLimit?: Amount,
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
    accountno: AccountNo
}

export interface ChangeAccountSettingsRequest {
    id?: string,
    alias?: string
}