import request from 'supertest';
import { app } from 'src/app';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';
import { createAndAuthenticateUser } from 'src/utils/test/create-and-authenticate-user';
import { prisma } from 'src/lib/prisma';

describe('Check-in validate (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it.only('should be able to validate a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const responseGym = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym Title',
        phone: '479912222',
        description: 'Gym Description',
        latitude: -27.0747279,
        longitude: -49.4889672,
      });

    const { gym } = responseGym.body;

    let checkIn = await prisma.checkIn.create({
      data: {
        user_id: user.id,
        gym_id: gym.id,
      },
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -27.0747279,
        longitude: -49.4889672,
      });

    expect(response.statusCode).toEqual(204);

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
