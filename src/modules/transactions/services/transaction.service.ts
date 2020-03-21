import { Injectable } from '@nestjs/common';
import { TransactionModel } from '../models/transaction.model';
import { ITransaction } from '../interfaces/Transaction.interface';
import { ISplit } from '../interfaces/Split.interace';
import { TransactionTypeENUM } from 'shared/enums/TransactionTypeENUM';
import { GetTransactionQueryParamsInterface } from '../interfaces/getTransactionQueryParams.interface';

@Injectable()
export class TransactionService {

    constructor(
      private transactionModel: TransactionModel,
    ) {
    }

    public async findAll(filters: GetTransactionQueryParamsInterface) {
        return await this.transactionModel.findAll(filters);
    }

    public async createIncome(transaction) {
        const { account, amount, category, dateTime, description } = transaction;
        const transactionRequest: ITransaction = {
            dateTime,
            description,
        };
        const accountSplit: ISplit = {
            amount,
            account,
            type: TransactionTypeENUM.DEBIT,
        };

        const incomeSplit: ISplit = {
            amount,
            account: category,
            type: TransactionTypeENUM.DEBIT,
        };

        return this.transactionModel.create(transactionRequest, [accountSplit, incomeSplit]);
    }

    public async createExpense(transaction) {
        const { account, amount, category, dateTime, description } = transaction;
        const transactionRequest: ITransaction = {
            dateTime,
            description,
        };
        const accountSplit: ISplit = {
            amount,
            account,
            type: TransactionTypeENUM.CREDIT,
        };

        const expenseSplit: ISplit = {
            amount,
            account: category,
            type: TransactionTypeENUM.DEBIT,
        };

        return this.transactionModel.create(transactionRequest, [accountSplit, expenseSplit]);
    }

    public async createTransfer(transaction) {
        const { from, amount, to, dateTime, description } = transaction;
        const transactionRequest: ITransaction = {
            dateTime,
            description,
        };
        const fromSplit: ISplit = {
            amount,
            account: from,
            type: TransactionTypeENUM.CREDIT,
        };

        const toSplit: ISplit = {
            amount,
            account: to,
            type: TransactionTypeENUM.DEBIT,
        };

        return this.transactionModel.create(transactionRequest, [fromSplit, toSplit]);
    }

    /*  public async deleteTransaction(transactionId: number) {
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
      }*/

}
