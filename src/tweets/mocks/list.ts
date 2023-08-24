import { Tweet } from "@prisma/client";

export const firstTweetMock: Tweet =  {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  content: `Hello world, this is a tweet.`,
  userId: 1234,
}

export const secondTweetMock: Tweet =  {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  content: `Hello world, this is another tweet.`,
  userId: 5678,
}

export const findManyMock: Tweet[] = [
  firstTweetMock,
  secondTweetMock,
]