import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import AuthenticateUseCase from '../authenticate';

export default function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
