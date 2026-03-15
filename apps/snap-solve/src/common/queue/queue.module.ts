import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PROBLEMS_QUEUE, NOTIFICATIONS_QUEUE } from '@app/shared';

@Global()
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
  exports: [BullModule],
})
export class QueueModule {}
