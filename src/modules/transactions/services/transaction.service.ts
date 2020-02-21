import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entity';
import { EntityManager, FindManyOptions, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { ITransaction } from '../interfaces/Transaction.interface';
import { CatchDBExceptions } from 'shared/exceptions/database.exceptions';
import { CreateTransactionDto } from '../DTOs/createTransaction.dto';
import { GetTransactionQueryParamsInterface } from '../interfaces/getTransactionQueryParams.interface';

@Injectable()
export class TransactionService {

    constructor(@InjectRepository(Transaction)
                private readonly transactionRepository: Repository<Transaction>,
                @InjectEntityManager()
                private readonly entityManager: EntityManager
    ) {
    }

    @CatchDBExceptions
    public async findAll(queryParams: GetTransactionQueryParamsInterface): Promise<ITransaction[]> {
        const dbQuery: any = {};
        if (queryParams.account) {
            dbQuery.account = queryParams.account;
        }

        if (queryParams.category) {
            dbQuery.category = queryParams.category;
        }

        if (queryParams.fromDate) {
            dbQuery.dateTime = MoreThanOrEqual(queryParams.fromDate);
        }

        if (queryParams.untilDate) {
            dbQuery.dateTime = LessThanOrEqual(queryParams.untilDate);
        }

        return await this.transactionRepository.find(dbQuery);
    }

    @CatchDBExceptions
    public async createTransaction(transactionDto: CreateTransactionDto) {
        let transactionDao: Transaction = new Transaction();
        transactionDao = transactionDao.mapObjects(transactionDto, transactionDao);
        return this.entityManager.save(transactionDao);
    }

}
