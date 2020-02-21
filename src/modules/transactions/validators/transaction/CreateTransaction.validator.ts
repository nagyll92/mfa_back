import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../entities/transaction.entity';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';

@Injectable()
export class CreateTransactionValidator implements PipeTransform<Transaction> {
    constructor(@InjectRepository(Transaction)
                private readonly transactionRepository: Repository<Transaction>,
                @InjectRepository(Category)
                private readonly categoryRepository: Repository<Category>) {
    }

    // noinspection JSUnusedLocalSymbols
    async transform(value: any, { metatype }: ArgumentMetadata) {

        const accountExists = await this.accountExistst(value.account);
        if (!accountExists) {
            throw new BadRequestException('Account does not exists');
        }

        const categoryExists = await this.categoryExists(value.category);
        if (!categoryExists) {
            throw new BadRequestException('Category does not exists');
        }

        return value;
    }

    private async accountExistst(account: string): Promise<boolean> {

        const accounts = await this.transactionRepository.find({ account });
        return accounts.length !== 0;

    }

    private async categoryExists(category: string): Promise<boolean> {

        const categories = await this.categoryRepository.find({ name: category });
        return categories.length !== 0;

    }

}