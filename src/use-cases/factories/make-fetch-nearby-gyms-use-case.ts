import { PrismaGymsRepository } from 'src/repositories/prisma/prisma-gyms-repository';
import FetchNearbyGymsUseCase from '../fetch-nearby-gyms';

export default function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}
