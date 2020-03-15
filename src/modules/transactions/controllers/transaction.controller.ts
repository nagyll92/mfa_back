import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors, UsePipes } from '@nestjs/common';
import { TransformProvidedInterceptor } from 'shared/interceptors/transformProvided.interceptor';
import { TransactionService } from '../services/transaction.service';
import { Provides } from 'shared/decorators/provides.decorator';
import { ITransaction } from '../interfaces/Transaction.interface';
import { ListTransactionsDto } from '../DTOs/listTransactions.dto';
import { CreateTransactionDto } from '../DTOs/createTransaction.dto';
import { CreateTransactionValidator } from '../validators/transaction/CreateTransaction.validator';


@Controller('transactions')
@UseInterceptors(TransformProvidedInterceptor)
export class TransactionController {
    constructor(
      private transactionService: TransactionService,
    ) {
    }

    @Post()
    @UsePipes(CreateTransactionValidator)
    createTransaction(@Body() transaction: CreateTransactionDto) {
        return this.transactionService.createTransaction(transaction);
    }
}
/*

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
  ): Promise<ITransaction[]> {
    return this.transactionService.findAll({ category, account, fromDate, untilDate });
  }

  @Post()
  @UsePipes(CreateTransactionValidator)
  createTransaction(@Body() transaction: CreateTransactionDto) {
    return this.transactionService.createTransaction(transaction);
  }

  @Put(':id')
  @UsePipes(CreateTransactionValidator)
  async updateTransaction(@Param('id') transactionId: number, @Body() transaction: CreateTransactionDto) {
    return await this.transactionService.updateTransaction(transactionId, transaction);
  }

  @Get(':id')
  @Provides(ListTransactionsDto)
  async getTransaction(@Param('id') transactionId: number): Promise<ITransaction> {
    return await this.transactionService.getTransaction(transactionId);
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') transactionId: number) {
    await this.transactionService.deleteTransaction(transactionId);
  }
}
*/
