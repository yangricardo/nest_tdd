# NestJS + Prisma ORM + TDD Studies

This repository aims to collect NestJS api good practices based on:

- [NestJS](https://nestjs.com/), as backend framework
- [Zod](https://zod.dev/), as Schema Validation
- [Prisma ORM](https://www.prisma.io/), as Database ORM tool
  - [NestJS Prisma](https://nestjs-prisma.dev/), to improve integration between Prisma ans NestJS

Author: [Yang Miranda](https://github.com/yangricardo)

## References

### [NestJS and Prisma TDD](https://www.tomray.dev/nestjs-prisma)

> 1. Use [jest-mock-extended](https://github.com/marchaos/jest-mock-extended) helper to deep mock, as in [src/prisma/mock.ts](src/prisma/mock.ts)
> 2. Use Prisma generated typings to help create mock values, as in [src/prisma/tweets.mock.ts](src/prisma/tweets.mock.ts)
> 3. Setup `mock.ts` suffix name to be excluded from build distribution
> 4. Setup `@/` as module path alias

### [NestJS Docker Deployment](https://www.tomray.dev/nestjs-docker-production)

> Adapted to use `yarn` as package manager

### E2E Tests using Postgres Testcontainers

> [Testcontainers for Node](https://node.testcontainers.org/quickstart/)
> [PostgreSQL Testcontainers](https://testcontainers.com/modules/postgresql/)
> [Prisma E2E Tests](https://www.prisma.io/blog/testing-series-4-OVXtDis201)
> [Happy 😉 Postgresql Tests with Docker TestContainers](https://noga-lasman.medium.com/happy-postgresql-tests-with-docker-testcontainers-abcf2d4722fd)
> [https://hrtyy.dev/server/nodejs_testcontainer_test/](https://hrtyy.dev/server/nodejs_testcontainer_test/)
