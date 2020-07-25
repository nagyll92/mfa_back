import { Injectable } from '@nestjs/common';
import { TransactionModel } from '../models/transaction.model';
import { ITransaction } from '../interfaces/Transaction.interface';
import { ISplit } from '../interfaces/Split.interace';
import { SplitTypeENUM } from 'shared/enums/SplitTypeENUM';
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
            type: SplitTypeENUM.DEBIT,
        };

        const incomeSplit: ISplit = {
            amount,
            account: category,
            type: SplitTypeENUM.DEBIT,
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
            type: SplitTypeENUM.CREDIT,
        };

        const expenseSplit: ISplit = {
            amount,
            account: category,
            type: SplitTypeENUM.DEBIT,
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
            type: SplitTypeENUM.CREDIT,
        };

        const toSplit: ISplit = {
            amount,
            account: to,
            type: SplitTypeENUM.DEBIT,
        };

        return this.transactionModel.create(transactionRequest, [fromSplit, toSplit]);
    }

}
