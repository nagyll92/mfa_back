import { Body, Controller, Delete, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { TransformProvidedInterceptor } from 'shared/interceptors/transformProvided.interceptor';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto } from '../DTOs/transactions/createTransaction.dto';
import { TransferBetweenAccountsDto } from '../DTOs/transactions/transferBetweenAccounts.dto';
import { Provides } from 'shared/decorators/provides.decorator';
import { ListTransactionsDto } from '../DTOs/transactions/listTransactions.dto';

@Controller('transactions')
@UseInterceptors(TransformProvidedInterceptor)
export class TransactionController {
    constructor(
      private transactionService: TransactionService,
    ) {
    }

    @Get()
    @Provides(ListTransactionsDto)
    findAll(
      @Query('category') category: string,
      @Query('account') account: string,
      @Query('from') fromDate: string,
      @Query('until') untilDate: string,
    ): Promise<ListTransactionsDto[]> {
        return this.transactionService.findAll({category, account, fromDate, untilDate});
    }

    @Post('/income')
    public async createIncome(@Body() transaction: CreateTransactionDto) {
        return this.transactionService.createIncome(transaction);
    }

    @Delete('/income:id')
    public async deleteIncome(@Param('id') transactionId: number){
        console.log('transaction to be deleted', transactionId);
    }

    @Post('/expense')
    public async createExpense(@Body() transaction: CreateTransactionDto) {
        return this.transactionService.createExpense(transaction);
    }

    @Post('/transfer')
    public createTransfer(@Body() transaction: TransferBetweenAccountsDto) {
        return this.transactionService.createTransfer(transaction);
    }
}
