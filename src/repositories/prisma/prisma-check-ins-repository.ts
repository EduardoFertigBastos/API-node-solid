/* eslint-disable camelcase */
import { CheckIn, Prisma } from '@prisma/client';
import { prisma } from 'src/lib/prisma';
import { CheckInsRepository } from '../check-ins-repository';

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findByUserIdOnDate(userId: string, date: Date): Promise<Gym | null> {
    //
    return null;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const CheckIn = await prisma.checkIn.create({ data });

    return CheckIn;
  }
}
