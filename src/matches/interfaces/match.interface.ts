import { Document } from "mongoose";
import { Player } from "src/players/interfaces/player.interface";

export default interface Match extends Document {
    def: string;
    results: Result[];
    players: Player[];
}

export interface Result {
    set: string;
}