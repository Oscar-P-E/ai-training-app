import { createTRPCRouter } from "~/server/api/trpc";
import { mesocyclesRouter } from "./routers/mesocycles";
import { weeksRouter } from "./routers/weeks";
import { daysRouter } from "./routers/days";
import { exercisesRouter } from "./routers/exercises";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  mesocycles: mesocyclesRouter,
  weeks: weeksRouter,
  days: daysRouter,
  exercises: exercisesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
