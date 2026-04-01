import { Configuration, Value } from '@itgorillaz/configify';
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MinLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { DatabaseRuntimeConfig } from '../types/db.types';

export function parseBoolean(value: unknown): boolean {
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

export function parseInteger(value: unknown, fallback: number): number {
  if (typeof value === 'number' && Number.isInteger(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

export function parseDatabaseConfigFromEnv(
  env: NodeJS.ProcessEnv = process.env,
): DatabaseRuntimeConfig {
  return {
    url: env.DATABASE_URL ?? '',
    host: env.DATABASE_HOST ?? 'localhost',
    port: parseInteger(env.DATABASE_PORT, 5432),
    name: env.DATABASE_NAME ?? 'snap_solve',
    user: env.DATABASE_USER ?? 'postgres',
    password: env.DATABASE_PASSWORD ?? 'postgres',
    ssl: parseBoolean(env.DATABASE_SSL),
    synchronize: parseBoolean(env.DATABASE_SYNCHRONIZE),
    logging: parseBoolean(env.DATABASE_LOGGING),
    migrationsRun: parseBoolean(env.DATABASE_MIGRATIONS_RUN),
    maxConnections: parseInteger(env.DATABASE_MAX_CONNECTIONS, 20),
    connectionTimeoutMs: parseInteger(
      env.DATABASE_CONNECTION_TIMEOUT_MS,
      10000,
    ),
    idleTimeoutMs: parseInteger(env.DATABASE_IDLE_TIMEOUT_MS, 30000),
    appName: env.DATABASE_APP_NAME ?? 'snap-solve',
  };
}

@Configuration()
export class DatabaseConfig implements DatabaseRuntimeConfig {
  @IsOptional()
  @IsString()
  @Value('DATABASE_URL', { default: '' })
  url: string;

  @ValidateIf(({ url }) => !url)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Value('DATABASE_HOST', { default: 'localhost' })
  host: string;

  @ValidateIf(({ url }) => !url)
  @IsDefined()
  @IsInt()
  @Min(1)
  @Max(65535)
  @Value('DATABASE_PORT', {
    parse: (v) => parseInteger(v, 5432),
    default: 5432,
  })
  port: number;

  @ValidateIf(({ url }) => !url)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Value('DATABASE_NAME', { default: 'snap_solve' })
  name: string;

  @ValidateIf(({ url }) => !url)
  @IsDefined()
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

  @IsBoolean()
  @Value('DATABASE_MIGRATIONS_RUN', { parse: parseBoolean, default: false })
  migrationsRun: boolean;

  @IsInt()
  @Min(1)
  @Max(500)
  @Value('DATABASE_MAX_CONNECTIONS', {
    parse: (v) => parseInteger(v, 20),
    default: 20,
  })
  maxConnections: number;

  @IsInt()
  @Min(1000)
  @Max(120000)
  @Value('DATABASE_CONNECTION_TIMEOUT_MS', {
    parse: (v) => parseInteger(v, 10000),
    default: 10000,
  })
  connectionTimeoutMs: number;

  @IsInt()
  @Min(1000)
  @Max(300000)
  @Value('DATABASE_IDLE_TIMEOUT_MS', {
    parse: (v) => parseInteger(v, 30000),
    default: 30000,
  })
  idleTimeoutMs: number;

  @IsString()
  @MinLength(2)
  @Value('DATABASE_APP_NAME', { default: 'snap-solve' })
  appName: string;
}
