import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../entities/transaction.entity';
import { In, Repository } from 'typeorm';
import { Account } from '../../entities/account.entity';

@Injectable()
export class AccountExistsValidator implements PipeTransform<any> {
    constructor(@InjectRepository(Account)
                private readonly accountsRepository: Repository<Account>) {
    }

    async transform(accountName: string, { metatype }: ArgumentMetadata) {
        console.log("validate", accountName);
        const accountExists = await this.accountExists(accountName);
        if (!accountExists) {
            throw new NotFoundException(`Account '${accountName}' does not exist`);
        }

        return accountName;
    }

    private async accountExists(accountName: string): Promise<boolean> {
        const accounts = await this.accountsRepository.find({ name: accountName, type: In(['CURRENT']) });
        return accounts.length !== 0;
    }
}
