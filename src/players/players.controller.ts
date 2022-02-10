import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/CreatePlayer.dto';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
	constructor(private readonly playersService: PlayersService) { }

	@Post()
	async create(@Body() createPlayerDTO: CreatePlayerDTO) {
		return await this.playersService.create(createPlayerDTO);
	}
}
