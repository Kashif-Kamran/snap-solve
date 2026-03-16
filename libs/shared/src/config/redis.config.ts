import { Configuration, Value } from '@itgorillaz/configify';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

@Configuration()
export class RedisConfig {
  @IsString()
  @IsNotEmpty()
  @Value('REDIS_HOST')
  host: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  @Value('REDIS_PORT', { parse: parseInt })
  port: number;

  @IsOptional()
  @IsString()
  @Value('REDIS_USERNAME', { default: '' })
  username: string;

  @ValidateIf((config: RedisConfig) => Boolean(config.username))
  @IsString()
  @IsNotEmpty({
    message: 'REDIS_PASSWORD must be provided when REDIS_USERNAME is set',
  })
  @Value('REDIS_PASSWORD', { default: '' })
  password: string;
}
