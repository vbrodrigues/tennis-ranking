import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { AddMatchToChallengeDTO } from './dtos/AddMatchToChallenge.dto';
import { CreateChallengeDTO } from './dtos/CreateChallenge.dto';
import { UpdateChallengeDTO } from './dtos/UpdateChallenge.dto';
import { Challenge } from './interfaces/challenge.interface';

@Controller('challenges')
export class ChallengesController {
    constructor(private readonly challengesService: ChallengesService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createChallengeDTO: CreateChallengeDTO): Promise<Challenge> {
        return await this.challengesService.create(createChallengeDTO);
    }

    @Get()
    async list(@Query('player_id') player_id: string): Promise<Challenge[]> {
        if (player_id) {
            return await this.challengesService.findByPlayerId(player_id);
        }
        return await this.challengesService.list();
    }

    @Put('/:challenge_id')
    @UsePipes(ValidationPipe)
    async update(@Body() updateChallengeDTO: UpdateChallengeDTO, @Param('challenge_id') challenge_id: string): Promise<Challenge> {
        return await this.challengesService.update(challenge_id, updateChallengeDTO);
    }

    @Delete('/:challenge_id')
    async remove(@Param('challenge_id') challenge_id: string): Promise<void> {
        await this.challengesService.remove(challenge_id);
    }

    @Post('/:challenge_id/match')
    @UsePipes(ValidationPipe)
    async addMatchToChallenge(@Body() addMatchToChallengeDTO: AddMatchToChallengeDTO, @Param('challenge_id') challenge_id: string): Promise<void> {
        return await this.challengesService.addMatchToChallenge(challenge_id, addMatchToChallengeDTO.match_id);
    }
    
}
