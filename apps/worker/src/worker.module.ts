import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigifyModule } from '@itgorillaz/configify';
import { RedisConfig } from '@app/config';
import { PROBLEMS_QUEUE, NOTIFICATIONS_QUEUE } from '@app/shared';
import { ProblemProcessor } from './problem.processor';
import { NotificationProcessor } from './notification.processor';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    BullModule.forRootAsync({
      inject: [RedisConfig],
      useFactory: (redis: RedisConfig) => ({
        connection: {
          host: redis.host,
          port: redis.port,
          ...(redis.username ? { username: redis.username } : {}),
          ...(redis.password ? { password: redis.password } : {}),
        },
      }),
    }),
    BullModule.registerQueue({ name: PROBLEMS_QUEUE }),
    BullModule.registerQueue({ name: NOTIFICATIONS_QUEUE }),
  ],
  providers: [ProblemProcessor, NotificationProcessor],
})
export class WorkerModule {}
