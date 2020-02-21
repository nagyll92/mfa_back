import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    UseInterceptors
} from '@nestjs/common';
import { TransformProvidedInterceptor } from 'shared/interceptors/transformProvided.interceptor';
import { AccountService } from '../services/account.service';
import { CreateAccountDto } from '../DTOs/createAccount.dto';
import { ListAccountsDto } from '../DTOs/listAccounts.dto';
import { Provides } from 'shared/decorators/provides.decorator';
import { IAccount } from '../interfaces/Account.interface';
import { GetAccountDto } from '../DTOs/getAccount.dto';
import { UpdateAccountDto } from '../DTOs/updateAccount.dto';
import { TransferBetweenAccountsDto } from '../DTOs/transferBetweenAccounts.dto';
import { AccountExistsValidator } from '../validators/account/AccountExists.validator';

@Controller('accounts')
@UseInterceptors(TransformProvidedInterceptor)
export class AccountsController {
    constructor(
        private accountService: AccountService
    ) {
    }

    @Get()
    @Provides(ListAccountsDto)
    findAll(): Promise<ListAccountsDto[]> {
        console.log('listing accounts');
        return this.accountService.findAll();
    }

    @Get(':accountName')
    @Provides(GetAccountDto)
    async findOne(@Param('accountName') accountName: string): Promise<IAccount> {
        const account = await this.accountService.findOne(accountName);
        if (!account) {
            throw new NotFoundException();
        }
        return account;
    }

    @Put(':accountName')
    async updateAccount(@Param('accountName', AccountExistsValidator) accountName: string, @Body() account: UpdateAccountDto) {
        await this.accountService.update(accountName, account);
    }

    @Delete(':accountName')
    async deleteAccount(@Param('accountName', AccountExistsValidator) accountName: string) {
        await this.accountService.delete(accountName);
    }

    @Put(':accountName/transfer')
    transferBetweenAccounts(@Param('accountName', AccountExistsValidator) accountName: string, @Body() transfer: TransferBetweenAccountsDto) {
        return this.accountService.transferAmount(accountName, transfer.toAccount, transfer.amount, transfer.description, transfer.dateTime);
    }

    @Post()
    async createAccount(@Body() accountDto: CreateAccountDto) {
        const account = await this.accountService.createAccount(accountDto);
        if (account === null) {
            throw new BadRequestException('Account exists');
        }
        return account;
    }
}