import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/CreatePlayer.dto';
import { UpdatePlayerDTO } from './dtos/UpdatePlayer.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
	constructor(private readonly playersService: PlayersService) { }

	@Post()
	@UsePipes(ValidationPipe)
	async create(@Body() createPlayerDTO: CreatePlayerDTO): Promise<Player> {
		return await this.playersService.create(createPlayerDTO);
	}

	@Patch(':email')
	async update(
		@Body() updatePlayerDTO: UpdatePlayerDTO,
		@Param('email') email: string,
	): Promise<Player> {
		return await this.playersService.update(email, updatePlayerDTO);
	}

	@Get()
	async find(@Query('email') email: string): Promise<Player[] | Player> {
		return await this.playersService.list(email);
	}

	@Get(':player_id')
	async findById(@Param('player_id') player_id: string): Promise<Player> {
		return await this.playersService.findById(player_id);
	}

	@Delete()
	async remove(@Query('email') email: string): Promise<void> {
		await this.playersService.remove(email);
	}
}
