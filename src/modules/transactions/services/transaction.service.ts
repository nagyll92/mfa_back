import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entity';
import { EntityManager, FindManyOptions, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { ITransaction } from '../interfaces/Transaction.interface';
import { CatchDBExceptions } from 'shared/exceptions/database.exceptions';
import { CreateTransactionDto } from '../DTOs/createTransaction.dto';
import { GetTransactionQueryParamsInterface } from '../interfaces/getTransactionQueryParams.interface';
import { Category } from '../entities/category.entity';

@Injectable()
export class TransactionService {

  constructor(@InjectRepository(Transaction)
              private readonly transactionRepository: Repository<Transaction>,
              @InjectEntityManager()
              private readonly entityManager: EntityManager,
  ) {
  }

  public async deleteTransaction(transactionId: number) {
    return this.transactionRepository.delete(transactionId);
  }

  public async getTransaction(transactionId: number): Promise<ITransaction> {
    return await this.transactionRepository.createQueryBuilder('t')
      .select('t.*, c.type')
      .leftJoin(Category, 'c', 't.category = c.name')
      .where({ id: transactionId })
      .getRawOne();
  }

  public async getTransactionsForCategory(categoryName: string): Promise<any> {
    const query = this.transactionRepository.createQueryBuilder('t')
      .select('t.*, c.type, c.icon, c.name, c.parent')
      .leftJoin(Category, 'c', 't.category = c.name')
      .where('c.name = :name', { name: categoryName })
      .orWhere('c.parent = :name', { name: categoryName });
    return query.getRawMany();
  }

  public async updateTransaction(transactionId: number, transaction: CreateTransactionDto): Promise<any> {
    return await this.transactionRepository.update({ id: transactionId }, transaction);
  }

  @CatchDBExceptions
  public async findAll(queryParams: GetTransactionQueryParamsInterface): Promise<ITransaction[]> {
    const query = this.transactionRepository
      .createQueryBuilder('t')
      .select('t.*, c.type')
      .leftJoin(Category, 'c', 't.category = c.name')
      .addOrderBy('id', 'DESC');

    if (queryParams.account) {
      query.andWhere('account = :account', { account: queryParams.account });
    }

    if (queryParams.category) {
      query.andWhere('c.name = :category', { category: queryParams.category });
    }

    if (queryParams.fromDate) {
      query.andWhere('dateTime >= :fromDate', { fromDate: queryParams.fromDate });
    }

    if (queryParams.untilDate) {
      query.andWhere('dateTime <= :untilDate', { untilDate: queryParams.untilDate });
    }
    query.andWhere('c.type != :type', { type: 'SYSTEM' });

    return await query.getRawMany();
  }

  @CatchDBExceptions
  public async createTransaction(transactionDto: CreateTransactionDto) {
    let transactionDao: Transaction = new Transaction();
    transactionDao = transactionDao.mapObjects(transactionDto, transactionDao);
    return this.entityManager.save(transactionDao);
  }

}
