// import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const daysRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const days = await ctx.db.day.findMany({
      include: {
        week: true, // Eager load
        exercises: true, // Eager load
      },
    });
    return days.map((day) => ({
      day,
      // name: day.name,
    }));
  }),
});

// export const daysRouter = createTRPCRouter({
//   getAll: publicProcedure.query(async ({ ctx }) => {
//     // return ctx.db.day.findMany();
//     const days = await ctx.db.day.findMany();

//     return days.map((day) => ({
//       day,
//       // name: day.name,
//     }));
//   }),
// });
