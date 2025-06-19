import { env } from './env/env.js';
import { app } from './app.js';

app
  .listen({ port: env.PORT })
  .then(() => {
    console.log('HTTP server running');
  })
  .catch((error: unknown) => {
    console.log(error);
  });
