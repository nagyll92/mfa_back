import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../DTOs/categories/createCategory.dto';
import { ICategory } from '../interfaces/Category.interface';
import { CategoryModel } from '../models/category.model';
import { CategoryTypesENUM } from 'shared/enums/AccountTypesENUM';

@Injectable()
export class CategoryService {

    constructor(private categoryModel: CategoryModel,
    ) {
    }

    public async findAll(type?: CategoryTypesENUM): Promise<ICategory[]> {
        return await this.categoryModel.findAll(type);
    }

    public async findOne(categoryName: string): Promise<ICategory> {
        return await this.categoryModel.findOne(categoryName);
    }

    public async createCategory(category: CreateCategoryDto) {
        return await this.categoryModel.create(category);
    }

    public async delete(categoryName: string) {
        return await this.categoryModel.delete(categoryName);
    }

    public async update(categoryName: string, category: ICategory) {
        return await this.categoryModel.update(categoryName, category);
    }

}
