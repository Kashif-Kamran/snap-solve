import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PROBLEMS_QUEUE, NOTIFICATIONS_QUEUE } from '@app/shared';
import { ProblemProcessor } from './problem.processor';
import { NotificationProcessor } from './notification.processor';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: PROBLEMS_QUEUE,
    }),
    BullModule.registerQueue({
      name: NOTIFICATIONS_QUEUE,
    }),
  ],
  providers: [ProblemProcessor, NotificationProcessor],
})
export class WorkerModule {}
