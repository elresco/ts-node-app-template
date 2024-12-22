import { PrismaClient } from "@prisma/client";

import envs from "./envs";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      envs.NODE_ENV === "development" ? ["error"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (envs.NODE_ENV !== "production") globalForPrisma.prisma = db;
