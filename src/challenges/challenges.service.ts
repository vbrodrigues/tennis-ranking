import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { MatchesService } from 'src/matches/matches.service';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDTO } from './dtos/CreateChallenge.dto';
import { UpdateChallengeDTO } from './dtos/UpdateChallenge.dto';
import { Challenge } from './interfaces/challenge.interface';
import { ChallengeStatus } from './interfaces/challenge_status.enum';

@Injectable()
export class ChallengesService {
    constructor(
        @InjectModel('Challenge')
        private readonly challengeModel: Model<Challenge>,

        private readonly matchesService: MatchesService,

        private readonly playersService: PlayersService,

        private readonly categoriesService: CategoriesService
    ) {} 

    async create(createChallengeDTO: CreateChallengeDTO): Promise<Challenge> {
        const player1 = await this.playersService.findById(createChallengeDTO.players[0]._id);

        if (!player1) {
            throw new BadRequestException(`Player ${createChallengeDTO.players[0]._id} not found.`);
        }

        const player2 = await this.playersService.findById(createChallengeDTO.players[1]._id);

        if (!player2) {
            throw new BadRequestException(`Player ${createChallengeDTO.players[1]._id} not found.`);
        }

        const challengerIsMatchPlayer = createChallengeDTO.players.filter(player => player._id === createChallengeDTO.challenger._id);

        if (challengerIsMatchPlayer.length === 0) {
            throw new BadRequestException('Challenger must be a player of the match.');
        }

        const player1Category = await this.categoriesService.findByPlayerId(player1._id);

        if (!player1Category) {
            throw new BadRequestException('Players must be registered in a category');
        }
        
        const player2Category = await this.categoriesService.findByPlayerId(player2._id);

        if (!player2Category) {
            throw new BadRequestException('Players must be registered in a category');
        }

        const challenge = new this.challengeModel(createChallengeDTO);

        await challenge.save();

        return challenge;

    }

    async list(): Promise<Challenge[]> {
        return await this.challengeModel
        .find()
        .populate('challenger')
        .populate('players')
        .populate('match')
        .exec();
    }

    async findByPlayerId(player_id: any): Promise<Challenge[]> {
        const player = await this.playersService.findById(player_id);

        if (!player) {
            throw new BadRequestException('Player not found.');
        }

        return await this.challengeModel
        .find()
        .where('players')
        .in(player_id)
        .populate('challenger')
        .populate('players')
        .populate('match')
        .exec();
    }

    async update(challenge_id: string, updateChallengeDTO: UpdateChallengeDTO): Promise<Challenge> {
        const challenge = await this.challengeModel.findById(challenge_id).exec();

        if (!challenge) {
            throw new NotFoundException('Challenge not found.');
        }

        if (updateChallengeDTO.status) {
            challenge.reply_date = new Date();
        }

        challenge.status = updateChallengeDTO.status;
        challenge.challenge_date = updateChallengeDTO.challenge_date;

        return await this.challengeModel.findOneAndUpdate({ challenge_id }, { $set: updateChallengeDTO }).exec();

    }

    async addMatchToChallenge(challenge_id: string, match_id: string): Promise<void> {
        const challenge = await this.challengeModel.findById(challenge_id);

        if (!challenge) {
            throw new BadRequestException('Challenge not found.');
        }

        const match = await this.matchesService.findById(match_id);

        if (!match) {
            throw new BadRequestException('Match not found.');
        }

        challenge.status = ChallengeStatus.FINISHED;

        await this.challengeModel.findOneAndUpdate({ challenge_id }, { $set: challenge }).exec();

    }

    async remove(challenge_id: string): Promise<any> {
        const challenge = await this.challengeModel.findById(challenge_id).exec();

        if (!challenge) {
            throw new NotFoundException('Challenge not found.');
        }

        return await this.challengeModel.deleteOne({ _id: challenge_id }).exec();
    }
}
