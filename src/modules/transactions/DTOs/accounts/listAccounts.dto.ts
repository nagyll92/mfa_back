import { Expose } from 'class-transformer';

export class ListAccountsDto {
    @Expose()
    name: string;

    @Expose()
    balance: number;
}
