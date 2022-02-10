import { Injectable, Logger } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { CreatePlayerDTO } from './dtos/CreatePlayer.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
	private players: Player[] = [];

	private readonly logger = new Logger(PlayersService.name);

	async create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
		this.logger.log(`Creating player ${createPlayerDTO}`);

		const { phoneNumber, email, name } = createPlayerDTO;

		const player: Player = {
			_id: uuid(),
			phoneNumber,
			email,
			name,
			photoUrl: 'www.google.com.br/foto123.jpg',
			positionRanking: 1,
			ranking: 'A',
		};

		this.players.push(player);

		return player;
	}
}
