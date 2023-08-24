import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from 'nestjs-prisma';

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
  });
});
