import { ITransaction } from '../interfaces/Transaction.interface';
import { Expose } from 'class-transformer';

export class ListTransactionsDto implements ITransaction {

  @Expose()
  id: number;

  @Expose()
  account: string;

  @Expose()
  amount: number;

  @Expose()
  category: string;

  @Expose()
  dateTime: string;

  @Expose()
  description: string;

  @Expose()
  targetAccount: string;
}
