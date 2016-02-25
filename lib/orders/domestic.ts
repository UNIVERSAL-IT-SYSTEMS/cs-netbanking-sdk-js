import {Amount, Signed} from '../accounts/accounts';
import {Person, Info, Symbols, Order} from './orders';

export interface DomesticOrderRequest {
    id?: string,
    senderName: string,
    sender: Person,
    receiverName: string,
    receiver: Person,
    amount: Amount,
    transferDate?: Date,
    additionalInfo?: Info,
    senderReference?: string,
    symbols?: Symbols,
    flags?: [string] 
}

export interface DomesticOrderResponse extends Order {}