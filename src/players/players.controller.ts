import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import ParamValidationPipe from 'src/common/pipes/ParamValidation.pipe';
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

	@Patch(':player_id')
	async update(
		@Body() updatePlayerDTO: UpdatePlayerDTO,
		@Param('player_id', ParamValidationPipe) player_id: string,
	): Promise<Player> {
		return await this.playersService.update(player_id, updatePlayerDTO);
	}

	@Get()
	async findAll(): Promise<Player[]> {
		return await this.playersService.findAll();
	}

	@Get('/:player_id')
	async findById(@Param('player_id') player_id: string): Promise<Player> {
		return await this.playersService.findById(player_id);
	}

	@Delete('/:player_id')
	async remove(@Param('player_id') player_id: string,): Promise<void> {
		await this.playersService.remove(player_id);
	}
}
