import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ICategory } from '../interfaces/Category.interface';
import { TransactionTypeENUM } from '../../../shared/enums/TransactionTypeENUM';

export class CreateCategoryDto implements ICategory {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsString()
    @IsOptional()
    readonly icon: string;

    @IsEnum(TransactionTypeENUM)
    readonly type: TransactionTypeENUM;

    @IsString()
    @IsOptional()
    readonly parent: string;
}
