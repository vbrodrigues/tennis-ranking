import { IsOptional } from "class-validator";
import { ChallengeStatus } from "../interfaces/challenge_status.enum";

export class UpdateChallengeDTO {
    @IsOptional()
    challenge_date: Date;

    @IsOptional()
    status: ChallengeStatus;
}