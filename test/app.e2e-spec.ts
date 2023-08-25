import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { E2EPostgresPrismaModule } from './prisma.testcontainer';
import { PrismaService } from 'nestjs-prisma';
import { TweetsModule } from '@/tweets/tweets.module';
import { TweetsService } from '@/tweets/tweets.service';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let tweetsService: TweetsService
  let e2ePostgresPrismaModule: E2EPostgresPrismaModule;


  beforeEach(async () => {
    e2ePostgresPrismaModule = await E2EPostgresPrismaModule.getInstance();
    const prismaModule = await e2ePostgresPrismaModule.getPrismaModule();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [prismaModule,TweetsModule,AppModule],
    }).compile();
    
    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    tweetsService = moduleFixture.get<TweetsService>(TweetsService);
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
    const tweet = await tweetsService.createTweet({
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

  it('list at least on tweet after create one', async()=>{
    const tweets = await tweetsService.getTweets({});
    expect(tweets.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await app.close();
    await e2ePostgresPrismaModule.stop();
  })
});
