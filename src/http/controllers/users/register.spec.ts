import request from 'supertest';
import { app } from 'src/app';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 201 when register a new user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(response.status).toEqual(201);
  });
});
