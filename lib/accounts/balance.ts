import {Amount} from './accounts';

export interface BalanceListing {
    balance: Amount,
    disposable?: Amount,
    overdraft?: Amount   
}