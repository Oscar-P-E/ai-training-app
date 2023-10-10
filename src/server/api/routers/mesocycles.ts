import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/types/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
  };
};

export const mesocyclesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const mesos = await ctx.db.mesocycle.findMany();

    const users = (
      await clerkClient.users.getUserList({
        userId: mesos.map((m) => m.userId),
      })
    ).map(filterUserForClient);

    console.log(users);

    return mesos.map((meso) => ({
      meso,
      name: meso.name,
      owner: users.find((user) => user.id === meso.userId) ?? null,
    }));
  }),
});
