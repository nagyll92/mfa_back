import { Expose, Type } from 'class-transformer';
import { Split } from './transactionSplit.dto';

export class ListTransactionsDto {

    @Expose()
    id: number;

    @Expose()
    dateTime: string;

    @Expose()
    description: string;

    @Expose()
    @Type(() => Split)
    splits: any[];
}
