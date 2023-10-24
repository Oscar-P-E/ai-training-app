// // import { clerkClient } from "@clerk/nextjs";
// // import type { User } from "@clerk/nextjs/dist/types/server";
// // import { z } from "zod";

// import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// // const filterUserForClient = (user: User) => {
// //   return {
// //     id: user.id,
// //   };
// // };

// export const weeksRouter = createTRPCRouter({
//   getAll: publicProcedure.query(async ({ ctx }) => {
//     const weeks = await ctx.db.week.findMany({
//       include: {
//         days: true,
//       },
//     });



//     return weeks.map((week) => ({
//       week,

//     }));
//   }),
// });
