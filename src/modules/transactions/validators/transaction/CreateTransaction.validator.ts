import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../entities/transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from '../../DTOs/transactions/createTransaction.dto';

@Injectable()
export class CreateTransactionValidator implements PipeTransform<Transaction> {
    constructor(@InjectRepository(Transaction)
                private readonly transactionRepository: Repository<Transaction>,
    ) {
    }

    // noinspection JSUnusedLocalSymbols
    async transform(value: any, { type, metatype }: ArgumentMetadata) {

        if (type === 'body') {
            const accountExists = await this.accountExists(value.account);
            if (!accountExists) {
                throw new BadRequestException('Account does not exists');
            }

            const categoryExists = await this.categoryExists(value.category);
            if (!categoryExists) {
                throw new BadRequestException('Category does not exists');
            }
        }

        return value;
    }

    private async accountExists(account: string): Promise<boolean> {
        /*const accounts = await this.transactionRepository.find({ account });
        return accounts.length !== 0;*/
        return true;
    }

    private async categoryExists(category: string): Promise<boolean> {
        return true;
        /*const categories = await this.categoryRepository.find({ name: category });
        return categories.length !== 0;*/

    }

}
