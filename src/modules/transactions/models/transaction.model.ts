import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CatchDBExceptions } from 'shared/exceptions/database.exceptions';
import { Transaction } from '../entities/transaction.entity';
import { Split } from '../entities/split.entity';
import { ITransaction } from '../interfaces/Transaction.interface';
import { ISplit } from '../interfaces/Split.interace';

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

    /* @CatchDBExceptions
     public async findAll(): Promise<IAccount[]> {

         const query = this.accountRepository
           .createQueryBuilder('c')
           .addSelect('c.*')
           .where({type: In(['CURRENT'])});

         return await query.getMany();
     }*/

    /*private mapAccountToEntity(account: IAccount): Account {
        const accountDao: Account = new Account();
        accountDao.name = account.name;
        accountDao.icon = account.icon;
        accountDao.initialBalance = account.initialBalance;
        accountDao.initialBalanceDate = account.initialBalanceDate;
        accountDao.type = AccountTypesENUM.CURRENT;
        return accountDao;
    }*/

}
