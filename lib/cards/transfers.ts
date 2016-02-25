import {AccountNo, Amount, Signed} from '../accounts/accounts';

export interface PayUpCreditCardRequest {
    type: string,
    sender: Sender,
    amount: Amount    
}

export interface Sender {
    id?: string,
    accountno: AccountNo
}

export interface PayUpCreditCardResponse {
    signInfo: Signed   
}