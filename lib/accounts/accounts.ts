export interface AccountsListing extends Pagination {
    accounts?: [Account]
}

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

export interface SignedAccount extends Account {
    signInfo: Signed
}

export interface SignInfo {
    state: string,
    signId?: number
}

export interface AccountNo {
    number: string,
    bankCode: string,
    countryCode?: string,
    // cz-iban: string,
    // cz-bic: string,
}

export interface Amount {
    value: number,
    precision: number,
    currency: string
}

export interface OverdraftAmount extends Amount {
    // check in production
    dueDate?: Date
}

export interface SubAccount {
    // check in production
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

export interface DigestAccountsListing extends Pagination {
    accounts?: [DigestAccount]
}

export interface DigestAccount {
    number?: string
    bankCode?: string,
    countryCode?: string,
    // cz-iban?: string,
    // cz-bic?: string
}

export interface Pagination {
    pageNumber?: number,
    pageCount?: number,
    pageSize?: number,
    nextPage?: number,
}

export interface Signed {
    signInfo?: SignInfo
}

export interface ChangeAccountSettingsRequest {
    id?: string,
    alias?: string
}