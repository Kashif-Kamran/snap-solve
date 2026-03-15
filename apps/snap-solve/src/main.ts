import { NestFactory } from '@nestjs/core';
import { AppConfig } from '@app/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfig);
  await app.listen(appConfig.port);
}
bootstrap();
