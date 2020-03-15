import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBoilerplate } from 'shared/boilerplates/Entity.boilerplate';
import { ITransaction } from '../interfaces/Transaction.interface';

@Entity('transactions')
export class Transaction extends EntityBoilerplate<ITransaction, Transaction> implements ITransaction {
    @PrimaryGeneratedColumn()
    id: number = undefined;

    @Column({ type: 'datetime' })
    dateTime: string = undefined;

    @Column({ length: 500 })
    description: string = undefined;
}
