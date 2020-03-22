import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ICategory } from '../../interfaces/Category.interface';
import { CategoryTypesENUM } from 'shared/enums/AccountTypesENUM';

export class CreateCategoryDto implements ICategory {

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly icon: string;

  @IsEnum(['INCOME', 'EXPENSE'])
  readonly type: CategoryTypesENUM;

  @IsString()
  @IsOptional()
  readonly parent: string;
}
