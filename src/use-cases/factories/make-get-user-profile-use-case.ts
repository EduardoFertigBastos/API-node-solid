import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import GetUserProfileUseCase from '../get-user-profile';

export default function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(usersRepository);

  return useCase;
}
