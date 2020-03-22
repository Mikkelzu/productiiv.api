import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as CookieParser from 'cookie-parser'

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(CookieParser('secret'));
	app.enableCors(
		{
			credentials: true,
			origin: true,
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			allowedHeaders: 'Content-Type, Accept',
		}
	)

	await app.listen(3000);
}
bootstrap();
