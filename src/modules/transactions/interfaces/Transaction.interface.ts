export class ITransaction {
  id?: number;
  dateTime: string;
  account: string;
  category: any;
  amount: number;
  description: string;
  targetAccount?: string;
}
