import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { parseDatabaseConfigFromEnv } from '@app/shared';
import { createPostgresDataSourceOptions } from './database.options';

const runtimeConfig = parseDatabaseConfigFromEnv();

export default new DataSource(
  createPostgresDataSourceOptions(runtimeConfig, {
    entities: [
      'libs/database/src/entities/*.entity.ts',
      'dist/libs/database/src/entities/*.entity.js',
    ],
    migrations: [
      'libs/database/src/migrations/*.{ts,js}',
      'dist/libs/database/src/migrations/*.{ts,js}',
    ],
  }),
);
