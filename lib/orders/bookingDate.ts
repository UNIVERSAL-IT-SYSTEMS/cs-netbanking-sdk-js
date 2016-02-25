import {Person} from './orders';

export interface PaymentOrderBookingDateRequest {
    receiver?: Person,
    priority?: string
}

export interface PaymentOrderBookingDateResponse {
    bookingDate: Date
}