import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigifyModule } from '@itgorillaz/configify';
import { PROBLEMS_QUEUE, RedisConfig } from '@app/shared';
import { ProblemProcessor } from './problem.processor';

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
  ],
  providers: [ProblemProcessor],
})
export class ProblemRunnerModule {}
