import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { AddPlayerToCategoryDTO } from './dtos/AddPlayerToCategory.dto';
import { CreateCategoryDTO } from './dtos/CreateCategory.dto';
import { UpdateCategoryDTO } from './dtos/UpdateCategory.dto';
import Category from './interfaces/category.interface';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<Category>,
        private readonly playersService: PlayersService,
    ) { }

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
        return await this.categoryModel.find().populate('players').exec();
    }

    async findById(category_id: string): Promise<Category> {
        const category = await this.categoryModel.findById(category_id).exec();

        if (!category) {
            throw new NotFoundException('Category not found.');
        }

        return category;
    }
    
    async findByPlayerId(player_id: any): Promise<Category[]> {
        const player = await this.playersService.findById(player_id);

        if (!player) {
            throw new BadRequestException('Player not found.');
        }

        return await this.categoryModel
        .find()
        .where('players')
        .in(player_id)
        .populate('players')
        .exec();
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

    async addPlayerToCategory(addPlayerToCategoryDTO: AddPlayerToCategoryDTO): Promise<void> {
        const { player_id, category } = addPlayerToCategoryDTO;

        const categoryExists = await this.categoryModel.findOne({ category });

        if (!categoryExists) {
            throw new NotFoundException('Category not found.');
        }

        const playerAlreadyOnCategory = await this.categoryModel.find({ category }).where('players').equals(player_id).exec();

        if (playerAlreadyOnCategory.length > 0) {
            throw new BadRequestException('Player already added on category.');
        }

        const player = await this.playersService.findById(player_id);

        if (!player) {
            throw new NotFoundException('Player not found.');
        }

        categoryExists.players.push(player);

        await this.categoryModel.findOneAndUpdate({ category }, { $set: categoryExists }).exec();
    }
}
