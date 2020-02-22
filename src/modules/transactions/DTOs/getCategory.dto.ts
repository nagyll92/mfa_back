import { ICategory } from '../interfaces/Category.interface';
import { TransactionTypeENUM } from 'shared/enums/TransactionTypeENUM';
import { Expose } from 'class-transformer';

export class GetCategoryDto implements ICategory {
  @Expose()
  icon: string;

  @Expose()
  name: string;

  @Expose()
  parent: any;

  @Expose()
  type: TransactionTypeENUM;
}
