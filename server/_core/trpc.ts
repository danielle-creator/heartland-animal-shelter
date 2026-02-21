import { NOT_ADMIN_ERR_MSG, UNAUTHED_ERR_MSG } from '@shared/const';
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

// Dev admin stub — only used in non-production when no real user is authenticated
const DEV_ADMIN_USER = {
  id: 0,
  openId: 'dev-admin-001',
  name: 'Dev Admin',
  email: 'admin@heartlandanimalshelter.org',
  role: 'admin' as const,
  loginMethod: 'dev',
  lastSignedIn: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const requireUser = t.middleware(async opts => {
  const { ctx, next } = opts;
  const user = ctx.user ?? (process.env.NODE_ENV !== 'production' ? DEV_ADMIN_USER : null);

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }

  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});

export const protectedProcedure = t.procedure.use(requireUser);

export const adminProcedure = t.procedure.use(
  t.middleware(async opts => {
    const { ctx, next } = opts;
    const user = ctx.user ?? (process.env.NODE_ENV !== 'production' ? DEV_ADMIN_USER : null);

    if (!user || user.role !== 'admin') {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }

    return next({
      ctx: {
        ...ctx,
        user,
      },
    });
  }),
);
