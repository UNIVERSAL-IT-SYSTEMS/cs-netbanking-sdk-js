import {Pagination} from './accounts';

export interface ServicesListing extends Pagination {
    services?: Service
}

export interface Service {
    id: string,
    nameI18N: string,
    iconGroup: string,
    dateFrom?: Date,
    dateTo?: Date   
}