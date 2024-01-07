import { beforeEach, describe, expect, it } from 'vitest';
import RegisterUseCase from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should have password hashed correctly', async () => {
    const password = '123456';

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password,
    });

    const isPasswordCorrectlyHahed = await compare(
      password,
      user.password_hash,
    );

    expect(isPasswordCorrectlyHahed).toBe(true);
  });

  it('should not register same email twice', async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345',
    };

    await sut.execute(user);

    await expect(() => sut.execute(user)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    );
  });
});
