import { Configuration, Value } from '@itgorillaz/configify';
import { IsEnum, IsInt, Max, Min } from 'class-validator';

export enum NodeEnv {
  Development = 'development',
  Test = 'test',
  Production = 'production',
}

@Configuration()
export class AppConfig {
  @IsEnum(NodeEnv)
  @Value('NODE_ENV', { default: NodeEnv.Development })
  nodeEnv: NodeEnv;

  @IsInt()
  @Min(1)
  @Max(65535)
  @Value('PORT', { parse: parseInt })
  port: number;
}
