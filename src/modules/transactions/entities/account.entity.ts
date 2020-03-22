import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { EntityBoilerplate } from 'shared/boilerplates/Entity.boilerplate';
import { IAccount } from '../interfaces/Account.interface';
import { AccountTypesENUM } from 'shared/enums/AccountTypesENUM';

@Entity('accounts')
export class Account extends EntityBoilerplate<IAccount, Account> implements IAccount {

  @PrimaryColumn()
  @Index('name', { unique: true })
  name: string = undefined;

  @Column({ length: 500, nullable: true })
  icon: string = undefined;

  @Column({ type: 'float', default: 0 })
  initialBalance: number = 0;

  @Column({ type: 'date', nullable: true })
  initialBalanceDate: string = undefined;

  @Column()
  type: AccountTypesENUM = undefined;

  @Column({ nullable: true })
  parent: string = undefined;
}
