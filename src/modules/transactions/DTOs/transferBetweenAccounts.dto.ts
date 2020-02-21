import { IsDateString, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class TransferBetweenAccountsDto {

    @IsString()
    @MinLength(0)
    description: string;

    @IsNotEmpty()
    toAccount: string;

    @IsNotEmpty()
    amount: number;

    @IsDateString()
    dateTime: string;
}
