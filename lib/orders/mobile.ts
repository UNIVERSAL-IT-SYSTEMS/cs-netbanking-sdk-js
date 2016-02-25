import {Amount, Signed} from '../accounts/accounts';
import {Person} from './orders';

export interface MobilePaymentsRequest {
    paymentType: string,
    phoneNumber: string,
    sender: Person,
    amount: Amount,
    invoiceNumber?: string,
    confirmationPhoneNumber: string   
}

export interface MobilePaymentsResponse extends MobilePaymentsRequest{
    signInfo: Signed            
}