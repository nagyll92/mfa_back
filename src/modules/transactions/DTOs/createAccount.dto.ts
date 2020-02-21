import { IAccount } from '../interfaces/Account.interface';
import { IsDateString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAccountDto implements IAccount {

    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @IsNotEmpty()
    initialBalance: number;

    @IsDateString()
    initialBalanceDate: string;

}
