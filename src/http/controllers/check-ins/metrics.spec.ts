import request from 'supertest';
import { app } from 'src/app';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';
import { createAndAuthenticateUser } from 'src/utils/test/create-and-authenticate-user';
import { prisma } from 'src/lib/prisma';

describe('Check-in metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it.only('should be able to list the metrics of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const { body } = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym Title',
        phone: '479912222',
        description: 'Gym Description',
        latitude: -27.0747279,
        longitude: -49.4889672,
      });

    const { gym } = body;

    const checkIns = await prisma.checkIn.createMany({
      data: [
        {
          user_id: user.id,
          gym_id: gym.id,
        },
        {
          user_id: user.id,
          gym_id: gym.id,
        },
      ],
    });

    const response = await request(app.server)
      .get(`/check-ins/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkInsCount).toEqual(2);
  });
});
