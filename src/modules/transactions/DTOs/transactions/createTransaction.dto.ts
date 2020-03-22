import { IsISO8601, IsNotEmpty, IsNumber, MinLength } from 'class-validator';
import { ITransaction } from '../../interfaces/Transaction.interface';

export class CreateTransactionDto implements Partial<ITransaction> {

    @IsNotEmpty()
    readonly account: string;

    @IsNotEmpty()
    @IsNumber()
    readonly amount: number;

    @IsNotEmpty()
    readonly category: string;

    @IsISO8601()
    readonly dateTime: string;

    @MinLength(0)
    readonly description: string;
}
