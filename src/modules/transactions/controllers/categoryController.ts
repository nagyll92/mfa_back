import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransformProvidedInterceptor } from 'shared/interceptors/transformProvided.interceptor';
import { Provides } from 'shared/decorators/provides.decorator';

import { CategoryService } from '../services/category.service';
import { ICategory } from '../interfaces/Category.interface';
import { ListCategoriesDto } from '../DTOs/listCategories.dto';
import { CreateCategoryDto } from '../DTOs/createCategory.dto';
import { AppLogger } from 'utils/logger/logger';

@Controller('categories')
@UseInterceptors(TransformProvidedInterceptor)
export class CategoryController {

    constructor(
        private categoriesService: CategoryService,
    ) {
    }

    @Get()
    @Provides(ListCategoriesDto)
    findAll(): Promise<ICategory[]> {
        AppLogger.log('Listing all available categories');
        return this.categoriesService.findAll();
    }

    @Post()
    createAccount(@Body() category: CreateCategoryDto) {
        return this.categoriesService.createCategory(category);
    }
}
