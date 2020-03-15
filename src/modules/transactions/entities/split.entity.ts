import { EntityBoilerplate } from 'shared/boilerplates/Entity.boilerplate';
import { ISplit } from '../interfaces/Split.interace';
import { TransactionTypeENUM } from 'shared/enums/TransactionTypeENUM';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';
import { Transaction } from './transaction.entity';

@Entity('splits')
export class Split extends EntityBoilerplate<ISplit, Split> implements ISplit {
    @PrimaryGeneratedColumn()
    id: number = undefined;

    @ManyToOne(() => Transaction)
    @JoinColumn({ name: 'transactionId', referencedColumnName: 'id' })
    @Column()
    transactionId: Transaction = undefined;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'account', referencedColumnName: 'name' })
    @Column()
    account: Account = undefined;

    @Column({ type: 'float', default: 0 })
    amount: number = undefined;

    @Column({
        type: 'enum',
        enum: TransactionTypeENUM,
        default: TransactionTypeENUM.CREDIT,
    })
    type: TransactionTypeENUM = undefined;

    @Column({ length: 500, nullable: true })
    memo: string = undefined;
}
