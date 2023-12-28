import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.product.findMany({ orderBy: desc(schema.product.id) });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.product.findFirst({
        where: eq(schema.product.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.product).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.product).where(eq(schema.product.id, input));
  }),

  modify: protectedProcedure.input(z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
  })).mutation(({ ctx, input }) => {
    return ctx.db.update(schema.product).set(
      {
        name: input.name,
        description: input.description,
      }
    ).where(eq(schema.product.id, input.id))
  })
});
