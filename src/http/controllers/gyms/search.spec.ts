import request from 'supertest';
import { app } from 'src/app';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';
import { createAndAuthenticateUser } from 'src/utils/test/create-and-authenticate-user';

describe('Gym create (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym Title',
        phone: '479912222',
        description: 'Gym Description',
        latitude: -27.0747279,
        longitude: -49.4889672,
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Cu Title',
        phone: '479912222',
        description: 'Cu Description',
        latitude: -27.0747279,
        longitude: -49.4889672,
      });

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Gym',
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym Title',
      }),
    ]);
  });
});
