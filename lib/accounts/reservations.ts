import {Pagination, Amount} from './accounts';

export interface ReservationsListing extends Pagination {
    reservations?: Reservation   
}

export interface Reservation {
    type: string,
    status: string,
    creationDate: Date,
    expirationDate?: Date,
    // cz-merchantAddress?: string,
    description: string,
    amount: Amount,
    amountSender?: Amount     
}