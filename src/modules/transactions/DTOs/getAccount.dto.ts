import { IAccount } from '../interfaces/Account.interface';
import { Expose } from 'class-transformer';

export class GetAccountDto implements IAccount {
    @Expose()
    readonly initialBalance: number;

    @Expose()
    readonly initialBalanceDate: string;

    @Expose()
    readonly name: string;

}
