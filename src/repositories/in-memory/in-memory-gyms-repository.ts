/* eslint-disable camelcase */
import { Prisma, Gym } from '@prisma/client';
import { GymsRepository } from '../gyms-repository';
import { randomUUID } from 'crypto';

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = [];

  create({
    id,
    latitude,
    longitude,
    title,
    description,
    phone,
  }: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: id ?? randomUUID(),
      phone: phone ?? null,
      title,
      description: description ?? null,
      latitude: new Prisma.Decimal(latitude.toString()),
      longitude: new Prisma.Decimal(longitude.toString()),
      created_at: new Date(),
    } as Gym;

    this.gyms.push(gym);

    return Promise.resolve(gym);
  }

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
