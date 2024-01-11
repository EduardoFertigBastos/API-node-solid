import ValidateCheckInUseCase from '../validate-check-in';
import { PrismaCheckInsRepository } from 'src/repositories/prisma/prisma-check-ins-repository';

export default function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInUseCase(checkInsRepository);

  return useCase;
}
