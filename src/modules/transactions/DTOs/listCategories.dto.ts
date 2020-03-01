import { Expose } from 'class-transformer';
import { ICategory } from '../interfaces/Category.interface';
import { TransactionTypeENUM } from 'shared/enums/TransactionTypeENUM';

export class ListCategoriesDto implements ICategory {
  @Expose()
  name: string;

  @Expose()
  icon: string;

  @Expose()
  type: TransactionTypeENUM;

  @Expose()
  parent: string;

  @Expose()
  amount?: number;
}
