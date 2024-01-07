import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import AuthenticateUseCase from 'src/use-cases/authenticate';
import { z } from 'zod';
import { InvalidCredentialsError } from 'src/use-cases/errors/invalid-credentials';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    const user = await authenticateUseCase.execute({
      email,
      password,
    });

    return reply.status(200).send();
  } catch (err: any) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: err.message,
      });
    }

    throw err;
  }
}
