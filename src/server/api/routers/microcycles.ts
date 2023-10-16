// import { clerkClient } from "@clerk/nextjs";
// import type { User } from "@clerk/nextjs/dist/types/server";
// import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// const filterUserForClient = (user: User) => {
//   return {
//     id: user.id,
//   };
// };

export const microcyclesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const micros = await ctx.db.microcycle.findMany({
      include: {
        workouts: true,
      },
    });

    // const users = (
    //   await clerkClient.users.getUserList({
    //     userId: mesos.map((mes) => mes.userId),
    //   })
    // ).map(filterUserForClient);

    return micros.map((micro) => ({
      micro,
      // name: meso.name,
      // owner: users.find((user) => user.id === meso.userId),
    }));
  }),
});
