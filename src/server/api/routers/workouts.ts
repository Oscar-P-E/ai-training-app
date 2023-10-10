import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const workoutsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.workout.findMany();
  }),
});
