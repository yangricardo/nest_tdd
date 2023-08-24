import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';
import { PrismaService } from 'nestjs-prisma';
import { findManyMock, firstTweetMock } from './mocks/list';
import { PrismaServiceMock, prismaServiceMock } from '@/prisma/mock';

describe('TweetsService', () => {
  let service: TweetsService;
  let prismaService: PrismaServiceMock;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetsService,PrismaService],
    })
    .overrideProvider(PrismaService)
    .useValue(prismaServiceMock)
    .compile();

    service = module.get<TweetsService>(TweetsService);
    prismaService = module.get(PrismaService);
  });

  describe(`createTweet`, () => {
    it(`should create a new tweet`, async () => {
      prismaService.tweet.create.mockResolvedValue(firstTweetMock);

      // Act
      const createTweet = () =>
        service.createTweet({
          data: {
            content: firstTweetMock.content,
            user: {
              connect: {
                id: firstTweetMock.userId,
              },
            },
          },
        });

      // Assert
      await expect(createTweet()).resolves.toBe(firstTweetMock);
    });

    it(`should not be over 80 characters`, async () => {
      // Arrange
      const payload = {
        content: `This is a super long tweet over 80 characters This is a super long tweet over 80 characters`,
        userId: 1234,
      };

      // Act
      const createTweet = () =>
        service.createTweet({
          data: {
            content: payload.content,
            user: {
              connect: {
                id: payload.userId,
              },
            },
          },
        });

      // Assert
      await expect(createTweet()).rejects.toBeInstanceOf(Error);
    });
  });

  describe(`getTweets`, () => {
    it(`should return a list of tweets`, async () => {
      prismaService.tweet.findMany.mockResolvedValue(findManyMock);
      const tweets = await service.getTweets({});
      expect(tweets).toBe(findManyMock);
    });
  });
});
