import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PaymentController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/checkout (GET)', () => {
    return request(app.getHttpServer())
      .get('/checkout')
      .set('Authorization', 'Bearer your-jwt-token')
      .expect(200)
      .expect((res) => {
        expect(res.body.paymentOptions).toContain('CARD');
      });
  });

  it('/checkout/scan (POST)', () => {
    return request(app.getHttpServer())
      .post('/checkout/scan')
      .set('Authorization', 'Bearer your-jwt-token')
      .send({ paymentMethod: 'CARD' })
      .expect(201)
      .expect((res) => {
        expect(res.body.scanInitiated).toBe(true);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});