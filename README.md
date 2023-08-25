# NestJS + Prisma ORM + TDD Studies

This repository aims to collect NestJS api good practices based on:

- [NestJS](https://nestjs.com/), as backend framework
- [Zod](https://zod.dev/), as Schema Validation
- [Prisma ORM](https://www.prisma.io/), as Database ORM tool
  - [NestJS Prisma](https://nestjs-prisma.dev/), to improve integration between Prisma ans NestJS

Author: [Yang Miranda](https://github.com/yangricardo)

## Current Requirements

[x] Base NestJS project
[x] Prisma ORM Setups
[x] Prisma ORM mocked unit tests
[x] Prisma e2e tests with Postgres Test containers

## Future Requirements

[] Zod Validations
[] Validated Environment Variables
[] Swagger Open API Setup generation
[] Authentication PasswordJS
  [] User / Password Local Provider and Argon2 password hashing
  [] Jwt Token
  [] Google Provider
  [] Facebook Provider
  [] Github Provider
[] RBAC Authorizations  
[] tRPC Provider
[] Send emails with Nodemailer
[] Monorepo with Turborepo
[] Integration With React
  [] Check if is possible execute some TSX React module inside NestJS
    [] Test React Email to send styled emails instead handlebars
  [] If don`t, integrate with some react client application, like NextJS or Vite based

## References

### [NestJS and Prisma TDD](https://www.tomray.dev/nestjs-prisma)

> 1. Use [jest-mock-extended](https://github.com/marchaos/jest-mock-extended) helper to deep mock, as in [src/prisma/mock.ts](src/prisma/mock.ts)
> 2. Use Prisma generated typings to help create mock values, as in [src/prisma/tweets.mock.ts](src/prisma/tweets.mock.ts)
> 3. Setup `mock.ts` suffix name to be excluded from build distribution
> 4. Setup `@/` as module path alias

### [NestJS Docker Deployment](https://www.tomray.dev/nestjs-docker-production)

> Adapted to use `yarn` as package manager

### E2E Tests using Postgres Testcontainers

> 1. Use Test Postgres Testcontainer to easily test implementation flow with a easy way to run e2e tests at least with database
> 2. The [E2EPostgresPrismaModule](test/prisma.testcontainer.ts) class were carefully implemented thinking in start a bare new database to be reused each test call

#### Inspirations

- [Testcontainers for Node](https://node.testcontainers.org/quickstart/)
- [PostgreSQL Testcontainers](https://testcontainers.com/modules/postgresql/)
- [Prisma E2E Tests](https://www.prisma.io/blog/testing-series-4-OVXtDis201)
- [Happy 😉 Postgresql Tests with Docker TestContainers](https://noga-lasman.medium.com/happy-postgresql-tests-with-docker-testcontainers-abcf2d4722fd)
- [https://hrtyy.dev/server/nodejs_testcontainer_test/](https://hrtyy.dev/server/nodejs_testcontainer_test/)
