import { IsNotEmpty } from "class-validator";

export class AddPlayerToCategoryDTO {

    @IsNotEmpty()
    player_id: string;

    @IsNotEmpty()
    category: string;
}