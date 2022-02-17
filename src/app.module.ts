import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
	imports: [
		MongooseModule.forRoot(
			'mongodb+srv://vbrodrigues:221193@cluster0.ravlj.mongodb.net/ranking',
			{
				useNewUrlParser: true,
				// useCreateIndex: true,
				useUnifiedTopology: true,
				// useFindAndModify: false,
			},
		),
		PlayersModule,
		CategoriesModule,
	],
	controllers: [],
	providers: [],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
