import { FastifyInstance } from 'fastify';
import { register } from './register';
import { authenticate } from './authenticate';
import { verifyJWT } from 'src/http/middlewares/verify-jwt';
import { profile } from './profile';

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/session', authenticate);

  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
