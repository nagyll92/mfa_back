import { TransactionTypeENUM } from 'shared/enums/TransactionTypeENUM';
import { AccountTypesENUM, CategoryTypesENUM } from 'shared/enums/AccountTypesENUM';



export class ICategory {

  name: string;

  icon: string;

  type: CategoryTypesENUM;

  parent?: any;
}
