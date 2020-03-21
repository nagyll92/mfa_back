import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { CatchDBExceptions } from 'shared/exceptions/database.exceptions';
import { Transaction } from '../entities/transaction.entity';
import { Split } from '../entities/split.entity';
import { ITransaction } from '../interfaces/Transaction.interface';
import { ISplit } from '../interfaces/Split.interace';
import { GetTransactionQueryParamsInterface } from '../interfaces/getTransactionQueryParams.interface';

@Injectable()
export class TransactionModel {
    constructor(@InjectRepository(Transaction)
                private readonly transactionRepository: Repository<Transaction>,
                @InjectRepository(Split)
                private readonly splitRepository: Repository<Split>,
                @InjectEntityManager()
                private readonly entityManager: EntityManager,
    ) {
    }

    @CatchDBExceptions
    public async findAll(filters: GetTransactionQueryParamsInterface) {
        const transactionQuery = this.transactionRepository
          .createQueryBuilder('t')
          .addSelect('t.*')
          .addSelect('s.account')
          .leftJoin(Split, 's', 's.transactionId = t.id')
          .groupBy('t.id');

        if (filters.fromDate) {
            transactionQuery.andWhere('dateTime >= :fromDate', { fromDate: filters.fromDate });
        }

        if (filters.untilDate) {
            transactionQuery.andWhere('dateTime <= :untilDate', { untilDate: filters.untilDate });
        }

        if (filters.account && !filters.category) {
            transactionQuery.andWhere('s.account = :account', { account: filters.account });
        }

        if (filters.category && !filters.account) {
            transactionQuery.andWhere('s.account = :category', { category: filters.category });
        }

        if (filters.account && filters.category) {
            transactionQuery.andWhere('s.account IN (:list)', { list: [filters.account, filters.category] });
        }

        transactionQuery.orderBy('dateTime', 'ASC');

        const transactions = await transactionQuery.getRawMany();

        const transactionIds = transactions.map(tr => tr.id);
        const splits = await this.splitRepository.find({ transactionId: In(transactionIds) });

        return transactions.map(tr => {
            const transaction = { ...tr, splits: [] };
            // @ts-ignore
            transaction.splits = splits.filter(sp => sp.transactionId === tr.id);
            return transaction;
        }).filter(tr => {
            if (!filters.category || !filters.account) {
                return true;
            }
            return tr.splits.filter(sp => [filters.category, filters.account].indexOf(sp.account) >= 0).length >= 2;
        });
    }

    @CatchDBExceptions
    public async create(transaction: ITransaction, splits: ISplit[]) {
        const transactionEntity: Transaction = this.mapTransactionToEntity(transaction);

        const insertedTransaction = await this.transactionRepository.insert(transactionEntity);
        const transactionId = insertedTransaction.identifiers[0].id;

        const splitEntities = splits.map(split => {
            const splitEntity = this.mapSplitToEntity(split);
            splitEntity.transactionId = transactionId;
            return splitEntity;
        });

        await this.splitRepository.insert(splitEntities);
    }

    private mapTransactionToEntity(transaction: ITransaction): Transaction {
        let transactionEntity: Transaction = new Transaction();
        transactionEntity = transactionEntity.mapObjects(transaction, transactionEntity);

        return transactionEntity;
    }

    private mapSplitToEntity(split: ISplit): Split {
        let splitEntity: Split = new Split();
        splitEntity = splitEntity.mapObjects(split, splitEntity);

        return splitEntity;
    }

}
