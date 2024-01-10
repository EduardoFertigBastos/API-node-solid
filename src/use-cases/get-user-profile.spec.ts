import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository';
import GetUserProfileUseCase from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get user Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to retrieve user', async () => {
    const userCreated = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      userId: userCreated.id,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to retrieve user', async () => {
    await expect(() =>
      sut.execute({
        userId: 'user-id-fakenatty',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
