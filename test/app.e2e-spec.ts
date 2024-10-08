import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Create order', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/order',
    });

    expect(response.statusCode).toBe(201);
    const friendlyPayload = JSON.parse(response.payload);
    expect(friendlyPayload.message).toBe('Order created successfully');
  });
});
