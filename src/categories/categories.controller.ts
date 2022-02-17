import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AddPlayerToCategoryDTO } from './dtos/AddPlayerToCategory.dto';
import { CreateCategoryDTO } from './dtos/CreateCategory.dto';
import { UpdateCategoryDTO } from './dtos/UpdateCategory.dto';
import Category from './interfaces/category.interface';
import BaseResponse from 'src/core/interfaces/baseResponse.schema';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createCategoryDTO: CreateCategoryDTO): Promise<Category> {
        return await this.categoriesService.create(createCategoryDTO);
    }

    @Get()
    async list(): Promise<Category[]> {
        return await this.categoriesService.list();
    }

    @Get('/:category_id')
    async findById(@Param('category_id') category_id: string): Promise<Category> {
        return await this.categoriesService.findById(category_id);
    }

    @Patch('/:category_id')
    @UsePipes(ValidationPipe)
    async update(@Body() updateCategoryDTO: UpdateCategoryDTO, @Param('category_id') category_id: string): Promise<Category> {
        return await this.categoriesService.update(category_id, updateCategoryDTO);
    }

    @Delete('/:category_id')
    async remove(@Param('category_id') category_id: string): Promise<void> {
        await this.categoriesService.remove(category_id)
    }

    @Post('/add-player')
    @UsePipes(ValidationPipe)
    async addPlayerToCategory(@Body() addPlayerToCategoryDTO: AddPlayerToCategoryDTO): Promise<BaseResponse> {
        await this.categoriesService.addPlayerToCategory(addPlayerToCategoryDTO);
        return {
            success: true,
            status: 'ok'
        }
    }

}
