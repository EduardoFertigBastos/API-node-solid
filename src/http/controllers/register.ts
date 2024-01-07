import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import { UserAlreadyExistsError } from 'src/use-cases/errors/user-already-exists-error';
import RegisterUseCase from 'src/use-cases/register';
import { z } from 'zod';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const user = await registerUseCase.execute({
      name,
      email,
      password,
    });

    return reply.status(201).send({
      user,
    });
  } catch (err: any) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }
}
