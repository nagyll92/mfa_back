import { SplitTypeENUM } from 'shared/enums/SplitTypeENUM';
import { Expose } from 'class-transformer';

export class GetCategoryDto {
  @Expose()
  icon: string;

  @Expose()
  name: string;

  @Expose()
  parent: any;

  @Expose()
  type: SplitTypeENUM;
}
