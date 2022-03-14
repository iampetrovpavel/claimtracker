import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateSystemDto } from 'src/system/dto/create-system.dto';
import { SystemService } from '../src/system/system.service';
import { SystemModel } from '../src/system/system.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { disconnect } from 'mongoose';
import mongoose from 'mongoose';

const testDto: CreateSystemDto = {
  name: 'Вентиляция',
  description: 'Системы вентиляции и кондиционирования'
}

const updateDto: CreateSystemDto = {
  name: 'Водоснабжение',
  description: 'Системы водоснабжения'
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let service: SystemService;
  let createdId: string;
  let document: DocumentType<SystemModel>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypegooseModule.forFeature([
        {
          typegooseClass: SystemModel,
          schemaOptions: {
            collection: 'System'
          }
        }
      ])],
    	providers: [SystemService],
    }).compile();

    service = moduleFixture.get<SystemService>(SystemService)
    const deletedCount = await service.clear()
    expect(deletedCount).toBe(0)
    app = moduleFixture.createNestApplication();
    await app.init();
  })

  beforeEach(async () => {

  });

  it('/system/create (POST) - success', (done) => {
    request(app.getHttpServer())
        .post('/system/create')
        .send(testDto)
        .expect(201)
        .then(({ body }: request.Response) => {
          createdId = body._id;
          expect(createdId).toBeDefined()
          done()
        })
  });

  it('/system/create (POST) - fail', (done) => {
    request(app.getHttpServer())
        .post('/system/create')
        .send({...testDto, name: 0})
        .expect(400)
        .then(({ body }) => {
          console.log(body)
          done()
        })
  });

  it('/system (GET)', (done) => {
    request(app.getHttpServer())
      .get('/system')
      .send()
      .expect(200)
      .then(({body}: request.Response) => {
          expect(body.length).toBe(1)
          document = body[0];
          expect(document.name).toEqual(testDto.name)
          expect(document.description).toEqual(testDto.description)
          done()
      })
  })

  it('/system (PATCH) - success', (done) => {
    request(app.getHttpServer())
      .patch(`/system/${document._id}`)
      .send(updateDto)
      .expect(200)
      .then(({body}: request.Response) => {
          const changedDto = body;
          expect(updateDto.name).toEqual(changedDto.name);
          expect(updateDto.description).toEqual(changedDto.description);
          done()
      })
  })

  it('/system (PATCH) - fail', async () => {
    return request(app.getHttpServer())
      .patch(`/system/${new mongoose.Types.ObjectId().toHexString()}`)
      .send(updateDto)
      .expect(404)
  })

  it('/system/[id] (DELETE) - success', async () => {
    return request(app.getHttpServer())
        .delete(`/system/${createdId}`)
        .send()
        .expect(200)
  });

  it('/system/[id] (DELETE) - fail', async () => {
    return request(app.getHttpServer())
        .delete(`/system/${new mongoose.Types.ObjectId().toHexString()}`)
        .send()
        .expect(404)
  });

  afterAll(()=>{
    disconnect()
  })
});
