import { Expose } from 'class-transformer';
import { ICategory } from '../../interfaces/Category.interface';
import { SplitTypeENUM } from 'shared/enums/SplitTypeENUM';
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
  balance?: number;
}
