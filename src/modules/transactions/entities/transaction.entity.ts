import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBoilerplate } from 'shared/boilerplates/Entity.boilerplate';
import { ITransaction } from '../interfaces/Transaction.interface';
import { Category } from './category.entity';
import { SystemTransactionCategoriesENUM } from 'shared/enums/SystemTransactionCategoriesENUM';

@Entity('transactions')
export class Transaction extends EntityBoilerplate<ITransaction, Transaction> implements ITransaction {
    @PrimaryGeneratedColumn()
    id: number = undefined;

    @Column({ type: 'datetime' })
    dateTime: string = undefined;

    @Column({nullable: true})
    account: string = undefined;

    @Column({ type: 'float' })
    amount: number = undefined;

    @Column({ length: 500 })
    description: string = undefined;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category', referencedColumnName: 'name' })
    @Column()
    category: Category | SystemTransactionCategoriesENUM = undefined;

    @Column({nullable: true})
    targetAccount: string = undefined;
}
