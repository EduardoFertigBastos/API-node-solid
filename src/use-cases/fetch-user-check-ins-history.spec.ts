import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-check-ins-repository';
import FetchUserCheckInUseCase from './fetch-user-check-ins-history';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInUseCase;

describe('Fetch users check ins Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInUseCase(checkInsRepository);
  });

  it('should be able to fetch check in history page 1', async () => {
    for (let i = 1; i < 23; i++) {
      await checkInsRepository.create({
        gym_id: `gym_id-${i}`,
        user_id: 'user_id-1',
      });
    }

    const { checkIns } = await sut.execute({ userId: 'user_id-1' });

    console.log(checkIns);
    expect(checkIns).toHaveLength(20);
  });

  it('should be able to fetch check in history page 2', async () => {
    for (let i = 1; i < 23; i++) {
      await checkInsRepository.create({
        gym_id: `gym_id-${i}`,
        user_id: 'user_id-1',
      });
    }

    const { checkIns } = await sut.execute({
      userId: 'user_id-1',
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym_id-21' }),
      expect.objectContaining({ gym_id: 'gym_id-22' }),
    ]);
  });
});
