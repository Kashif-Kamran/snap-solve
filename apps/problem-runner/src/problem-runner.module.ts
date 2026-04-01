import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigifyModule } from '@itgorillaz/configify';
import { DatabaseModule } from '@app/database';
import { PROBLEMS_QUEUE, RedisConfig } from '@app/shared';
import { ProblemProcessor } from './problem.processor';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    DatabaseModule.forRoot(),
    BullModule.forRootAsync({
      inject: [RedisConfig],
      useFactory: (redis: RedisConfig) => ({
        connection: {
          host: redis.host,
          port: redis.port,
        },
      }),
    }),
    BullModule.registerQueue({ name: PROBLEMS_QUEUE }),
  ],
  providers: [ProblemProcessor],
})
export class ProblemRunnerModule {}
