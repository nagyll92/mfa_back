import { Expose, Type } from 'class-transformer';
import { Split } from './transactionSplit.dto';
import { TransactionTypesENUM } from 'shared/enums/TransactionTypesENUM';

export class ListTransactionsDto {

    @Expose()
    id: number;

    @Expose()
    dateTime: string;

    @Expose()
    description: string;

    @Expose()
    type: TransactionTypesENUM;

    @Expose()
    @Type(() => Split)
    splits: any[];
}
