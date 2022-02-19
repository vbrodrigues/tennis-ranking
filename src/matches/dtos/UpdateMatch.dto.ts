import { IsArray } from "class-validator";
import { Result } from "../interfaces/match.interface";

export class UpdateMatchDTO {

    @IsArray()
    results: Result[];
}