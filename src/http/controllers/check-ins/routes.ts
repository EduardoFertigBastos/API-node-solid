import { FastifyInstance } from 'fastify';
import { verifyJWT } from 'src/http/middlewares/verify-jwt';
import { validate } from './validate';
import { create } from './create';
import { metrics } from './metrics';
import { history } from './history';

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.get('/check-ins/history', history);
  app.get('/check-ins/metrics', metrics);

  app.post('/gyms/:gymId/check-ins', create);
  app.patch('/check-ins/:checkInId/validate', validate);
}
