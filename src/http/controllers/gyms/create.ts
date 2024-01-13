import { FastifyReply, FastifyRequest } from 'fastify';
import makeCreateGymUseCase from 'src/use-cases/factories/make-create-gym-use-case';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  });

  const { title, description, phone, latitude, longitude } =
    createBodySchema.parse(request.body);

  const createGymUseCase = makeCreateGymUseCase();

  const { gym } = await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  });

  return reply.status(201).send({
    gym,
  });
}
