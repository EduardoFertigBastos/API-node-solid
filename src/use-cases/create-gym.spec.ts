import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository';
import CreateGymUseCase from './create-gym';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'John Doe',
      phone: null,
      description: null,
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
