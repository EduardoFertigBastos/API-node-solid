import { FastifyReply, FastifyRequest } from 'fastify';
import makeFetchNearbyGymsUseCase from 'src/use-cases/factories/make-fetch-nearby-gyms-use-case';
import makeSearchGymsUseCase from 'src/use-cases/factories/make-search-gyms-use-case';
import { z } from 'zod';

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send({
    gyms,
  });
}
