import { Body, Controller, Delete, Get, NotFoundException, NotImplementedException, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { TransformProvidedInterceptor } from 'shared/interceptors/transformProvided.interceptor';
import { Provides } from 'shared/decorators/provides.decorator';

import { CategoryService } from '../services/category.service';
import { ICategory } from '../interfaces/Category.interface';
import { ListCategoriesDto } from '../DTOs/listCategories.dto';
import { CreateCategoryDto } from '../DTOs/createCategory.dto';
import { GetCategoryDto } from '../DTOs/getCategory.dto';
import { ITransaction } from '../interfaces/Transaction.interface';
import { CategoryTransactionsDto } from '../DTOs/categoryTransactions.dto';
import { CategoryTypesENUM } from 'shared/enums/AccountTypesENUM';

@Controller('categories')
@UseInterceptors(TransformProvidedInterceptor)
export class CategoryController {

    constructor(
      private categoriesService: CategoryService,
    ) {
    }

    @Get()
    @Provides(ListCategoriesDto)
    findAll(@Query('type') type: CategoryTypesENUM): Promise<ICategory[]> {
        return this.categoriesService.findAll(type);
    }

    @Get(':categoryName')
    @Provides(GetCategoryDto)
    async findOne(@Param('categoryName') categoryName: string): Promise<ICategory> {
        const category = await this.categoriesService.findOne(categoryName);
        if (category === null) {
            throw new NotFoundException();
        }
        return category;
    }

    @Post()
    createCategory(@Body() category: CreateCategoryDto) {
        return this.categoriesService.createCategory(category);
    }

    @Put(':categoryName')
    async updateCategory(@Param('categoryName') categoryName: string, @Body() category: CreateCategoryDto) {
        return await this.categoriesService.update(categoryName, category);
    }

    @Delete(':categoryName')
    async deleteCategory(@Param('categoryName') categoryName: string) {
        return await this.categoriesService.delete(categoryName);
    }
}
