import { ITransaction } from '../../interfaces/Transaction.interface';
import { Expose } from 'class-transformer';
import { SplitTypeENUM } from 'shared/enums/SplitTypeENUM';

export class CategoryTransactionsDto implements ITransaction {

  @Expose()
  id: number;

  @Expose()
  account: string;

  @Expose()
  type: SplitTypeENUM;

  @Expose()
  amount: number;

  @Expose()
  category: string;

  @Expose()
  parent: string;

  @Expose()
  icon: string;

  @Expose()
  dateTime: string;

  @Expose()
  description: string;

  @Expose()
  reference: string;
}
