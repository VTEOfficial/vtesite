import { createTRPCRouter, protectedProcedure } from "@/server/trpc";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: { accounts: { some: { providerAccountId: ctx.token.sub } } },
      select: {
        id: true,
        discordId: true,
        name: true,
        image: true,
        email: true,
        createdAt: true,
      },
    });
    return user;
  }),
});