import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreatePlayerDTO } from './dtos/CreatePlayer.dto';
import { UpdatePlayerDTO } from './dtos/UpdatePlayer.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
	private players: Player[] = [];

	private readonly logger = new Logger(PlayersService.name);

	async create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
		const { phoneNumber, email, name } = createPlayerDTO;

		const playerAlreadyExists = this.players.find(
			(player) => player.email === email,
		);

		console.log(playerAlreadyExists);

		if (playerAlreadyExists) {
			throw new Error('Player already exists.');
		}

		const player: Player = {
			_id: uuid(),
			phoneNumber,
			email,
			name,
			photoUrl: 'www.google.com.br/foto123.jpg',
			positionRanking: 1,
			ranking: 'A',
		};

		this.logger.log(`Creating player ${JSON.stringify(player)}`);

		this.players.push(player);

		return player;
	}

	private async findByEmail(email: string): Promise<Player> {
		return this.players.find((player) => player.email === email);
	}

	private async findAll(): Promise<Player[]> {
		return this.players;
	}

	async list(email: string): Promise<Player[] | Player> {
		if (email) {
			return this.findByEmail(email);
		}
		return this.findAll();
	}

	async findById(player_id: string): Promise<Player | undefined> {
		const player = this.players.find((player) => player._id === player_id);
		return player;
	}

	async update(
		email: string,
		updatePlayerDTO: UpdatePlayerDTO,
	): Promise<Player> {
		const player = this.players.find((player) => player.email === email);

		if (!player) {
			throw new Error('Player not found.');
		}

		const { name, phoneNumber } = updatePlayerDTO;

		player.name = name || player.name;
		player.phoneNumber = phoneNumber || player.phoneNumber;

		return player;
	}

	async remove(email: string): Promise<void> {
		const player = this.players.find((player) => player.email === email);

		if (!player) {
			throw new Error('Player not found.');
		}

		this.players = this.players.filter((player) => player.email !== email);
	}
}
