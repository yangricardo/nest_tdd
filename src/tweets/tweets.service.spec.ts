import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from 'nestjs-prisma';
import { findManyMock } from './mocks/list';

describe('TweetsService', () => {
  let service: TweetsService;
  let prismaService: DeepMockProxy<PrismaService>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetsService,PrismaService],
    })
    .overrideProvider(PrismaService)
    .useValue(mockDeep<PrismaService>())
    .compile();

    service = module.get<TweetsService>(TweetsService);
    prismaService = module.get(PrismaService);
  });

  describe(`createTweet`, () => {
    it(`should create a new tweet`, async () => {
      // Arrange
      const mockedTweet = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        content: `Hello world, this is a tweet.`,
        userId: 1234,
      };
      prismaService.tweet.create.mockResolvedValue(mockedTweet);

      // Act
      const createTweet = () =>
        service.createTweet({
          data: {
            content: mockedTweet.content,
            user: {
              connect: {
                id: mockedTweet.userId,
              },
            },
          },
        });

      // Assert
      await expect(createTweet()).resolves.toBe(mockedTweet);
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
