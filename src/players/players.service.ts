import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { CreatePlayerDTO } from './dtos/CreatePlayer.dto';
import { UpdatePlayerDTO } from './dtos/UpdatePlayer.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
	private players: Player[] = [];

	constructor(
		@InjectModel('Player') private readonly playerModel: Model<Player>,
	) { }

	private readonly logger = new Logger(PlayersService.name);

	async create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
		const { email } = createPlayerDTO;

		const playerAlreadyExists = await this.playerModel
			.findOne({ email })
			.exec();

		if (playerAlreadyExists) {
			throw new Error('Player already exists.');
		}

		const player = new this.playerModel(createPlayerDTO);

		await player.save();

		return player;
	}

	private async findByEmail(email: string): Promise<Player> {
		return await this.playerModel.findOne({ email }).exec();
	}

	private async findAll(): Promise<Player[]> {
		return await this.playerModel.find().exec();
	}

	async list(email: string): Promise<Player[] | Player> {
		if (email) {
			return this.findByEmail(email);
		}
		return this.findAll();
	}

	async findById(player_id: string): Promise<Player | undefined> {
		const player = await this.playerModel.findOne({ _id: player_id }).exec();
		return player;
	}

	async update(
		email: string,
		updatePlayerDTO: UpdatePlayerDTO,
	): Promise<Player> {
		const player = this.playerModel.findOne({ email });

		if (!player) {
			throw new Error('Player not found.');
		}

		return await this.playerModel
			.findOneAndUpdate({ email }, { $set: updatePlayerDTO })
			.exec();
	}

	async remove(email: string): Promise<any> {
		const player = await this.playerModel.findOne({ email }).exec();

		if (!player) {
			throw new Error('Player not found.');
		}

		return await this.playerModel.remove({ email }).exec();
	}
}
