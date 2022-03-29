import { IsNotEmpty } from "class-validator";

export class AddMatchToChallengeDTO {
    @IsNotEmpty()
    match_id: string;
}