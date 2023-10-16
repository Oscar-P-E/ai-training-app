// import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exercisesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    // return ctx.db.exercise.findMany();
    const exercises = await ctx.db.exercise.findMany({
      include: {
        workouts: true, // Eager load
      },
    });

    return exercises.map((exercise) => ({
      exercise,
      // name: exercise.name,
    }));
  }),
});
