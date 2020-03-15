import { IsDateString, IsNotEmpty, IsNumber, MinLength } from 'class-validator';
import { ITransaction } from '../interfaces/Transaction.interface';


export class CreateTransactionDto implements Partial<ITransaction> {

    @IsNotEmpty()
    readonly account: string;

    @IsNotEmpty()
    @IsNumber()
    readonly amount: number;

    @IsNotEmpty()
    readonly category: string;

    @IsDateString()
    readonly dateTime: string;

    @MinLength(0)
    readonly description: string;
}
