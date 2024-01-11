import { PrismaGymsRepository } from 'src/repositories/prisma/prisma-gyms-repository';
import CreateGymUseCase from '../create-gym';

export default function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(gymsRepository);

  return useCase;
}
