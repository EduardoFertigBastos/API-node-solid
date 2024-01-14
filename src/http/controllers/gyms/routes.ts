import { FastifyInstance } from 'fastify';
import { verifyJWT } from 'src/http/middlewares/verify-jwt';
import { nearby } from './nearby';
import { search } from './search';
import { create } from './create';
import { verifyUserRole } from 'src/http/middlewares/verify-user-role';

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.get('/gyms/nearby', nearby);
  app.get('/gyms/search', search);

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create);
}
