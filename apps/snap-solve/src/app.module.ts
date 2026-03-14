import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProblemModule } from './problem/problem.module';
import { QueueModule } from './common/queue/queue.module';

@Module({
  imports: [QueueModule, ProblemModule],
  controllers: [AppController],
})
export class AppModule {}
