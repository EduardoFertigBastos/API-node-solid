import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { InvalidCredentialsError } from 'src/use-cases/errors/invalid-credentials-error';
import makeAuthenticateUseCase from 'src/use-cases/factories/make-authenticate-use-case';

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  );

  return reply
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .send({
      token,
    });
}
