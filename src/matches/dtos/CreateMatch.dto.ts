import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Player } from "src/players/interfaces/player.interface";
import { Result } from "../interfaces/match.interface";

export class CreateMatchDTO {

    @IsString()
    @IsNotEmpty()
    def: string;

    @IsArray()
    results: Result[];

    @IsArray()
    @IsNotEmpty()
    players: string[];
}