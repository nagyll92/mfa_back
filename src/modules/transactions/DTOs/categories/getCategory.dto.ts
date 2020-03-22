import { TransactionTypeENUM } from 'shared/enums/TransactionTypeENUM';
import { Expose } from 'class-transformer';

export class GetCategoryDto {
  @Expose()
  icon: string;

  @Expose()
  name: string;

  @Expose()
  parent: any;

  @Expose()
  type: TransactionTypeENUM;
}
