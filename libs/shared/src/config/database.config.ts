import { Configuration, Value } from '@itgorillaz/configify';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

function parseBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    return value === 1;
  }

  if (typeof value === 'string') {
    return ['true', '1', 'yes', 'on'].includes(value.trim().toLowerCase());
  }

  return false;
}

@Configuration()
export class DatabaseConfig {
  @IsOptional()
  @IsString()
  @Value('DATABASE_URL', { default: '' })
  url: string;

  @IsString()
  @IsNotEmpty()
  @Value('DATABASE_HOST', { default: 'localhost' })
  host: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  @Value('DATABASE_PORT', { parse: parseInt, default: 5432 })
  port: number;

  @IsString()
  @IsNotEmpty()
  @Value('DATABASE_NAME', { default: 'snap_solve' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Value('DATABASE_USER', { default: 'postgres' })
  user: string;

  @IsString()
  @Value('DATABASE_PASSWORD', { default: 'postgres' })
  password: string;

  @IsBoolean()
  @Value('DATABASE_SSL', { parse: parseBoolean, default: false })
  ssl: boolean;

  @IsBoolean()
  @Value('DATABASE_SYNCHRONIZE', { parse: parseBoolean, default: false })
  synchronize: boolean;

  @IsBoolean()
  @Value('DATABASE_LOGGING', { parse: parseBoolean, default: false })
  logging: boolean;
}
