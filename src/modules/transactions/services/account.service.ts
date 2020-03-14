import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from '../DTOs/createAccount.dto';
import { IAccount } from '../interfaces/Account.interface';
import { AccountModel } from '../models/account.model';
import { ITransaction } from '../interfaces/Transaction.interface';
import { ISplit } from '../interfaces/Split.interace';
import { TransactionTypeENUM } from 'shared/enums/TransactionTypeENUM';
import { TransactionModel } from '../models/transaction.model';
import { ListAccountsDto } from '../DTOs/listAccounts.dto';

@Injectable()
export class AccountService {
    constructor(
      private accountModel: AccountModel,
      private transactionModel: TransactionModel,
    ) {
    }

    public async createAccount(accountDto: CreateAccountDto) {

        return await this.accountModel.create(accountDto);
    }

    public async findAll(): Promise<ListAccountsDto[]> {
        const accounts = await this.accountModel.findAll();
        return accounts.map(account => {
            return {
                name: account.name,
                balance: account.balance,
            };
        });
    }

    public async findOne(accountName: string): Promise<IAccount> {

        return await this.accountModel.findOne(accountName);
    }

    public async update(accountName: string, account: IAccount) {

        return await this.accountModel.update(accountName, account);
    }

    public async delete(accountName: string) {

        return await this.accountModel.delete(accountName);
    }

    public async transferAmount(from: string, to: string, amount: number, description: string, date: string) {
        const transaction: ITransaction = {
            dateTime: date,
            amount,
            description,
        };

        const fromSplit: ISplit = {
            account: from,
            amount,
            type: TransactionTypeENUM.CREDIT,
        };

        const toSplit: ISplit = {
            account: to,
            amount,
            type: TransactionTypeENUM.DEBIT,
        };
        return await this.transactionModel.create(transaction, [fromSplit, toSplit]);
    }
}
