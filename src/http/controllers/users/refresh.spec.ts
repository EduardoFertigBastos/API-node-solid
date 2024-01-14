import request from 'supertest';
import { app } from 'src/app';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const authResponse = await request(app.server).post('/session').send({
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const cookies = authResponse.get('Set-Cookie');

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken'),
    ]);
  });
});
