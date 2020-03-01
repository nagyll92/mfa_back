import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Not, Repository } from 'typeorm';
import { CatchDBExceptions } from 'shared/exceptions/database.exceptions';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../DTOs/createCategory.dto';
import { ICategory } from '../interfaces/Category.interface';
import { TransactionTypeENUM } from 'shared/enums/TransactionTypeENUM';
import { SystemTransactionCategoriesENUM } from 'shared/enums/SystemTransactionCategoriesENUM';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class CategoryService implements OnApplicationBootstrap {

  constructor(@InjectRepository(Category)
              private readonly categoryRepository: Repository<Category>,
              @InjectEntityManager()
              private readonly entityManager: EntityManager,
  ) {
  }

  public async findAll(type?: TransactionTypeENUM): Promise<ICategory[]> {
    let filter;
    if (type) {
      filter = { type };
    } else {
      filter = { type: Not(TransactionTypeENUM.SYSTEM) };
    }

    const query = this.categoryRepository
      .createQueryBuilder('c')
      .addSelect('c.*')
      .addSelect('SUM(t.amount)', 'amount')
      .leftJoin(Transaction, 't', 'c.name = t.category')
      .andWhere('c.type != :system', { system: TransactionTypeENUM.SYSTEM })
      .groupBy('c.name');

    if (type) {
      query.andWhere('c.type = :filterType', { filterType: type });
    }
    return await query.getRawMany().then(categories => {
      categories.forEach(category => {
        if (category.amount === null) {
          category.amount = 0;
        }
        categories.filter(cat => cat.parent === category.name).forEach(subCat => {
          category.amount += (subCat.amount !== null ? subCat.amount : 0);
        });
      });
      return categories;
    });
  }

  public async findOne(categoryName: string): Promise<ICategory> {
    const category = await this.categoryRepository.findOne({
      name: categoryName,
    });
    if (typeof category === 'undefined') {
      return null;
    }
    return category;
  }

  public async update(categoryName: string, category: ICategory) {
    return await this.categoryRepository.update({ name: categoryName }, category);
  }

  public async delete(categoryName: string) {
    await this.categoryRepository.delete(categoryName);
    await this.categoryRepository.update({ parent: categoryName }, { parent: null });

  }

  @CatchDBExceptions
  public async createCategory(categoryDto: CreateCategoryDto) {
    let categoriesDao: Category = new Category();
    categoriesDao = categoriesDao.mapObjects(categoryDto, categoriesDao);
    return await this.categoryRepository.insert(categoriesDao);
  }

  async onApplicationBootstrap(): Promise<any> {
    await this.initializeSystemCategories();

  }

  private async initializeSystemCategories(): Promise<void> {

    const initialBalanceCategory: Category = new Category();
    initialBalanceCategory.name = SystemTransactionCategoriesENUM.INITIAL_BALANCE;
    initialBalanceCategory.type = TransactionTypeENUM.SYSTEM;

    const incomeTransferCategory: Category = new Category();
    incomeTransferCategory.name = SystemTransactionCategoriesENUM.INCOME_TRANSFER;
    incomeTransferCategory.type = TransactionTypeENUM.SYSTEM;

    const expenseTransferCategory: Category = new Category();
    expenseTransferCategory.name = SystemTransactionCategoriesENUM.EXPENSE_TRANSFER;
    expenseTransferCategory.type = TransactionTypeENUM.SYSTEM;

    await this.categoryRepository.save([initialBalanceCategory, incomeTransferCategory, expenseTransferCategory]);
  }
}
