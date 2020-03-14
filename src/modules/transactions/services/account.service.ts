import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from '../DTOs/createAccount.dto';
import { IAccount } from '../interfaces/Account.interface';
import { AccountModel } from '../models/account.model';

@Injectable()
export class AccountService {
    constructor(private accountModel: AccountModel,
    ) {
    }

    public async createAccount(accountDto: CreateAccountDto) {

        return await this.accountModel.create(accountDto);
    }

    public async findAll(): Promise<IAccount[]> {

        return await this.accountModel.findAll();
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

}
