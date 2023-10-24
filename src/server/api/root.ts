import { createTRPCRouter } from "~/server/api/trpc";
import { mesocyclesRouter } from "./routers/mesocycles";
import { daysRouter } from "./routers/days";
import { exercisesRouter } from "./routers/exercises";
import { setsRouter } from "./routers/sets";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  mesocycles: mesocyclesRouter,
  days: daysRouter,
  exercises: exercisesRouter,
  sets: setsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
