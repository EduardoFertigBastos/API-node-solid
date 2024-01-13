import { FastifyReply, FastifyRequest } from 'fastify';
import makeFetchUserCheckInsHistoryUseCase from 'src/use-cases/factories/make-fetch-user-check-ins-history-use-case';
import { z } from 'zod';

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const historyCheckInsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = historyCheckInsQuerySchema.parse(request.query);

  const historyCheckInsUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await historyCheckInsUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(201).send({
    checkIns,
  });
}
