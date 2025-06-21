import setupKnex, { type Knex } from 'knex';
import { env } from './env/env.js';

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === 'better-sqlite3'
      ? {
          filename: env.DATABASE_URL,
        }
      : env.DATABASE_URL,

  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
};

export const knex = setupKnex(config);
