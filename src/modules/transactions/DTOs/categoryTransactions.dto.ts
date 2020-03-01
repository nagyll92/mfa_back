import { ITransaction } from '../interfaces/Transaction.interface';
import { Expose } from 'class-transformer';
import { TransactionTypeENUM } from 'shared/enums/TransactionTypeENUM';

export class CategoryTransactionsDto implements ITransaction {

  @Expose()
  id: number;

  @Expose()
  account: string;

  @Expose()
  type: TransactionTypeENUM;

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
