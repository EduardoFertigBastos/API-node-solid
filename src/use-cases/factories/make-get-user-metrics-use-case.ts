import GetUserMetricsUseCase from '../get-user-metrics';
import { PrismaCheckInsRepository } from 'src/repositories/prisma/prisma-check-ins-repository';

export default function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
}
