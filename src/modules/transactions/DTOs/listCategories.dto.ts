import { Expose } from 'class-transformer';
import { ICategory } from '../interfaces/Category.interface';
import { TransactionTypeENUM } from 'shared/enums/TransactionTypeENUM';
import { CategoryTypesENUM } from 'shared/enums/AccountTypesENUM';

export class ListCategoriesDto implements ICategory {
  @Expose()
  name: string;

  @Expose()
  icon: string;

  @Expose()
  type: CategoryTypesENUM;

  @Expose()
  parent: string;

  @Expose()
  amount?: number;
}
