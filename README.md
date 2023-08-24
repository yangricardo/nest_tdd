# NestJS + Prisma ORM + TDD Studies

This repository aims to collect NestJS api good practices based on:

- [NestJS](https://nestjs.com/), as backend framework
- [Zod](https://zod.dev/), as Schema Validation
- [Prisma ORM](https://www.prisma.io/), as Database ORM tool
  - [NestJS Prisma](https://nestjs-prisma.dev/), to improve integration between Prisma ans NestJS

Author: [Yang Miranda](https://github.com/yangricardo)

## References

### [Ultimate Guide: How to use Prisma with NestJS](https://www.tomray.dev/nestjs-prisma)

> 1. Use [jest-mock-extended](https://github.com/marchaos/jest-mock-extended) helper to deep mock, as in [src/prisma/mock.ts](src/prisma/mock.ts)
> 2. Use Prisma generated typings to help create mock values, as in [src/prisma/tweets.mock.ts](src/prisma/tweets.mock.ts)
> 3. Setup `mock.ts` suffix name to be excluded from build distribution
> 4. Setup `@/` as module path alias
