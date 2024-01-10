import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-check-ins-repository';
import GetUserMetricsUseCase from './get-user-metrics';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe('Fetch users check ins Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it('should be able to get check-ins count from metrics', async () => {
    const QUANTITY = 10;
    for (let i = 1; i <= QUANTITY; i++) {
      await checkInsRepository.create({
        gym_id: `gym_id-${i}`,
        user_id: 'user_id-1',
      });
    }

    const { checkInsCount } = await sut.execute({ userId: 'user_id-1' });

    expect(checkInsCount).toEqual(QUANTITY);
  });
});
