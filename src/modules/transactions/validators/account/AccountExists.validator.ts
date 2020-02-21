import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountExistsValidator implements PipeTransform<any> {
    constructor(@InjectRepository(Transaction)
                private readonly transactionRepository: Repository<Transaction>) {
    }

    async transform(accountName: string, { metatype }: ArgumentMetadata) {

        const accountExists = await this.accountExists(accountName);
        if (!accountExists) {
            throw new NotFoundException(`Account '${accountName}' does not exist`);
        }

        return accountName;
    }

    private async accountExists(accountName: string): Promise<boolean> {
        const accounts = await this.transactionRepository.find({ account: accountName });
        return accounts.length !== 0;
    }
}
