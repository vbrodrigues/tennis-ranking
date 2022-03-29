import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsOptional } from "class-validator";
import { Player } from "src/players/interfaces/player.interface";

export class CreateChallengeDTO {
    @IsNotEmpty()
    @IsDateString()
    challenge_date: Date;

    @IsOptional()
    status: string = 'pending'

    @IsNotEmpty()
    challenger: Player;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    players: Player[];
}