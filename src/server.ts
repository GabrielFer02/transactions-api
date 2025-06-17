import fastify from 'fastify';
import { env } from './env/env.js';
import { transactionsRoutes } from './routes/transactions.js';

const app = fastify();

app.register(transactionsRoutes, {
  prefix: 'transactions'
});

app
  .listen({ port: env.PORT })
  .then(() => {
    console.log('HTTP server running');
  })
  .catch((error: unknown) => {
    console.log(error);
  });
