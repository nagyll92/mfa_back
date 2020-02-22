import { Column, Entity, Index, PrimaryColumn, Unique } from 'typeorm';
import { ICategory } from '../interfaces/Category.interface';
import { EntityBoilerplate } from 'shared/boilerplates/Entity.boilerplate';
import { TransactionTypeENUM } from 'shared/enums/TransactionTypeENUM';

@Entity('categories')
export class Category extends EntityBoilerplate<ICategory, Category> implements ICategory {

  @PrimaryColumn()
  @Index('name', { unique: true })
  name: string = undefined;

  @Column({ length: 500, nullable: true })
  icon: string = undefined;

  @Column({
    type: 'enum',
    enum: TransactionTypeENUM,
    default: TransactionTypeENUM.EXPENSE,
  })
  type: TransactionTypeENUM = undefined;

  @Column({ nullable: true })
  parent: string = undefined;
}
