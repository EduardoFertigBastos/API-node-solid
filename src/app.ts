import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';
import { userRoutes } from './http/controllers/users/routes';
import { gymRoutes } from './http/controllers/gyms/routes';
import { checkInsRoutes } from './http/controllers/check-ins/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(userRoutes);
app.register(gymRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, request, reply) => {
  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  if (error instanceof ZodError) {
    return reply.status(404).send({
      message: 'Validation error.',
      issues: error.format(),
    });
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  });
});
