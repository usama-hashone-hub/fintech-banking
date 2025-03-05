import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/users/register')
      .send({ email: 'test@example.com', password: 'password', name: 'Test User' })
      .expect(201)
      .expect((res) => {
        expect(res.body.email).toBe('test@example.com');
        expect(res.body.name).toBe('Test User');
        expect(res.body).not.toHaveProperty('password');
      });
  });

  it('/users/profile (GET) with valid JWT', () => {
    return request(app.getHttpServer())
      .get('/users/profile')
      .set('Authorization', 'Bearer your-jwt-token') // Replace with valid token from /auth/login
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});