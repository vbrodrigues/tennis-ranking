import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';
import { MatchesModule } from './matches/matches.module';
import { ChallengesModule } from './challenges/challenges.module';

@Module({
	imports: [
		MongooseModule.forRoot(
			'mongodb+srv://**@cluster0.ravlj.mongodb.net/ranking',
			{
				useNewUrlParser: true,
				// useCreateIndex: true,
				useUnifiedTopology: true,
				// useFindAndModify: false,
			},
		),
		PlayersModule,
		CategoriesModule,
		MatchesModule,
		ChallengesModule,
	],
	controllers: [],
	providers: [],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
