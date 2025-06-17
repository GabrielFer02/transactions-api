import { FastifyInstance } from 'fastify';
import zod from 'zod';
import { randomUUID } from 'node:crypto';
import { knex } from '../database.js';

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions').select();

    return { transactions };
  });

  app.get('/:id', async request => {
    const getTransactionsParamsSchema = zod.object({
      id: zod.string().uuid(),
    });

    const { id } = getTransactionsParamsSchema.parse(request.params);

    const transaction = await knex('transactions').where('id', id).first();

    return {
      transaction,
    };
  });

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = zod.object({
      title: zod.string(),
      amount: zod.number(),
      type: zod.enum(['credit', 'debit']),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    );

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    });

    return reply.status(201).send();
  });
}
