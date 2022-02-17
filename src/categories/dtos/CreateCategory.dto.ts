import { IsNotEmpty, IsString, IsArray, ArrayMinSize } from "class-validator";
import { Event } from '../interfaces/category.interface';

export class CreateCategoryDTO {

    @IsString()
    @IsNotEmpty()
    readonly category: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    events: Event[];
}