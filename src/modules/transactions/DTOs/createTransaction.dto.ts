import { IsDateString, IsNotEmpty, IsNumber, MinLength } from 'class-validator';
import { ITransaction } from '../interfaces/Transaction.interface';

export class CreateTransactionDto implements Partial<ITransaction> {

    @IsNotEmpty()
    readonly account: string;

    @IsNotEmpty()
    @IsNumber()
    readonly amount: number;

    @IsNotEmpty()
    category: string;

    @IsDateString()
    dateTime: string;

    @MinLength(0)
    description: string;
}
