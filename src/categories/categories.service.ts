import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDTO } from './dtos/CreateCategory.dto';
import { UpdateCategoryDTO } from './dtos/UpdateCategory.dto';
import Category from './interfaces/category.interface';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) { }

    async create(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
        const { category } = createCategoryDTO;

        const categoryAlreadyExists = await this.categoryModel.findOne({ category });

        if (categoryAlreadyExists) {
            throw new BadRequestException('Category already exists.');
        }

        const categoryObject = new this.categoryModel(createCategoryDTO);

        await categoryObject.save();

        return categoryObject;
    }

    async list(): Promise<Category[]> {
        return await this.categoryModel.find().exec();
    }

    async findById(category_id: string): Promise<Category> {
        const category = await this.categoryModel.findById(category_id).exec();

        if (!category) {
            throw new NotFoundException('Category not found.');
        }

        return category;
    }

    async update(category_id: string, updateCategoryDTO: UpdateCategoryDTO): Promise<Category> {
        const category = await this.categoryModel.findById(category_id).exec();

        if (!category) {
            throw new NotFoundException('Category not found.');
        }

        return await this.categoryModel.findOneAndUpdate({ category_id }, { $set: updateCategoryDTO }).exec();
    }

    async remove(category_id: string): Promise<any> {
        const category = await this.categoryModel.findById(category_id).exec();

        if (!category) {
            throw new NotFoundException('Category not found.');
        }

        return await this.categoryModel.deleteOne({ _id: category_id }).exec();
    }
}
