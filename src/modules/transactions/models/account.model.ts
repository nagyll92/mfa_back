import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { CatchDBExceptions } from 'shared/exceptions/database.exceptions';
import { IAccount } from '../interfaces/Account.interface';
import { Account } from '../entities/account.entity';
import { AccountTypesENUM } from 'shared/enums/AccountTypesENUM';
import { Split } from '../entities/split.entity';

@Injectable()
export class AccountModel {
    constructor(@InjectRepository(Account)
                private readonly accountRepository: Repository<Account>,
                @InjectEntityManager()
                private readonly entityManager: EntityManager,
    ) {
    }

    @CatchDBExceptions
    public async create(account: IAccount) {

        const accountDao: Account = this.mapAccountToEntity(account);

        return await this.accountRepository.insert(accountDao);
    }

    @CatchDBExceptions
    public async update(accountName: string, account: IAccount) {

        const accountDao: Account = this.mapAccountToEntity(account);

        return await this.accountRepository.update({ name: accountName }, accountDao);
    }

    @CatchDBExceptions
    public async findOne(accountName: string): Promise<IAccount> {

        const account = await this.accountRepository.findOne({
            name: accountName,
            type: In(['CURRENT']),
        });

        if (typeof account === 'undefined') {
            return null;
        }

        return account;
    }

    @CatchDBExceptions
    public async findAll(): Promise<any[]> {

        const query = this.accountRepository
          .createQueryBuilder('a')
          .addSelect('a.*')
          .addSelect(`SUM(IF(s.type = 'DEBIT', s.amount, -s.amount)) + initialBalance`, 'balance')
          .leftJoin(Split, 's', 'a.name = s.account')
          .groupBy('a.name')
          .where({ type: In(['CURRENT']) });

        const results = await query.getRawMany();

        return results.map(account => {
            if (account.balance === null) {
                account.balance = account.initialBalance;
            }
            return account;
        });
    }

    @CatchDBExceptions
    public async delete(accountName: string) {
        await this.accountRepository.delete(accountName);
    }

    private mapAccountToEntity(account: IAccount): Account {
        const accountDao: Account = new Account();
        accountDao.name = account.name;
        accountDao.icon = account.icon;
        accountDao.initialBalance = account.initialBalance;
        accountDao.initialBalanceDate = account.initialBalanceDate;
        accountDao.type = AccountTypesENUM.CURRENT;
        return accountDao;
    }

}
