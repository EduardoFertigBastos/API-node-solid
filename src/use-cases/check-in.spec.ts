import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-check-ins-repository';
import CheckInUseCase from './check-in';
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.create({
      id: 'gym-id',
      title: 'Gym Title',
      phone: '479912222',
      description: 'Gym Description',
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2023, 0, 8, 8));

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should be able to check in twice in same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 8, 8));

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -27.0747279,
        userLongitude: -49.4889672,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it('should be able to check in twice but in differents days', async () => {
    vi.setSystemTime(new Date(2023, 0, 8, 8));

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    });

    vi.setSystemTime(new Date(2023, 0, 9, 8));

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in distant gym', async () => {
    gymsRepository.create({
      id: 'gym-id',
      title: 'Gym Title',
      phone: '479912222',
      description: 'Gym Description',
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -27.0747279,
        userLongitude: -50.4889672,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
