import { Document } from "mongoose";
import Match from "src/matches/interfaces/match.interface";
import { Player } from "src/players/interfaces/player.interface";
import { ChallengeStatus } from "./challenge_status.enum";

export interface Challenge extends Document {
    challenge_date: Date;
    status: ChallengeStatus;
    invite_date: Date;
    reply_date: Date;
    challenger: Player;
    category: string;
    players: Player[];
    match: Match;
}