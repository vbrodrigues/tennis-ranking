import { Schema } from "mongoose";

export const ChallengeSchema = new Schema({
    challenge_date: { type: Date },
    status: { type: String },
    invite_date: { type: Date },
    reply_date: { type: Date },
    challenger: { type: Schema.Types.ObjectId, ref: 'Player' },
    category: { type: String },
    players: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Player'
        }
    ],
    match: { type: Schema.Types.ObjectId, ref: 'Match' }
},
    { timestamps: true, collection: 'challenges' })