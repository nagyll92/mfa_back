import { IAccount } from '../../interfaces/Account.interface';
import { IsISO8601, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateAccountDto implements IAccount {

    @IsNotEmpty()
    @MinLength(4)
    name: string;

    @IsNotEmpty()
    initialBalance: number;

    @IsISO8601()
    initialBalanceDate: string;

}
