import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateMatchDTO } from './dtos/CreateMatch.dto';
import { UpdateMatchDTO } from './dtos/UpdateMatch.dto';
import Match from './interfaces/match.interface';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {

    constructor(private readonly matchesService: MatchesService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createMatchDTO: CreateMatchDTO): Promise<Match> {
        return await this.matchesService.create(createMatchDTO);
    }

    @Get()
    async list(): Promise<Match[]> {
        return await this.matchesService.list();
    }

    @Get('/:match_id')
    async findById(@Param('match_id') match_id: string): Promise<Match> {
        return await this.matchesService.findById(match_id);
    }

    @Patch('/:match_id')
    @UsePipes(ValidationPipe)
    async update(@Body() updateMatchDTO: UpdateMatchDTO, @Param('match_id') match_id: string): Promise<Match> {
        return await this.matchesService.update(match_id, updateMatchDTO);
    }

    @Delete('/:match_id')
    async remove(@Param('match_id') match_id: string): Promise<void> {
        await this.matchesService.remove(match_id);
    }

}
