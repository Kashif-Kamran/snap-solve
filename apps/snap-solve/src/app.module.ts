import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProblemModule } from './problem/problem.module';
import { QueueModule } from './common/queue/queue.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [QueueModule, ProblemModule, NotificationModule],
  controllers: [AppController],
})
export class AppModule {}
