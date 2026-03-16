import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfig } from '@app/shared';

export type PostgresTypeOrmModuleOverrides = Omit<TypeOrmModuleOptions, 'type'>;

export function createPostgresTypeOrmOptions(
  config: DatabaseConfig,
  overrides: PostgresTypeOrmModuleOverrides = {},
): TypeOrmModuleOptions {
  const baseOptions = {
    type: 'postgres',
    autoLoadEntities: true,
    synchronize: config.synchronize,
    logging: config.logging,
    ssl: config.ssl ? { rejectUnauthorized: false } : false,
  } as const;

  if (config.url) {
    return {
      ...baseOptions,
      url: config.url,
      ...overrides,
    } as TypeOrmModuleOptions;
  }

  return {
    ...baseOptions,
    host: config.host,
    port: config.port,
    database: config.name,
    username: config.user,
    password: config.password,
    ...overrides,
  } as TypeOrmModuleOptions;
}
