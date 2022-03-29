import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateMatchDTO } from './dtos/CreateMatch.dto';
import { UpdateMatchDTO } from './dtos/UpdateMatch.dto';
import Match from './interfaces/match.interface';

@Injectable()
export class MatchesService {

    constructor(
        @InjectModel('Match') private readonly matchModel: Model<Match>,
        private readonly playersService: PlayersService
    ) { }

    async create(createMatchDTO: CreateMatchDTO): Promise<Match> {

        const players = await Promise.all(createMatchDTO.players.map(async (player_id) => {
            return await this.playersService.findById(player_id);
        }));

        if (players.includes(null)) {
            throw new NotFoundException('Player not found.');
        }

        const match = new this.matchModel({ ...createMatchDTO, players });

        await match.save();

        return match;
    }

    async list(): Promise<Match[]> {
        return await this.matchModel.find().populate('players').exec();
    }

    async findById(match_id: string): Promise<Match> {
        const match = await this.matchModel.findById(match_id).exec();

        if (!match) {
            throw new NotFoundException('Match not found.');
        }

        return match;
    }

    async update(match_id: string, updateMatchDTO: UpdateMatchDTO): Promise<Match> {
        const match = await this.matchModel.findById(match_id).exec();

        if (!match) {
            throw new NotFoundException('Match not found.');
        }

        return await this.matchModel.findOneAndUpdate({ match_id }, { $set: updateMatchDTO }).exec();
    }

    async remove(match_id: string): Promise<any> {
        const match = await this.matchModel.findById(match_id);

        if (!match) {
            throw new NotFoundException('Match not found.');
        }

        return await this.matchModel.deleteOne({ _id: match_id }).exec();
    }

}
