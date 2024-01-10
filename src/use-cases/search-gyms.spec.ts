import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import SearchGymsUseCase from './search-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it('should be able to fetch check in history page 1', async () => {
    await gymsRepository.create({
      latitude: 0,
      longitude: 0,
      title: 'Gym pika',
    });

    await gymsRepository.create({
      latitude: 0,
      longitude: 0,
      title: 'Gym foda',
    });

    const { gyms } = await sut.execute({
      query: 'pika',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Gym pika' })]);
  });

  it('should be able to search gyms page 2', async () => {
    for (let i = 1; i < 23; i++) {
      await gymsRepository.create({
        latitude: 0,
        longitude: 0,
        title: `Gym foda ${i}`,
      });
    }

    const { gyms } = await sut.execute({
      query: 'foda',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym foda 21' }),
      expect.objectContaining({ title: 'Gym foda 22' }),
    ]);
  });
});
