// import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const workoutsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const workouts = await ctx.db.workout.findMany({
      include: {
        exercises: true, // Eager load exercises
      },
    });
    return workouts;
  }),
});

// export const workoutsRouter = createTRPCRouter({
//   getAll: publicProcedure.query(async ({ ctx }) => {
//     // return ctx.db.workout.findMany();
//     const workouts = await ctx.db.workout.findMany();

//     return workouts.map((workout) => ({
//       workout,
//       // name: workout.name,
//     }));
//   }),
// });
