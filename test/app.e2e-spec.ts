import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { E2EPostgresPrismaModule } from './prisma.testcontainer';
import { PrismaService } from 'nestjs-prisma';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let e2ePostgresPrismaModule: E2EPostgresPrismaModule;


  beforeEach(async () => {
    e2ePostgresPrismaModule = await E2EPostgresPrismaModule.getInstance();
    const prismaModule = await e2ePostgresPrismaModule.getPrismaModule();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [prismaModule,AppModule],
    }).compile();
    
    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  }, 10000);

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('find no tweet', async()=>{
    const tweet = await prismaService.tweet.findFirst();
    expect(tweet).toBeNull();
  });
  it('create a tweet', async()=>{
    const tweet = await prismaService.tweet.create({
      data: {
        content: 'Hello World!',  
        user: {
          create: {
            username: 'testuser'
          }
        }      
      }
    });
    console.log(tweet);
    expect(tweet).toHaveProperty('id');
  });

  afterAll(async () => {
    await app.close();
    await e2ePostgresPrismaModule.stop();
  })
});
