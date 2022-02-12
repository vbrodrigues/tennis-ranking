import { Schema } from 'mongoose';

export const PlayerSchema = new Schema(
	{
		email: { type: String, unique: true },
		phoneNumber: String,
		name: String,
		ranking: String,
		positionRanking: Number,
		photoUrl: String,
	},
	{ timestamps: true, collection: 'players' },
);
