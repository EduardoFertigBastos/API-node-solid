import { compare, hash } from 'bcryptjs';
import { prisma } from 'src/lib/prisma';
import { UsersRepository } from 'src/repositories/users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { User } from '@prisma/client';
import { InvalidCredentialsError } from './errors/invalid-credentials';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export default class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
