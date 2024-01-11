import { PrismaGymsRepository } from 'src/repositories/prisma/prisma-gyms-repository';
import SearchGymsUseCase from '../search-gyms';

export default function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}
