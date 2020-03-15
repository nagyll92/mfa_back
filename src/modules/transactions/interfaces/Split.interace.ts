import { TransactionTypeENUM } from 'shared/enums/TransactionTypeENUM';

export class ISplit {
    id?: number;
    transactionId?: any;
    account: any;
    amount: number;
    type: TransactionTypeENUM;
}
