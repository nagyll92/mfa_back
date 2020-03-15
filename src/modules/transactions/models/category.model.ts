import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { CatchDBExceptions } from 'shared/exceptions/database.exceptions';
import { Account } from '../entities/account.entity';
import { ICategory } from '../interfaces/Category.interface';
import { CategoryTypesENUM } from 'shared/enums/AccountTypesENUM';
import { Split } from '../entities/split.entity';

@Injectable()
export class CategoryModel {
    constructor(@InjectRepository(Account)
                private readonly categoryRepository: Repository<Account>,
                @InjectEntityManager()
                private readonly entityManager: EntityManager,
    ) {
    }

    @CatchDBExceptions
    public async create(category: ICategory) {

        const categoryDao: Account = this.mapCategoryToEntity(category);

        return await this.categoryRepository.insert(categoryDao);
    }

    @CatchDBExceptions
    public async update(categoryName: string, category: ICategory) {

        const categoryDao: Account = this.mapCategoryToEntity(category);

        return await this.categoryRepository.update({ name: categoryName }, categoryDao);
    }

    @CatchDBExceptions
    public async findOne(categoryName: string): Promise<ICategory> {

        const category: any = await this.categoryRepository.findOne({
            name: categoryName,
            type: In(['INCOME', 'EXPENSE']),
        });

        if (typeof category === 'undefined') {
            return null;
        }

        return category;
    }

    @CatchDBExceptions
    public async findAll(type?: CategoryTypesENUM): Promise<any[]> {
        const typeFilter = [];
        if (typeof type !== 'undefined') {
            typeFilter.push(type);
        } else {
            typeFilter.push(...['INCOME', 'EXPENSE']);
        }

        const query = this.categoryRepository
          .createQueryBuilder('c')
          .addSelect('c.*')
          .addSelect('c.type', 'type')

          .addSelect(`0+SUM(IF(s.type = 'DEBIT', s.amount, -s.amount)) + initialBalance`, 'balance')
          .leftJoin(Split, 's', 'c.name = s.account ')
          .groupBy('c.name')
          .where({ type: In(typeFilter) });

        const result = await query.getRawMany();
        return result.map(category => {
            if (category.balance === null) {
                category.balance = category.initialBalance;
            }
            return category;
        });
    }

    @CatchDBExceptions
    public async delete(categoryName: string) {
        await this.categoryRepository.delete(categoryName);
    }

    private mapCategoryToEntity(category: ICategory): Account {
        const categoryDao: Account = new Account();
        categoryDao.name = category.name;
        categoryDao.icon = category.icon;
        categoryDao.parent = category.parent;
        categoryDao.type = category.type;
        return categoryDao;
    }

}
