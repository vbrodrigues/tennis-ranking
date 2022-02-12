import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { CreatePlayerDTO } from './dtos/CreatePlayer.dto';
import { UpdatePlayerDTO } from './dtos/UpdatePlayer.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayersService {

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
			throw new BadRequestException('Player already exists.');
		}

		const player = new this.playerModel(createPlayerDTO);

		await player.save();

		return player;
	}

	async findByEmail(email: string): Promise<Player> {
		return await this.playerModel.findOne({ email }).exec();
	}

	async findAll(): Promise<Player[]> {
		return await this.playerModel.find().exec();
	}

	async findById(player_id: string): Promise<Player | undefined> {
		const player = await this.playerModel.findById(player_id).exec();
		return player;
	}

	async update(
		player_id: string,
		updatePlayerDTO: UpdatePlayerDTO,
	): Promise<Player> {
		const player = this.playerModel.findById(player_id).exec();

		if (!player) {
			throw new BadRequestException('Player not found.');
		}

		return await this.playerModel
			.findOneAndUpdate({ player_id }, { $set: updatePlayerDTO })
			.exec();
	}

	async remove(player_id: string): Promise<any> {
		const player = await this.playerModel.findById(player_id).exec();

		if (!player) {
			throw new BadRequestException('Player not found.');
		}

		return await this.playerModel.deleteOne({ _id: player_id }).exec();
	}
}
