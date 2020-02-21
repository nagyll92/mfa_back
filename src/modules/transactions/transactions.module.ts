import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Category } from './entities/category.entity';
import { CategoryController } from './controllers/categoryController';
import { CategoryService } from './services/category.service';
import { AccountsController } from './controllers/accounts.controller';
import { AccountService } from './services/account.service';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, Category])],
    controllers: [TransactionController, CategoryController, AccountsController],
    providers: [TransactionService, CategoryService, AccountService]
})
export class TransactionsModule {
}
