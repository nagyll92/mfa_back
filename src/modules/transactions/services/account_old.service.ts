/*
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateAccountDto } from '../DTOs/createAccount.dto';
import { CatchDBExceptions } from 'shared/exceptions/database.exceptions';
import { SystemTransactionCategoriesENUM } from 'shared/enums/SystemTransactionCategoriesENUM';
import { Category } from '../entities/category.entity';
import { IAccount } from '../interfaces/Account.interface';
import * as uuid_v4 from 'uuid/v4';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(Transaction)
              private readonly transactionRepository: Repository<Transaction>,
              @InjectEntityManager()
              private readonly entityManager: EntityManager,
  ) {
  }

  public async transferAmount(from: string, to: string, amount: number, description: string, dateTime: string) {

    const transferMapper = { amount, dateTime, description };
    const reference: string = uuid_v4();
    let expenseTransaction: Transaction = new Transaction();
    expenseTransaction = expenseTransaction.mapObjects({
      account: from,
      category: SystemTransactionCategoriesENUM.EXPENSE_TRANSFER,
      reference,
      ...transferMapper,

    }, expenseTransaction);

    let incomeTransaction: Transaction = new Transaction();
    incomeTransaction = incomeTransaction.mapObjects({
      account: to,
      category: SystemTransactionCategoriesENUM.INCOME_TRANSFER,
      reference,
      ...transferMapper,
    }, incomeTransaction);

    await this.entityManager.save([incomeTransaction, expenseTransaction]);
  }

  public async delete(accountName: string) {
    return await this.transactionRepository.update({ account: accountName }, { account: null });
  }

  public async update(accountName: string, account: IAccount) {
    const updateAccountDao: Partial<Transaction> = {
      account: account.name,
      amount: account.initialBalance,
      dateTime: account.initialBalanceDate,
    };

    await this.transactionRepository.update({
      account: accountName,
      category: SystemTransactionCategoriesENUM.INITIAL_BALANCE,
    }, updateAccountDao);

    return await this.transactionRepository.update({ account: accountName }, { account: account.name });
  }

  public async findOne(accountName: string): Promise<IAccount> {
    const initialAccountTransaction = await this.transactionRepository.findOne({
      account: accountName,
      category: SystemTransactionCategoriesENUM.INITIAL_BALANCE,
    });

    if (typeof initialAccountTransaction === 'undefined') {
      return null;
    }
    return {
      name: initialAccountTransaction.account,
      initialBalance: initialAccountTransaction.amount,
      initialBalanceDate: initialAccountTransaction.dateTime,
    };
  }

  public async findAll(): Promise<any> {
    return this.transactionRepository
      .createQueryBuilder('t')
      .select('t.account', 'name')
      .addSelect(`SUM(IF (c.type = 'INCOME' OR (c.type = 'SYSTEM'
            AND c.name IN ('InitialBalance', 'IncomeTransfer')), t.amount, -t.amount))`, 'balance')
      .leftJoin(Category, 'c', 't.category = c.name')
      .groupBy('t.account')
      .getRawMany().then(results => {
        return results.filter(account => account.name !== null).map(account => {
          account.balance = parseFloat(account.balance.toFixed(2));
          return account;
        });
      });
  }

  @CatchDBExceptions
  public async createAccount(accountDto: CreateAccountDto) {
    let createAccountTransaction: Transaction = new Transaction();
    const accountEntityMapper = {
      account: accountDto.name,
      amount: accountDto.initialBalance,
      category: SystemTransactionCategoriesENUM.INITIAL_BALANCE,
      dateTime: accountDto.initialBalanceDate,
      description: '',
    };
    createAccountTransaction = createAccountTransaction.mapObjects(accountEntityMapper, createAccountTransaction);

    const existingAccount = await this.findOne(accountDto.name);

    if (existingAccount !== null) {
      return null;
    }

    return this.entityManager.save(createAccountTransaction);
  }
}
*/
