// import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const setsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const sets = await ctx.db.set.findMany();
    return sets.map((set) => ({
      set,
      order: set.order,
    }));
  }),
});
