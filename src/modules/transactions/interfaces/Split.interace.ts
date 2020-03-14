import { TransactionTypeENUM } from 'shared/enums/TransactionTypeENUM';
import { Account } from '../entities/account.entity';

export class ISplit {
    id?: number;
    transactionId?: any;
    account: any;
    amount: number;
    type: TransactionTypeENUM;
}
