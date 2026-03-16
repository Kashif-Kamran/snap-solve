import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigifyModule } from '@itgorillaz/configify';
import { DatabaseConfig } from '@app/shared';
import {
  createPostgresTypeOrmOptions,
  PostgresTypeOrmModuleOverrides,
} from './database.options';

@Module({})
export class DatabaseModule {
  static forRoot(
    overrides: PostgresTypeOrmModuleOverrides = {},
  ): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        ConfigifyModule.forRootAsync(),
        TypeOrmModule.forRootAsync({
          inject: [DatabaseConfig],
          useFactory: (databaseConfig: DatabaseConfig) =>
            createPostgresTypeOrmOptions(databaseConfig, overrides),
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}
