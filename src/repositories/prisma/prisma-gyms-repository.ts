/* eslint-disable camelcase */
import { Prisma } from '@prisma/client';
import { prisma } from 'src/lib/prisma';
import { GymsRepository } from '../gyms-repository';

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({ data });

    return gym;
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }
}
