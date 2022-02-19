import { Schema } from "mongoose";

export const MatchSchema = new Schema({
    def: { type: Schema.Types.ObjectId, ref: 'Player' },
    results: [
        {
            set: String
        }
    ],
    players: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Player'
        }
    ]
},
    { timestamps: true, collection: 'matches' }
);