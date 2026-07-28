import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { insertConsultation, listConsultations } from "./db";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  consultation: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(100),
          phone: z.string().min(1).max(30),
          email: z.string().email().max(320).optional().or(z.literal("")),
          propertyType: z.string().max(50).optional(),
          budget: z.string().max(50).optional(),
          painPoints: z.string().optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const result = await insertConsultation({
          name: input.name,
          phone: input.phone,
          email: input.email || null,
          propertyType: input.propertyType || null,
          budget: input.budget || null,
          painPoints: input.painPoints || null,
          message: input.message || null,
        });
        if (!result) {
          return { success: false as const, error: "Database unavailable" };
        }
        return { success: true as const };
      }),
    list: protectedProcedure.query(async () => {
      return await listConsultations();
    }),
  }),
});

export type AppRouter = typeof appRouter;
