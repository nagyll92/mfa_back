import { IsDateString, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class TransferBetweenAccountsDto {

    @IsString()
    @MinLength(0)
    description: string;

    @IsNotEmpty()
    amount: number;

    @IsDateString()
    dateTime: string;

    @IsNotEmpty()
    readonly from: string;

    @IsNotEmpty()
    readonly to: string;
}
