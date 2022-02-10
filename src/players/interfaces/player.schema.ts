import { Schema } from 'mongoose';

export const PlayerSchema = new Schema(
	{
		phoneNumber: { type: String, unique: true },
		email: { type: String, unique: true },
		name: String,
		ranking: String,
		positionRanking: Number,
		photoUrl: String,
	},
	{ timestamps: true, collection: 'players' },
);
