import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';

@Module({
	imports: [PlayersModule],
	controllers: [],
	providers: [],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
