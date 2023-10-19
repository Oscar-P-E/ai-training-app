// import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exercisesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const exercises = await ctx.db.exercise.findMany({
      include: {
        days: true, // Eager load
      },
    });

    return exercises.map((exercise) => ({
      exercise,
      // name: exercise.name,
    }));
  }),
});
