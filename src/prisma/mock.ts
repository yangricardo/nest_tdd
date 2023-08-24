import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { PrismaService } from "nestjs-prisma";

export * from "nestjs-prisma";
export * from "@prisma/client";

export type PrismaServiceMock = DeepMockProxy<PrismaService>;

export const prismaServiceMock: PrismaServiceMock = mockDeep<PrismaService>();