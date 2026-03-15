import { Module } from '@nestjs/common';
import { ConfigifyModule } from '@itgorillaz/configify';
import { AppController } from './app.controller';
import { ProblemModule } from './modules/problem/problem.module';
import { QueueModule } from './common/queue/queue.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    QueueModule,
    ProblemModule,
    NotificationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
