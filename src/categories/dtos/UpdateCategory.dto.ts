import { IsNotEmpty, IsString, IsArray, ArrayMinSize } from "class-validator";
import { Event } from '../interfaces/category.interface';

export class UpdateCategoryDTO {

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    events: Event[];
}