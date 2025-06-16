import fastify from 'fastify';
import { knex } from './database.js';
import { env } from './env/env.js';

const app = fastify();

app.get('/hello', async () => {
  const tables = await knex('sqlite_schema').select('*');

  return tables;
});

app
  .listen({ port: env.PORT })
  .then(() => {
    console.log('HTTP server running');
  })
  .catch((error: unknown) => {
    console.log(error);
  });
