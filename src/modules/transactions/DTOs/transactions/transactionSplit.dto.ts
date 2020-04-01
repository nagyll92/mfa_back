import { Expose } from 'class-transformer';
import { TransactionTypeENUM } from 'shared/enums/TransactionTypeENUM';

export class Split {

    @Expose()
    account: string;

    @Expose()
    type: TransactionTypeENUM;

    @Expose()
    amount: number;

    @Expose()
    memo: string;

    @Expose()
    accountType: string;
}
