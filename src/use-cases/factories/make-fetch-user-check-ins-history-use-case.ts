import FetchUserCheckInsHistoryUseCase from '../fetch-user-check-ins-history';
import { PrismaCheckInsRepository } from 'src/repositories/prisma/prisma-check-ins-repository';

export default function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}
