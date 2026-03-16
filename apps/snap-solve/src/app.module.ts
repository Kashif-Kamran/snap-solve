import { Module } from '@nestjs/common';
import { ConfigifyModule } from '@itgorillaz/configify';
import { DatabaseModule } from '@app/database';
import { AppController } from './app.controller';
import { ProblemModule } from './modules/problem/problem.module';
import { QueueModule } from './common/queue/queue.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    DatabaseModule.forRoot({
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    QueueModule,
    ProblemModule,
    NotificationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
