import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateSystemDto } from 'src/system/dto/create-system.dto';

const testDto: CreateSystemDto = {
  name: 'Вентиляция',
  description: 'Системы вентиляции и кондиционирования'
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/system/create (POST)', async (done) => {
    return request(app.getHttpServer())
      .post('/system/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined()
        done()
      })
  });
});
