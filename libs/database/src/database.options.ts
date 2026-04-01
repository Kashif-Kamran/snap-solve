import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {
  DatabaseConfig,
  DatabaseRuntimeConfig,
  DB_RETRY_CONFIG,
} from '@app/shared';
import { SnakeNamingStrategy } from './naming.strategy';

export type PostgresTypeOrmModuleOverrides = Omit<TypeOrmModuleOptions, 'type'>;
export type PostgresDataSourceOverrides = Omit<
  Partial<PostgresConnectionOptions>,
  'type'
>;

function assertValidRuntimeConfig(config: DatabaseRuntimeConfig): void {
  if (!config.url && (!config.host || !config.name || !config.user)) {
    throw new Error(
      'Invalid database configuration: provide DATABASE_URL or DATABASE_HOST/DATABASE_NAME/DATABASE_USER.',
    );
  }

  if (config.maxConnections < 1) {
    throw new Error(
      'Invalid DATABASE_MAX_CONNECTIONS: expected a positive integer.',
    );
  }

  if (config.connectionTimeoutMs < 1000) {
    throw new Error(
      'Invalid DATABASE_CONNECTION_TIMEOUT_MS: expected value >= 1000.',
    );
  }

  if (config.idleTimeoutMs < 1000) {
    throw new Error(
      'Invalid DATABASE_IDLE_TIMEOUT_MS: expected value >= 1000.',
    );
  }
}

export function createPostgresDataSourceOptions(
  config: DatabaseRuntimeConfig,
  overrides: PostgresDataSourceOverrides = {},
): PostgresConnectionOptions {
  assertValidRuntimeConfig(config);

  const baseOptions: PostgresConnectionOptions = {
    type: 'postgres',
    synchronize: config.synchronize,
    logging: config.logging,
    ssl: config.ssl ? { rejectUnauthorized: false } : false,
    migrationsRun: config.migrationsRun,
    namingStrategy: new SnakeNamingStrategy(),
    connectTimeoutMS: config.connectionTimeoutMs,
    poolSize: config.maxConnections,
    extra: {
      application_name: config.appName,
      idleTimeoutMillis: config.idleTimeoutMs,
      statement_timeout: config.connectionTimeoutMs,
    },
  };

  const connectionOptions = config.url
    ? ({ url: config.url } as const)
    : ({
        host: config.host,
        port: config.port,
        database: config.name,
        username: config.user,
        password: config.password,
      } as const);

  return {
    ...baseOptions,
    ...connectionOptions,
    ...overrides,
  };
}

export function createPostgresTypeOrmOptions(
  config: DatabaseConfig,
  overrides: PostgresTypeOrmModuleOverrides = {},
): TypeOrmModuleOptions {
  return {
    ...createPostgresDataSourceOptions(config),
    autoLoadEntities: true,
    retryAttempts: DB_RETRY_CONFIG.ATTEMPTS,
    retryDelay: DB_RETRY_CONFIG.DELAY,
    ...overrides,
  } as TypeOrmModuleOptions;
}
