import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dtos/CreateCategory.dto';
import { UpdateCategoryDTO } from './dtos/UpdateCategory.dto';
import Category from './interfaces/category.interface';

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
    async update(@Body() updateCategoryDTO: UpdateCategoryDTO, @Param('category_id') category_id: string): Promise<Category> {
        return await this.categoriesService.update(category_id, updateCategoryDTO);
    }

    @Delete('/:category_id')
    async remove(@Param('category_id') category_id: string): Promise<void> {
        await this.categoriesService.remove(category_id)
    }

}
