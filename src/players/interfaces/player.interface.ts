import { Document } from 'mongoose';

export interface Player extends Document {
	readonly _id: string;
	readonly email: string;
	phoneNumber: string;
	name: string;
	ranking: string;
	positionRanking: number;
	photoUrl: string;
}
