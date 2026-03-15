import { NestFactory } from '@nestjs/core';
import { ProblemRunnerModule } from './problem-runner.module';

async function bootstrap() {
  await NestFactory.createApplicationContext(ProblemRunnerModule);
}
bootstrap();
