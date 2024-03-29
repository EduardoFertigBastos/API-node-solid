import { FastifyInstance } from 'fastify';
import { register } from './register';
import { authenticate } from './authenticate';
import { refresh } from './refresh';
import { verifyJWT } from 'src/http/middlewares/verify-jwt';
import { profile } from './profile';

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/session', authenticate);

  app.patch('/token/refresh', refresh);

  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
