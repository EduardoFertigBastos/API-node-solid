import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import RegisterUseCase from '../register';

export default function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
